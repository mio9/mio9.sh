<template>
  <div class="inline-block animate-gentle-float">
    <img src="~/assets/1f338.svg" alt="blossom" :width="size" :height="size" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), {
  size: 40,
});
</script>

<style>
@keyframes gentle-float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-2px) rotate(1deg);
  }
}

.animate-gentle-float {
  animation: gentle-float 3s ease-in-out infinite;
}
</style>
