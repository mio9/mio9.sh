<template>
    <div>
        <Terminal :lines="notesLines" header-left="$ ls notes" :interactive="false" />
    </div>
</template>


<script setup lang="ts">
const { data: notes } = await useAsyncData(() => queryCollection('content').path('/testing').first())
useSeoMeta({
    title: notes.value?.title,
    description: notes.value?.description
})
const notesLines: TerminalLine[] = [
    { text: '"notes": No such file or directory (os error 2)', type: 'error' },
    { text: "", type: 'spacer' },
    { text: 'Notes', type: 'title' },
    { text: 'Notes', type: 'subheading' },
    { text: 'Notes', type: 'output' },
    { text: 'Notes is under construction, check back later! 🏗️', type: 'output' },
]
</script>