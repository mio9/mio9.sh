<template>
    <div class="relative">
        <!-- pseudo terminal simulate a real terminal -->
         <div class="relative bg-black/80 backdrop-blur-sm p-4 rounded-lg min-h-[300px] cursor-text border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.3)] crt-terminal" @click="focusInput"> 
            <!-- CRT scanlines overlay -->
            <div class="absolute inset-0 crt-scanlines pointer-events-none rounded-lg"></div>
            
            <!-- Flickering overlay -->
            <div class="absolute inset-0 crt-flicker pointer-events-none rounded-lg"></div>
            
            <!-- Content -->
            <div class="relative z-10">
                <div class="flex items-center justify-between">
                    <span class="text-sm text-pink-400 drop-shadow-[0_0_4px_rgba(236,72,153,0.8)]">$ ./mio9.sh</span>
                    <span class="text-sm text-blue-400 drop-shadow-[0_0_4px_rgba(96,165,250,0.8)]">127.0.0.1:3950</span>
                </div>
                <div class="mt-4 space-y-1">
                    <p v-for="(line, index) in lines" :key="index" class="text-sm text-purple-400 font-mono drop-shadow-[0_0_3px_rgba(192,132,252,0.6)]">{{ line }}</p>
                </div>
                <div class="mt-1 flex items-center">
                    <span class="text-pink-400 mr-2 drop-shadow-[0_0_4px_rgba(236,72,153,0.8)] animate-pulse">$</span>
                    <input 
                        ref="inputRef"
                        type="text" 
                        class="flex-1 bg-transparent text-purple-400 outline-none border-none focus:outline-none font-mono caret-blue-400 placeholder-purple-400/50" 
                        placeholder="_"
                        v-model="input" 
                        @keydown.enter="handleInput"
                        @click.stop
                    />
                </div>
            </div>
            
            <!-- CRT glow effect -->
            <div class="absolute inset-0 crt-glow pointer-events-none rounded-lg"></div>
         </div>
    </div>
</template>

<script setup lang="ts">
import { useTermCmd } from '../composables/useTermCmd';
const { lines, input, handleInput } = useTermCmd();
const inputRef = ref<HTMLInputElement | null>(null);
const focusInput = () => {
    inputRef.value?.focus();
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
    repeating-linear-gradient(
      0deg,
      rgba(192, 132, 252, 0.03) 0px,
      transparent 1px,
      transparent 2px,
      rgba(192, 132, 252, 0.03) 3px
    );
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
  0%, 100% {
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
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    rgba(168, 85, 247, 0.05) 50%,
    transparent 100%
  );
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

/* Text shadow glow effect */
input:focus {
  text-shadow: 
    0 0 5px rgba(192, 132, 252, 0.8),
    0 0 10px rgba(192, 132, 252, 0.6),
    0 0 15px rgba(192, 132, 252, 0.4);
}
</style>