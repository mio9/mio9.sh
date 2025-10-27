<template>
  <div class="min-h-screen bg-linear-to-br from-gray-800 via-gray-700 to-gray-800 relative overflow-x-hidden py-10 px-5 md:py-10 md:px-5">
    <!-- Desk texture overlays -->
    <div class="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent opacity-50"></div>
    <div class="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent opacity-30" style="background-position: 80% 80%;"></div>
    <div class="absolute inset-0 bg-linear-to-br from-transparent via-white/2 to-transparent opacity-20"></div>
    
    <div class="max-w-4xl mx-auto bg-linear-to-br from-pink-50 to-rose-50 rounded-3xl shadow-2xl relative overflow-hidden min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-80px)]">
      <!-- Wave cut decorative top edge -->
      <!-- <WaveCutEdge /> -->
      
      <!-- Paper texture line -->
      <div class="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-pink-300/30 to-transparent"></div>
      
      <nuxt-page />
    </div>
    
    <FloatingPetals />
  </div>
</template>

<script setup lang="ts">
import FloatingPetals from '~/components/FloatingPetals.vue'
</script>

<style>
/* Custom gradient for radial effects */
.bg-gradient-radial {
  background: radial-gradient(circle, var(--tw-gradient-stops));
}
</style>
