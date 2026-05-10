<template>
    <div class="relative">
        <div
            class="relative bg-black/80 backdrop-blur-sm p-4 rounded-lg min-h-[300px] cursor-text border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.3)] crt-terminal"
            @click="focusInput"
        >
            <!-- CRT scanlines overlay -->
            <div class="absolute inset-0 crt-scanlines pointer-events-none rounded-lg" />
            <!-- Flickering overlay -->
            <div class="absolute inset-0 crt-flicker pointer-events-none rounded-lg" />

            <div class="relative z-10">
                <div class="flex items-center justify-between">
                    <span class="text-sm text-pink-300 drop-shadow-[0_0_4px_rgba(236,72,153,0.8)]">{{ headerLeft }}</span>
                    <span v-if="headerRight" class="text-sm text-blue-400 drop-shadow-[0_0_4px_rgba(96,165,250,0.8)]">{{ headerRight }}</span>
                </div>

                <ClientOnly>
                    <div v-if="preMessage" class="mt-1">
                        <p class="text-sm text-purple-200 font-mono drop-shadow-[0_0_3px_rgba(192,132,252,0.6)]">
                            {{ preMessage }}
                        </p>
                    </div>
                </ClientOnly>

                <div class="mt-4 space-y-1">
                    <template v-for="(line, index) in lines" :key="index">
                        <div v-if="line.type === 'spacer'" class="h-3" />
                        <NuxtImg
                            v-else-if="line.type === 'image' && line.src"
                            :src="line.src"
                            :alt="line.text"
                            class="object-cover border border-purple-500/30"
                            :style="imageStyle(line)"
                            :class="roundedClass(line.rounded)"
                        />
                        <p
                            v-else-if="lineHasLink(line)"
                            class="text-sm font-mono leading-relaxed wrap-break-word"
                        >
                            <span
                                v-if="line.prefix"
                                class="text-purple-400/95 drop-shadow-[0_0_2px_rgba(192,132,252,0.55)] whitespace-pre-wrap"
                            >{{ line.prefix }}</span>
                            <NuxtLink
                                :to="line.to"
                                class="text-blue-400 underline underline-offset-4 decoration-blue-400/60 transition-colors hover:text-blue-300 hover:decoration-blue-300 drop-shadow-[0_0_2px_rgba(96,165,250,0.45)] wrap-break-word"
                                @click.stop
                            >
                                {{ line.text }}
                            </NuxtLink>
                            <span
                                v-if="line.suffix"
                                class="text-purple-400 drop-shadow-[0_0_2px_rgba(192,132,252,0.6)]"
                            >{{ line.suffix }}</span>
                        </p>
                        <p
                            v-else
                            class="font-mono drop-shadow-[0_0_2px_rgba(192,132,252,0.6)]"
                            :class="lineClass(line.type)"
                        >
                            {{ line.text }}
                        </p>
                    </template>
                </div>

                <div v-if="interactive" class="mt-1 flex items-start relative">
                    <span class="text-pink-400 mr-2 drop-shadow-[0_0_4px_rgba(236,72,153,0.8)] animate-pulse mt-0.5">$</span>
                    <div class="flex-1 relative min-h-6">
                        <textarea
                            ref="inputRef"
                            class="absolute inset-0 w-full bg-transparent text-purple-400 outline-none border-none focus:outline-none font-mono placeholder-purple-400/50 resize-none overflow-hidden custom-caret text-overlay textarea-input"
                            placeholder=""
                            :value="modelValue"
                            @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
                            @keydown.enter.exact.prevent="emit('submit')"
                            @keydown.enter.shift.exact.prevent="emit('update:modelValue', modelValue + '\n')"
                            @click.stop
                            @focus="isFocused = true"
                            @blur="isFocused = false"
                            rows="1"
                            :style="{ height: textareaHeight + 'px' }"
                        />
                        <div class="font-mono text-purple-400 pointer-events-none text-overlay" :style="{ minHeight: textareaHeight + 'px', width: '100%' }">
                            <span class="text-content">{{ modelValue }}</span>
                            <span v-if="isFocused" class="custom-cursor" :class="{ blink: isFocused }">█</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- CRT glow effect -->
            <div class="absolute inset-0 crt-glow pointer-events-none rounded-lg" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { TerminalLine, TerminalLineType, TerminalImageRounded } from '~/composables/useShell';

