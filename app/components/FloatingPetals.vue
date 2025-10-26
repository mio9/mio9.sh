<template>
  <div class="fixed top-0 left-0 w-full h-full pointer-events-none z-10 overflow-hidden">
    <div 
      v-for="(petal, index) in petals" 
      :key="index"
      class="absolute -top-5 animate-float-down"
      :style="{
        left: petal.x + '%',
        animationDelay: petal.delay + 's',
        animationDuration: petal.duration + 's'
      }"
    >
      <svg width="12" height="12" viewBox="0 0 12 12" class="drop-shadow-sm" style="filter: drop-shadow(0 1px 2px rgba(255, 183, 197, 0.3));">
        <path 
          d="M6 1 C4 0, 2 0, 1 1 C0 2, 0 4, 1 5 C2 6, 4 6, 6 5 C8 6, 10 6, 11 5 C12 4, 12 2, 11 1 C10 0, 8 0, 6 1 Z" 
          :fill="petal.color"
          opacity="0.7"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Petal {
  x: number
  delay: number
  duration: number
  color: string
}

const petals = ref<Petal[]>([])

const generatePetals = () => {
  const petalColors = ['#FFB7C5', '#FFC9D4', '#FFD1DC', '#FFE4E6']
  const newPetals: Petal[] = []
  
  for (let i = 0; i < 8; i++) {
    newPetals.push({
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
      color: petalColors[Math.floor(Math.random() * petalColors.length)] || '#FFB7C5'
    })
  }
  
  petals.value = newPetals
}

onMounted(() => {
  generatePetals()
})
</script>

<style>
@keyframes float-down {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}

.animate-float-down {
  animation: float-down linear infinite;
}
</style>
