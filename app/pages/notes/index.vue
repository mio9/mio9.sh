<template>
    <div>
        <Terminal :lines="terminalLines" header-left="$ ls -l notes" :interactive="false" />
    </div>
</template>

<script setup lang="ts">
type NoteListItem = {
    path: string
    title?: string
    description?: string
    date?: string
}

const LS_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const { data: noteList } = await useAsyncData('notes-list', async () => {
    const rows = await queryCollection('content')
        .where('path', 'LIKE', '/notes/%')
        .order('path', 'ASC')
        .all()
    return rows as NoteListItem[]
})

function noteSlug(contentPath: string) {
    return contentPath.replace(/^\/notes\//, '')
}

function noteMeta(note: NoteListItem) {
    const n = note as Record<string, unknown>
    const meta = (n.meta ?? {}) as Record<string, unknown>
    const author =
        meta.author != null && String(meta.author).trim() !== ''
            ? String(meta.author)
            : n.author != null && String(n.author).trim() !== ''
              ? String(n.author)
              : 'mio9'
    const rawDate = meta.date ?? n.date
    return {
        author,
        rawDate: rawDate != null ? String(rawDate) : undefined,
    }
}

/** ls -l style "11 May 00:54"; date-only YAML uses midnight local time. */
function formatLsStamp(raw?: string) {
    if (!raw) return { day: '-', month: '--', stamp: '--:--' }
    const d = new Date(raw)
    if (Number.isNaN(d.getTime())) return { day: '-', month: '--', stamp: '--:--' }
    return {
        day: String(d.getDate()),
        month: LS_MONTHS[d.getMonth()] ?? '--',
        stamp: `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`,
    }
}

/** Fixed `ls -l`-style preamble: mode, placeholder, author, day mon time, then a trailing space before the name column. */
function lsLinePrefix(note: NoteListItem) {
    const { author, rawDate } = noteMeta(note)
    const { day, month, stamp } = formatLsStamp(rawDate)
    return `-rw-r--r--@ - ${author} ${day} ${month} ${stamp} `
}

function displayBasename(note: NoteListItem) {
    const stem = noteSlug(note.path)
    if (note.title && note.title.trim() !== '') return note.title.trim()
    return stem.replace(/-/g, ' ')
}

const terminalLines = computed<TerminalLine[]>(() => {
    const list = noteList.value
    if (list?.length) {
        return list.map((n) => ({
            prefix: lsLinePrefix(n),
            text: displayBasename(n),
            to: `/notes/${noteSlug(n.path)}`,
            type: 'output' as const,
        }))
    }
    return [{ text: 'total 0', type: 'muted' }]
})

useSeoMeta({
    title: 'Notes',
    description: 'Articles and notes from mio9.sh',
})
</script>
