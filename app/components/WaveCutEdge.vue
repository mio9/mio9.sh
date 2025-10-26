<template>
  <div class="w-full absolute top-0 left-0 z-20">
    <svg 
      :width="width" 
      :height="height" 
      viewBox="0 0 400 40" 
      class="w-full h-auto block"
      preserveAspectRatio="none"
    >
      <path 
        d="M0,25 Q25,5 50,25 Q75,5 100,25 Q125,5 150,25 Q175,5 200,25 Q225,5 250,25 Q275,5 300,25 Q325,5 350,25 Q375,5 400,25 L400,40 L0,40 Z" 
        :fill="color"
        opacity="0.95"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
interface Props {
  width?: string
  height?: number
  color?: string
}

withDefaults(defineProps<Props>(), {
  width: '100%',
  height: 40,
  color: '#FFF8F0'
})
</script>

