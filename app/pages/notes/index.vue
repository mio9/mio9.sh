<template>
    <div>
        <h1>Notes</h1>
    </div>
</template>


<script setup lang="ts">
const { data: notes } = await useAsyncData(() => queryCollection('content').path('/testing').first())
useSeoMeta({
    title: notes.value?.title,
    description: notes.value?.description
})

</script>