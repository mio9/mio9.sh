<template>
    <div>
        <!-- terminal area -->
        <Terminal
            :lines="lines"
            :pre-message="preMessage"
            v-model="input"
            @submit="handleInput"
        />
        <!-- Discography -->
        <h2 class="text-2xl font-bold text-purple-300 mb-4 mt-4">🎵 > Discography</h2>
        <div class="flex flex-wrap justify-start gap-4 h-auto">
            <iframe class="w-[200px] h-[200px]"
                src="https://bandcamp.com/EmbeddedPlayer/album=315346018/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/"
                seamless>Re:Light by MiO9, RegZ</iframe>
            <iframe class="w-[200px] h-[200px]"
                src="https://bandcamp.com/EmbeddedPlayer/track=843483581/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/"
                seamless>Voyage by MiO9, TACA Music</iframe>
            <iframe class="w-[200px] h-[200px]"
                src="https://bandcamp.com/EmbeddedPlayer/track=469524244/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/"
                seamless>ULTRA * HYPER * XD by MIO9</iframe>
            <iframe class="w-[200px] h-[200px]"
                src="https://bandcamp.com/EmbeddedPlayer/track=2815041959/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/"
                seamless>Nameless Dimension by mio9, RegZ</iframe>
            <iframe class="w-[200px] h-[200px]"
                src="https://bandcamp.com/EmbeddedPlayer/track=4067402184/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/"
                seamless>Flare by MIO9</iframe>
        </div>
    </div>
</template>

<script setup lang="ts">
const { lines, input, handleInput, getPreLoadedMessage } = useShell();
const preMessage = computed(() => getPreLoadedMessage());
</script>
