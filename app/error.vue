<template>
    <div>
        <NuxtLayout name="default">
            <h2>{{ error?.status }}</h2>
            <button @click="handleError">
                Clear errors
            </button>
        </NuxtLayout>
    </div>
</template>

<style scoped></style>


<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
    error: Object as () => NuxtError,
})

const handleError = () => clearError({ redirect: '/' })
</script>