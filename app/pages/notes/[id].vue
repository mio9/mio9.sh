<template>
  <div>
    <ContentRenderer v-if="notes" :value="notes" />
    <div v-else>
      <h1>{{ params.id }} not found anywhere here! 🐱</h1>
    </div>
    <pre>{{ notes }}</pre>
  </div>
</template>

<script setup lang="ts">
const params = useRoute().params
const { data: notes } = await useAsyncData(() => queryCollection('content').path(`/notes/${params.id}`).first())
useSeoMeta({
    title: notes.value?.title,
    description: notes.value?.description
})

</script>