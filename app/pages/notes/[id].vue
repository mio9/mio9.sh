<template>
  <div>
    <article v-if="notes" class="note-prose">
      <header class="note-meta-row">
        <h1>{{ notes.title }}</h1>
        <p v-if="byline" class="note-byline">{{ byline }}</p>
      </header>
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

const byline = computed(() => {
  const n = notes.value as Record<string, unknown> | undefined
  if (!n) return ''
  const meta = (n.meta ?? {}) as { date?: unknown; author?: unknown }
  const d = meta.date ?? n.date
  const a = meta.author ?? n.author
  const ds = d != null && d !== '' ? String(d) : ''
  const as = a != null && a !== '' ? String(a) : ''
  if (ds && as) return `${ds} ${as}`
  return ds || as
})

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