const props = withDefaults(
    defineProps<{
        lines: TerminalLine[];
        preMessage?: string;
        headerLeft?: string;
        headerRight?: string;
        modelValue?: string;
        interactive?: boolean;
    }>(),
    {
        headerLeft: '$ ./mio9.sh',
        headerRight: '127.0.0.1:3950',
        modelValue: '',
        interactive: true,
    }
);

const emit = defineEmits<{
    'update:modelValue': [value: string];
    submit: [];
}>();

const inputRef = ref<HTMLTextAreaElement | null>(null);
const isFocused = ref(false);
const textareaHeight = ref(24);

function lineHasLink(line: TerminalLine): line is TerminalLine & { to: string } {
    return typeof line.to === 'string' && line.to.length > 0
}

function imageStyle(line: TerminalLine) {
    const w = line.width ?? 128;
    const h = line.height ?? w;
    return { width: `${w}px`, height: `${h}px` };
}

function roundedClass(rounded?: TerminalImageRounded): string {
    const map: Record<TerminalImageRounded, string> = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
    };
    return map[rounded ?? 'lg'];
}

function lineClass(type?: TerminalLineType): string {
    const base = 'text-sm';
    switch (type) {
        case 'title':
            return 'text-xl font-bold text-purple-200';
        case 'subheading':
            return 'text-lg font-semibold text-purple-300';
        case 'error':
            return `${base} text-red-400`;
        case 'prompt':
            return `${base} text-pink-300`;
        case 'info':
            return `${base} text-blue-400`;
        case 'muted':
            return `${base} text-purple-500/80`;
        case 'output':
        default:
            return `${base} text-purple-400`;
    }
}

function adjustTextareaHeight() {
    if (inputRef.value) {
        inputRef.value.style.height = 'auto';
        const scrollHeight = inputRef.value.scrollHeight;
        textareaHeight.value = Math.max(24, scrollHeight);
        inputRef.value.style.height = textareaHeight.value + 'px';
    }
}

watch(() => props.modelValue, adjustTextareaHeight);

onMounted(adjustTextareaHeight);

function focusInput() {
    if (props.interactive) {
        inputRef.value?.focus();
        isFocused.value = true;
    }
}
</script>

<style scoped>
.crt-terminal {
    box-shadow:
        0 0 20px rgba(168, 85, 247, 0.3),
        inset 0 0 60px rgba(0, 0, 0, 0.5),
        0 0 0 1px rgba(168, 85, 247, 0.2);
}

.crt-scanlines {
    background:
        repeating-linear-gradient(0deg,
            rgba(192, 132, 252, 0.03) 0px,
            transparent 1px,
            transparent 2px,
            rgba(192, 132, 252, 0.03) 3px);
    animation: scanline 8s linear infinite;
}

@keyframes scanline {
    0% { background-position: 0 0; }
    100% { background-position: 0 100%; }
}

.crt-flicker {
    animation: flicker 0.15s infinite;
}

@keyframes flicker {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.97; }
    98% { opacity: 0.99; }
    99% { opacity: 0.96; }
}

.crt-glow {
    background: radial-gradient(ellipse at center,
        transparent 0%,
        rgba(168, 85, 247, 0.05) 50%,
        transparent 100%);
    animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
    0% { opacity: 0.5; }
    100% { opacity: 0.8; }
}

.custom-caret {
    caret-color: transparent;
}

.text-overlay {
    font-size: 0.875rem;
    line-height: 1.5rem;
    width: 100%;
}

.textarea-input {
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
}

.text-content {
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
    display: inline;
}

textarea:focus {
    text-shadow:
        0 0 5px rgba(192, 132, 252, 0.5),
        0 0 10px rgba(192, 132, 252, 0.3),
        0 0 15px rgba(192, 132, 252, 0.3);
}

.custom-cursor {
    color: rgb(192, 132, 252);
    text-shadow:
        0 0 5px rgba(192, 132, 252, 0.8),
        0 0 10px rgba(192, 132, 252, 0.6);
    margin-left: 1px;
    font-family: monospace;
    line-height: 1;
    display: inline-block;
}

.custom-cursor.blink {
    animation: blink-cursor 1s step-end infinite;
}

@keyframes blink-cursor {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}
</style>
