<template>
  <div class="relative">
    <!-- pseudo terminal simulate a real terminal -->
    <div
      class="relative bg-black/80 backdrop-blur-sm p-4 rounded-lg min-h-[300px] cursor-text border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.3)] crt-terminal"
      @click="focusInput">
      <!-- CRT scanlines overlay -->
      <div class="absolute inset-0 crt-scanlines pointer-events-none rounded-lg"></div>

      <!-- Flickering overlay -->
      <div class="absolute inset-0 crt-flicker pointer-events-none rounded-lg"></div>

      <!-- Content -->
      <div class="relative z-10">
        <div class="flex items-center justify-between">
          <span class="text-sm text-pink-300 drop-shadow-[0_0_4px_rgba(236,72,153,0.8)]">$ ./mio9.sh</span>
          <span class="text-sm text-blue-400 drop-shadow-[0_0_4px_rgba(96,165,250,0.8)]">127.0.0.1:3950</span>
        </div>
        <!-- pre loaded messages -->
        <ClientOnly>
          <div>
            <p class="text-sm text-purple-200 font-mono drop-shadow-[0_0_3px_rgba(192,132,252,0.6)]">
              {{ randomPreLoadedMessage }}</p>
          </div>
        </ClientOnly>

        <div class="mt-4 space-y-1">
          <p v-for="(line, index) in lines" :key="index"
            class="text-sm text-purple-400 font-mono drop-shadow-[0_0_2px_rgba(192,132,252,0.6)]">{{ line }}</p>
        </div>
        <div class="mt-1 flex items-start relative">
          <span class="text-pink-400 mr-2 drop-shadow-[0_0_4px_rgba(236,72,153,0.8)] animate-pulse mt-0.5">$</span>
          <div class="flex-1 relative min-h-[1.5rem]">
            <textarea 
              ref="inputRef" 
              class="absolute inset-0 w-full bg-transparent text-purple-400 outline-none border-none focus:outline-none font-mono placeholder-purple-400/50 resize-none overflow-hidden custom-caret text-overlay textarea-input"
              placeholder=""
              v-model="input" 
              @keydown.enter.exact.prevent="handleInput"
              @keydown.enter.shift.exact="input += '\n'"
              @click.stop
              @focus="isFocused = true"
              @blur="isFocused = false"
              rows="1"
              :style="{ height: textareaHeight + 'px' }"
            ></textarea>
            <div class="font-mono text-purple-400 pointer-events-none text-overlay" :style="{ minHeight: textareaHeight + 'px', width: '100%' }">
              <span class="text-content">{{ input }}</span>
              <span 
                v-if="isFocused" 
                class="custom-cursor"
                :class="{ 'blink': isFocused }"
              >█</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CRT glow effect -->
      <div class="absolute inset-0 crt-glow pointer-events-none rounded-lg"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTermCmd } from '../composables/useTermCmd';
const { lines, input, handleInput, getPreLoadedMessages } = useTermCmd();
const inputRef = ref<HTMLTextAreaElement | null>(null);
const isFocused = ref(false);
const textareaHeight = ref(24);

const randomPreLoadedMessage = computed(() => getPreLoadedMessages());

const adjustTextareaHeight = () => {
  if (inputRef.value) {
    inputRef.value.style.height = 'auto';
    const scrollHeight = inputRef.value.scrollHeight;
    textareaHeight.value = Math.max(24, scrollHeight);
    inputRef.value.style.height = textareaHeight.value + 'px';
  }
};

watch(input, () => {
  adjustTextareaHeight();
});

onMounted(() => {
  adjustTextareaHeight();
});

const focusInput = () => {
  inputRef.value?.focus();
  isFocused.value = true;
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
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 0 100%;
  }
}

.crt-flicker {
  animation: flicker 0.15s infinite;
}

@keyframes flicker {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.97;
  }

  98% {
    opacity: 0.99;
  }

  99% {
    opacity: 0.96;
  }
}

.crt-glow {
  background: radial-gradient(ellipse at center,
      transparent 0%,
      rgba(168, 85, 247, 0.05) 50%,
      transparent 100%);
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  0% {
    opacity: 0.5;
  }

  100% {
    opacity: 0.8;
  }
}

/* Hide default caret */
.custom-caret {
  caret-color: transparent;
}

/* Ensure textarea and overlay have matching text rendering */
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

/* Text shadow glow effect */
textarea:focus {
  text-shadow:
    0 0 5px rgba(192, 132, 252, 0.5),
    0 0 10px rgba(192, 132, 252, 0.3),
    0 0 15px rgba(192, 132, 252, 0.3);
}

/* Custom cursor */
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
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}
</style>