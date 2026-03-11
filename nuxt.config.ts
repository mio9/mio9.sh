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

  app: {
    head: {
      title: "MiO9.sh"
    }
  },

  devServer: {
    port: 3950
  },

  vite: {
    plugins: [tailwindcss()]
  },
  nitro: {
    compatibilityDate: '2025-07-15',
    cloudflare: {
      deployConfig: true
    }
  },

  content: {

  }


})