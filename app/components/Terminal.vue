<template>
    <div>
        <!-- pseudo terminal simulate a real terminal -->
         <div class="bg-gray-800 p-4 rounded-lg min-h-[300px] cursor-text" @click="focusInput"> 
            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-400">./mio9.sh</span>
                <span class="text-sm text-gray-400">127.0.0.1:3950</span>
            </div>
            <div class="mt-4">
                <p v-for="line in lines" :key="line" class="text-sm text-gray-400">{{ line }}</p>
            </div>
            <div class="mt-1 flex items-center">
                <span class="text-green-400 mr-2">$</span>
                <input 
                    ref="inputRef"
                    type="text" 
                    class="flex-1 bg-transparent text-gray-300 outline-none border-none focus:outline-none" 
                    v-model="input" 
                    @keydown.enter="handleInput"
                    @click.stop
                />
            </div>
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