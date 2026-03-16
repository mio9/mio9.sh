<template>
  <div>
    <ContentRenderer v-if="notes" :value="notes" />
    <div v-else>
      <Terminal :lines="notesLines" :header-left="`$ cat notes/${params.id}.md | mdrender`" :interactive="false" />
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
const notesLines: TerminalLine[] = [
    { text: `cat: notes/${params.id}.md: No such file or directory`, type: 'error' },
    { text: "", type: 'spacer' },
    { text: 'Notes', type: 'title' },
    { text: 'Notes', type: 'subheading' },
    { text: 'Notes', type: 'output' },
    { text: 'Notes is under construction, check back later! 🏗️', type: 'output' },
]
</script>