const pkg = require("./package");

module.exports = {
  mode: "universal",

  generate: {
    dir: "public"
  },

  /*
   ** Headers of the page
   */
  head: {
    title: "MiO9.sh",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description },
      { name: "theme-color", content: "#202020" }
    ],
    link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: ["@/assets/fonts/fonts.css"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "nuxt-device-detect",
    "@nuxtjs/markdownit",
    "@nuxtjs/sitemap"
  ],

  buildModules: ["@nuxtjs/fontawesome"],

  fontawesome: {
    component: "fa",
    icons: {
      solid: true,
      brands: true
    }
  },

  sitemap: {
    hostname: "https://mio9.sh",
    exclude: ["/metrocard", "/now-you-fuck-off", "/raillab"]
  },

  markdownit: {
    linkify: false,
    breaks: true,
    use: ["markdown-it-checkbox", "markdown-it-highlightjs"]
  },
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {
    //   // Run ESLint on save
    //   if (ctx.isDev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  }
};
