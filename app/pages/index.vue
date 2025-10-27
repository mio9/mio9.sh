<template>
  <div class="relative z-10">
    <!-- Header with cherry blossom mark and name -->
    <header class="text-center py-10 px-5 relative">
      <div class="flex flex-col items-center gap-4">
        <CherryBlossomMark :size="50" />
        <h1 class="text-5xl font-light text-gray-800 m-0 tracking-wider drop-shadow-sm">mio9</h1>
      </div>
    </header>
    
    <!-- Navigation -->
    <nav class="py-5 px-10 border-b border-pink-200/20">
      <ul class="flex justify-center gap-10 list-none m-0 p-0">
        <li><a href="#" class="no-underline font-medium text-lg px-4 py-2 rounded-full transition-all duration-300 relative bg-linear-to-br from-pink-300 to-pink-200 text-gray-800 shadow-lg shadow-pink-200/30">Home</a></li>
        <li><a href="#" class="text-gray-800 no-underline font-medium text-lg px-4 py-2 rounded-full transition-all duration-300 relative hover:bg-linear-to-br hover:from-pink-300 hover:to-pink-200 hover:text-gray-800 hover:shadow-lg hover:shadow-pink-200/30">About</a></li>
        <li><a href="#" class="text-gray-800 no-underline font-medium text-lg px-4 py-2 rounded-full transition-all duration-300 relative hover:bg-linear-to-brover:from-pink-300 hover:to-pink-200 hover:text-gray-800 hover:shadow-lg hover:shadow-pink-200/30">Music</a></li>
        <li><a href="#" class="text-gray-800 no-underline font-medium text-lg px-4 py-2 rounded-full transition-all duration-300 relative hover:bg-linear-to-br hover:from-pink-300 hover:to-pink-200 hover:text-gray-800 hover:shadow-lg hover:shadow-pink-200/30">Contact</a></li>
      </ul>
    </nav>
    
    <!-- Main content -->
    <main class="p-10">
      <!-- Welcome section -->
      <section class="text-center mb-15">
        <h2 class="text-3xl font-normal text-gray-800 m-0 mb-5 font-serif">I make loud shit</h2>
        <p class="text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </section>
      
      <!-- Discography section -->
      <section class="mt-10 relative">
        <h2 class="text-3xl font-normal text-gray-800 m-0 mb-8 text-center font-serif relative">
          Discography
          <div class="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 w-15 h-0.5 bg-linear-to-r from-transparent via-pink-300 to-transparent"></div>
        </h2>
        

        <div class="flex flex-col gap-5">
          <!-- <DiscographyCard
            title="Spring Awakening"
            releaseDate="March 2024"
            description="A collection of ambient pieces inspired by the first blooms of spring"
            bandcampLink="https://mio9.bandcamp.com/album/spring-awakening"
          />
          <DiscographyCard
            title="Digital Dreams"
            releaseDate="December 2023"
            description="Electronic soundscapes exploring the intersection of technology and emotion"
            bandcampLink="https://mio9.bandcamp.com/album/digital-dreams"
          />
          <DiscographyCard
            title="Midnight Reverie"
            releaseDate="August 2023"
            description="Late-night compositions for quiet contemplation"
            bandcampLink="https://mio9.bandcamp.com/album/midnight-reverie"
          /> -->
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import CherryBlossomMark from "~/components/CherryBlossomMark.vue";
import DiscographyCard from "~/components/DiscographyCard.vue";
import CatDecoration from "~/components/CatDecoration.vue";
</script>

<style>
/* Custom spacing for mb-15 */
.mb-15 {
  margin-bottom: 3.75rem;
}

/* Custom width for w-15 */
.w-15 {
  width: 3.75rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .text-5xl {
    font-size: 2.5rem;
  }
  
  .gap-10 {
    gap: 1.25rem;
  }
  
  .text-lg {
    font-size: 1rem;
  }
  
  .px-4 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  
  .py-2 {
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
  }
  
  .p-10 {
    padding: 1.25rem;
  }
  
  .text-3xl {
    font-size: 1.5rem;
  }
}
</style>
