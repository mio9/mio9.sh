<template>
    <div class="relative min-h-screen overflow-hidden">
      <!-- Background image -->
      <div class="fixed inset-0 z-0">
        <img src="~/assets/bg1.jpg" alt="background" class="w-full h-full object-cover opacity-0.5" />
        <div class="absolute inset-0 bg-slate-950/90"></div>
      </div>
      
      <!-- CRT overlay effect -->
      <div class="fixed inset-0 z-10 pointer-events-none crt-overlay"></div>
      
      <!-- Content -->
      <div class="relative z-20 p-4 font-mono text-white min-h-screen">
        <!-- top nav bar -->
        <div>
          <nav class="flex gap-4 items-center">
            <h1 class="text-lg text-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]">🌸 mio9.sh  / </h1>
            <NuxtLink to="/about" class="text-sm hover:underline underline-offset-4 text-blue-400 hover:text-blue-300 transition-colors">about</NuxtLink>
            <NuxtLink to="/projects" class="text-sm hover:underline underline-offset-4 text-blue-400 hover:text-blue-300 transition-colors">projects</NuxtLink>
            <NuxtLink to="/link" class="text-sm hover:underline underline-offset-4 text-blue-400 hover:text-blue-300 transition-colors">link</NuxtLink>
          </nav>
        </div>
        <!-- main content -->
        <div class="mt-4">
          <slot />
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .crt-overlay {
    background: 
      repeating-linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.15) 0px,
        rgba(0, 0, 0, 0.15) 1px,
        transparent 1px,
        transparent 2px
      );
    pointer-events: none;
    animation: flicker 0.15s infinite;
  }
  
  @keyframes flicker {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.98;
    }
  }
  </style>
  