<template>
  <div>
    <article v-if="notes" class="note-prose">
      <header class="note-meta-row">
        <h1>{{ notes.title }}</h1>
        <div class="note-meta-trailing">
          <p v-if="byline" class="note-byline">{{ byline }}</p>
          <div
            v-if="versionEntries.length"
            ref="versionPopoverRootRef"
            class="note-versions-wrap"
          >
            <button
              ref="versionTriggerRef"
              type="button"
              class="note-versions-trigger"
              :aria-expanded="versionsOpen"
              aria-controls="note-versions-popover"
              aria-haspopup="dialog"
              aria-label="Version history"
              @click.stop="versionsOpen = !versionsOpen"
            >
              <Icon name="uil:history" class="size-5" />
            </button>
            <div
              v-show="versionsOpen"
              id="note-versions-popover"
              class="note-versions-popover"
              role="dialog"
              aria-label="Version history"
              :style="versionPopoverStyle"
            >
              <div class="note-versions-popover-header">
                <h2 class="note-versions-popover-title">Version history</h2>
                <button
                  type="button"
                  class="note-versions-close"
                  aria-label="Close version history"
                  @click="closeVersions"
                >
                  <Icon name="uil:times" class="size-5" />
                </button>
              </div>
              <ol class="note-versions-list">
                <li v-for="(entry, idx) in versionEntries" :key="idx">
                  <time
                    v-if="entry.dateLabel"
                    class="note-versions-date"
                    :datetime="entry.isoDate"
                  >{{ entry.dateLabel }}</time>
                  <p v-if="entry.content" class="note-versions-body">{{ entry.content }}</p>
                </li>
              </ol>
            </div>
          </div>
        </div>
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
import {
  onClickOutside,
  onKeyStroke,
  useElementBounding,
  useWindowSize,
} from '@vueuse/core'

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

type VersionRow = { dateLabel: string; isoDate: string; content: string }

function formatVersionDateLabel(iso: string): { label: string; isoDate: string } {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return { label: iso, isoDate: iso }
  const label = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(d)
  return { label, isoDate: d.toISOString() }
}

const versionEntries = computed<VersionRow[]>(() => {
  const n = notes.value as Record<string, unknown> | undefined
  if (!n) return []
  const meta = (n.meta ?? {}) as Record<string, unknown>
  const raw = meta.versions ?? n.versions
  if (!Array.isArray(raw) || raw.length === 0) return []
  const rows = raw.map((item) => {
    const e = item as { date?: string; content?: unknown }
    const isoRaw = e.date != null ? String(e.date) : ''
    const formatted = isoRaw ? formatVersionDateLabel(isoRaw) : { label: '', isoDate: '' }
    const content = e.content != null ? String(e.content).trim() : ''
    const t = isoRaw ? new Date(isoRaw).getTime() : 0
    const sortKey = Number.isFinite(t) ? t : 0
    return {
      dateLabel: formatted.label,
      isoDate: formatted.isoDate,
      content,
      sortKey,
    }
  })
  const valid = rows.filter((r) => r.content !== '' || r.dateLabel !== '')
  valid.sort((a, b) => b.sortKey - a.sortKey)
  return valid.map((r) => ({
    dateLabel: r.dateLabel,
    isoDate: r.isoDate,
    content: r.content,
  }))
})

useSeoMeta({
  title: () => notes.value?.title ?? 'Note not found',
  description: () => notes.value?.description,
})

const route = useRoute()
const notesLines = computed<TerminalLine[]>(() => [
  {
    text: `cat: notes/${String(route.params.id)}.md: No such file or directory`,
    type: 'error',
  },
  { text: '', type: 'spacer' },
  { text: '← ls notes (back to listing)', to: '/notes', type: 'output' },
])

const versionsOpen = ref(false)
const versionPopoverRootRef = ref<HTMLElement | null>(null)
const versionTriggerRef = ref<HTMLButtonElement | null>(null)

const popupYOffset = -100

const { bottom: triggerBottom, right: triggerRight, update: updateTriggerBounds } = useElementBounding(
  versionTriggerRef,
  { windowResize: true, windowScroll: true },
)
const { width: windowWidth } = useWindowSize()

/** Popover top-right corner aligned to trigger bottom-right (fixed, below icon). */
const versionPopoverStyle = computed(() => {
  if (!versionsOpen.value) return {}
  const rw = windowWidth.value
  const r = triggerRight.value
  const b = triggerBottom.value
  return {
    position: 'fixed' as const,
    top: `${b + popupYOffset}px`,
    right: `${rw - r}px`,
    width: 'min(calc(80vw - 5rem), 40rem)',
    maxHeight: 'min(70vh, 20rem)',
    zIndex: 50,
  }
})

function closeVersions() {
  versionsOpen.value = false
}

onClickOutside(versionPopoverRootRef, () => {
  if (versionsOpen.value) closeVersions()
})

onKeyStroke('Escape', () => {
  if (versionsOpen.value) closeVersions()
})

watch(versionsOpen, async (open) => {
  if (open) {
    await nextTick()
    updateTriggerBounds()
  }
})
</script>