<template>
  <div>
    <article v-if="notes" class="note-prose">
      <div class="flex gap-2">
      <h1 class="pb-3">{{ notes.title }}</h1>
      <span class="text-sm text-slate-300/90 mb-4">{{ notes.meta.date }}</span>
      <span class="text-sm text-slate-300/90 mb-4">{{ notes.meta.author }}</span>
      </div>
      <ContentRenderer :value="notes" />
    </article>
    <div v-else>
      <Terminal :lines="notesLines" :header-left="`$ cat notes/${params.id}.md | mdrender`" :interactive="false" />
    </div>
    <!-- <pre>{{ notes }}</pre> -->
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