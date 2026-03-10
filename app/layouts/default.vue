<template>
  <div class="relative min-h-screen overflow-hidden">
    <!-- Background image -->
    <div class="fixed inset-0 z-0">
      <NuxtImg :src="wallpaper" alt="background" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-slate-950/90"></div>
    </div>

    <!-- CRT overlay effect -->
    <div class="fixed inset-0 z-10 pointer-events-none crt-overlay"></div>

    <!-- Content -->
    <div class="relative z-20 p-5 font-mono text-white min-h-screen">
      <!-- top nav bar -->
      <div>
        <nav class="flex gap-4 items-center">
          <NuxtLink to="/">
            <h1 class="text-lg text-pink-300 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]">🌸 mio9.sh / </h1>
          </NuxtLink>
          <NuxtLink to="/about"
            class="text-sm hover:underline underline-offset-4 text-blue-400 hover:text-blue-300 transition-colors">about
          </NuxtLink>
          <NuxtLink to="/notes"
            class="text-sm hover:underline underline-offset-4 text-blue-400 hover:text-blue-300 transition-colors">notes
          </NuxtLink>
          <!-- <NuxtLink to="/sys"
            class="text-sm hover:underline underline-offset-4 text-blue-400 hover:text-blue-300 transition-colors">sys
          </NuxtLink> -->
        </nav>
      </div>
      <!-- main content -->
      <div class="mt-5">
        <slot />
      </div>
      <footer class="text-slate-400 mt-5">
        <div class="flex items-center gap-2 text-2xl">
          <span class="text-blue-400 hover:text-blue-300 transition-colors">
            <NuxtLink to="https://github.com/mio9" class="pb-2"><Icon name="uil:github" class="mr-1"/></NuxtLink>
          </span>
          <span class="text-blue-400 hover:text-blue-300 transition-colors">
            <NuxtLink to="https://x.com/mio9_sh" class="pb-2"><Icon name="uil:twitter" class="mr-1"/></NuxtLink>
          </span>
          <span class="text-blue-400 hover:text-blue-300 transition-colors">
            <NuxtLink to="https://github.com/mio9" class="pb-2"><Icon name="uil:instagram" class="mr-1"/></NuxtLink>
          </span>
          <span class="text-blue-400 hover:text-blue-300 transition-colors">
            <NuxtLink to="https://github.com/mio9" class="pb-2"><Icon name="uil:youtube" class="mr-1"/></NuxtLink>
          </span>
          <span class="text-blue-400 hover:text-blue-300 transition-colors">
            <NuxtLink to="https://github.com/mio9" class="pb-2"><Icon name="uil:discord" class="mr-1"/></NuxtLink>
          </span>
          <span class="text-blue-400 hover:text-blue-300 transition-colors">
            <NuxtLink to="https://github.com/mio9" class="pb-2"><Icon name="mdi:spotify" class="mr-1"/></NuxtLink>
          </span>
        </div>
        <p class="text-sm">© 2026 MiO9</p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
const mainStore = useMainStore();
const wallpaper = computed(() => `/bg/${mainStore.wallpaper}.jpg`);
</script>

<style scoped>
.crt-overlay {
  background:
    repeating-linear-gradient(0deg,
      rgba(0, 0, 0, 0.15) 0px,
      rgba(0, 0, 0, 0.15) 1px,
      transparent 1px,
      transparent 2px);
  pointer-events: none;
  animation: flicker 0.15s infinite;
}

@keyframes flicker {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.98;
  }
}
</style>