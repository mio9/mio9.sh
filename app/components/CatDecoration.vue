<template>
  <div 
    class="absolute z-20 transition-all duration-300 hover:scale-110"
    :class="positionClasses"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <svg 
      :width="size" 
      :height="size" 
      viewBox="0 0 100 100" 
      class="drop-shadow-sm animate-gentle-bounce"
      :class="{ 'animate-paw-tap': isHovered }"
      style="filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));"
    >
      <!-- Paw pad -->
      <ellipse cx="50" cy="60" rx="20" ry="15" fill="#6B6B6B" opacity="0.7" />
      
      <!-- Toe pads -->
      <circle cx="40" cy="45" r="8" fill="#6B6B6B" opacity="0.7" />
      <circle cx="50" cy="40" r="8" fill="#6B6B6B" opacity="0.7" />
      <circle cx="60" cy="45" r="8" fill="#6B6B6B" opacity="0.7" />
      
      <!-- Small toe -->
      <circle cx="35" cy="50" r="5" fill="#6B6B6B" opacity="0.6" />
      
      <!-- Paw pad details -->
      <ellipse cx="50" cy="60" rx="15" ry="10" fill="#FFB7C5" opacity="0.3" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  size?: number
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center-left' | 'center-right' | 'near-content' | 'near-navigation'
}

const props = withDefaults(defineProps<Props>(), {
  size: 60,
  position: 'bottom-right'
})

const isHovered = ref(false)

const positionClasses = computed(() => {
  const positions = {
    'top-left': 'top-8 left-8',
    'top-right': 'top-8 right-8',
    'bottom-left': 'bottom-8 left-8',
    'bottom-right': 'bottom-8 right-8',
    'center-left': 'top-1/2 left-4 transform -translate-y-1/2',
    'center-right': 'top-1/2 right-4 transform -translate-y-1/2',
    'near-content': 'top-32 left-16',
    'near-navigation': 'top-20 right-12'
  }
  return positions[props.position]
})
</script>

<style>
@keyframes gentle-bounce {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-2px);
  }
}

@keyframes paw-tap {
  0% {
    transform: scale(1) translateY(0px);
  }
  50% {
    transform: scale(0.95) translateY(1px);
  }
  100% {
    transform: scale(1) translateY(0px);
  }
}

.animate-gentle-bounce {
  animation: gentle-bounce 3s ease-in-out infinite;
}

.animate-paw-tap {
  animation: paw-tap 0.6s ease-in-out;
}
</style>
