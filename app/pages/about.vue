<template>
    <div class="relative">
        <div
            class="relative bg-black/80 backdrop-blur-sm p-4 rounded-lg min-h-[200px] border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.3)] about-terminal"
        >
            <!-- CRT scanlines overlay -->
            <div class="absolute inset-0 about-scanlines pointer-events-none rounded-lg" />
            <!-- Flickering overlay -->
            <div class="absolute inset-0 about-flicker pointer-events-none rounded-lg" />

            <div class="relative z-10">
                <div class="flex items-center gap-2 mb-4">
                    <span class="text-sm text-pink-300 drop-shadow-[0_0_4px_rgba(236,72,153,0.8)]">$ cat about.txt</span>
                </div>
                <h1 class="text-xl font-bold text-purple-200 mb-3 drop-shadow-[0_0_3px_rgba(192,132,252,0.6)]">
                    About
                </h1>
                <h2 class="text-lg font-semibold text-purple-300 mb-3 drop-shadow-[0_0_2px_rgba(192,132,252,0.6)]">
                    The MiO9
                </h2>
                <div class="space-y-3 text-sm text-purple-400 font-mono drop-shadow-[0_0_2px_rgba(192,132,252,0.6)]">
                    <p>
                        The odd-eye white cat thing that sometimes makes music and videos. Discovering new stuff and breaking out of the box is my daily routine, just to bring more fun to my life and so to you.
                    </p>
                    <p>
                        Currenly shows up as DJ / VJ / LJ / Web Developer / Music Producer / Artist / etc.
                    </p>
                    <p>
                        I'm also a bit of a nerd, so I like to code and build things.
                    </p>
                </div>
            </div>

            <!-- CRT glow effect -->
            <div class="absolute inset-0 about-glow pointer-events-none rounded-lg" />

        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.about-terminal {
    box-shadow:
        0 0 20px rgba(168, 85, 247, 0.3),
        inset 0 0 60px rgba(0, 0, 0, 0.5),
        0 0 0 1px rgba(168, 85, 247, 0.2);
}

.about-scanlines {
    background:
        repeating-linear-gradient(0deg,
            rgba(192, 132, 252, 0.03) 0px,
            transparent 1px,
            transparent 2px,
            rgba(192, 132, 252, 0.03) 3px);
    animation: about-scanline 8s linear infinite;
}

@keyframes about-scanline {
    0% { background-position: 0 0; }
    100% { background-position: 0 100%; }
}

.about-flicker {
    animation: about-flicker 0.15s infinite;
}

@keyframes about-flicker {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.97; }
    98% { opacity: 0.99; }
    99% { opacity: 0.96; }
}

.about-glow {
    background: radial-gradient(ellipse at center,
        transparent 0%,
        rgba(168, 85, 247, 0.05) 50%,
        transparent 100%);
    animation: about-glow 2s ease-in-out infinite alternate;
}

@keyframes about-glow {
    0% { opacity: 0.5; }
    100% { opacity: 0.8; }
}
</style>