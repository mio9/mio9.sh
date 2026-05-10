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
      title: "MiO9.sh",
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
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
      deployConfig: true,
      wrangler: {
        d1_databases: [
          {
            binding: 'DB',
            database_name: 'mio9sh-content',
            database_id: 'a7c1fe0b-7bba-4afd-9a4c-df4d0afb6b53'
          }
        ]
      },
    }
  },

  content: {

  }


})