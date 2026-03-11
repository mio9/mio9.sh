<template>
    <Terminal :lines="aboutLines" header-left="$ cat about.txt" header-right="" :interactive="false" />
</template>

<script setup lang="ts">
import type { TerminalLine } from '~/composables/useShell';

const aboutLines: TerminalLine[] = [

    { text: 'asd', type: 'image', src: '/mio9-banner.jpg', width: 400, height: 200, rounded: 'lg'},
    { text: 'About', type: 'title' },
    { text: 'The MiO9', type: 'subheading' },
    { text: 'The odd-eye white cat thing that sometimes makes music and videos. Discovering new stuff and breaking out of the box is my daily routine, just to bring more fun to my life and so to you.', type: 'output' },
    { text: 'Currenly shows up as DJ / VJ / LJ / Web Developer / Music Producer', type: 'output' },
    { text: "", type: 'spacer' },
    { text: "Also a bit of a nerd, so I like to code and build random things. Rules are a joke.", type: 'output' },
];
</script>
