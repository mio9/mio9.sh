<template>
  <div class="p-4 font-mono bg-gray-900 text-white min-h-screen">
    <!-- top nav bar -->
    <div>
      <nav class="flex gap-4">
        <h1>mio9.sh / </h1>
        <span class="text-sm hover:underline underline-offset-4">about</span>
        <span class="text-sm hover:underline underline-offset-4">projects</span>
        <span class="text-sm hover:underline underline-offset-4">contact</span>
      </nav>
    </div>
    <!-- main content -->
    <div class="mt-4">
      <nuxt-page />
    </div>
  </div>
</template>
