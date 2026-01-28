import { defineStore } from "pinia";

export const useMainStore = defineStore('main', () => {
    const wallpaper = ref<string>('bg1');
    return {
        wallpaper
    }
})