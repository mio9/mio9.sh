<template>
    <div>
        <Terminal :lines="terminalLines" header-left="$ ls -1 notes/*.md" :interactive="false" />
        <ul v-if="noteList?.length" class="mt-4 max-w-3xl space-y-2 font-mono text-sm">
            <li v-for="note in noteList" :key="note.path" class="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <NuxtLink
                    :to="`/notes/${noteSlug(note.path)}`"
                    class="text-blue-400 underline underline-offset-4 decoration-blue-400/60 transition-colors hover:text-blue-300 hover:decoration-blue-300 shrink-0"
                >
                    {{ noteFilename(note.path) }}
                </NuxtLink>
                <span v-if="note.title" class="text-purple-300/90 drop-shadow-[0_0_2px_rgba(192,132,252,0.35)]">
                    — {{ note.title }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
type NoteListItem = {
    path: string
    title?: string
    description?: string
    date?: string
}

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

function noteFilename(contentPath: string) {
    return `${noteSlug(contentPath)}.md`
}

const terminalLines = computed<TerminalLine[]>(() => {
    const list = noteList.value
    if (list?.length) {
        return [
            ...list.map((n) => ({ text: noteFilename(n.path), type: 'output' as const })),
        ]
    }
    return [{ text: 'total 0', type: 'muted' }]
})

useSeoMeta({
    title: 'Notes',
    description: 'Articles and notes from mio9.sh',
})
</script>
