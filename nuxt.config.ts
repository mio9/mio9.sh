import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/fonts'
  ],
  css: ['@/assets/css/main.css'],

  devServer: {
    port: 3950
  },

  vite: {
    plugins: [tailwindcss()]
  },

  content: {

  }


})