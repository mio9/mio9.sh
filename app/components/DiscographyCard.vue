<template>
  <div class="bg-white/90 rounded-xl p-5 mb-5 shadow-lg transition-all duration-300 border border-pink-200/20 flex gap-4 items-start hover:-translate-y-0.5 hover:shadow-xl hover:border-pink-200/40">
    <div class="shrink-0 w-20 h-20">
      <img 
        v-if="coverImage" 
        :src="coverImage" 
        :alt="title"
        class="w-full h-full object-cover rounded-lg shadow-md"
      />
      <div v-else class="w-full h-full bg-linear-to-br from-pink-300 to-pink-200 rounded-lg flex items-center justify-center">
        <svg width="60" height="60" viewBox="0 0 60 60" class="opacity-70">
          <circle cx="30" cy="30" r="25" fill="#FFB7C5" opacity="0.3" />
          <path d="M20,20 L40,20 L40,40 L20,40 Z" fill="#FFB7C5" opacity="0.6" />
          <circle cx="30" cy="30" r="8" fill="#FFB7C5" opacity="0.8" />
        </svg>
      </div>
    </div>
    
    <div class="flex-1 min-w-0">
      <h3 class="text-xl font-semibold text-gray-800 m-0 mb-2 leading-tight">{{ title }}</h3>
      <p class="text-gray-500 text-sm m-0 mb-2">{{ releaseDate }}</p>
      <p v-if="description" class="text-gray-600 text-sm leading-relaxed m-0 mb-3">{{ description }}</p>
      
      <div class="mt-3">
        <a 
          v-if="bandcampLink" 
          :href="bandcampLink" 
          target="_blank" 
          rel="noopener noreferrer"
          class="inline-block bg-linear-to-br from-pink-300 to-pink-200 text-gray-800 no-underline px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-md shadow-pink-200/30 hover:from-pink-200 hover:to-pink-100 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-pink-200/40"
        >
          Listen on Bandcamp
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  releaseDate: string;
  coverImage?: string;
  bandcampLink?: string;
  description?: string;
}

defineProps<Props>();
</script>

<style>
/* Responsive adjustments for mobile */
@media (max-width: 640px) {
  .flex {
    flex-direction: column;
    text-align: center;
  }
  
  .flex-shrink-0 {
    align-self: center;
  }
}
</style>
