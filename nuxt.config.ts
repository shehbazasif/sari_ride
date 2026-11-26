// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  colorMode: { preference: 'light', fallback: 'light' },

  routeRules: {
    '/': { prerender: true },
    // Old feroferto.gr links
    '/join/riders': { redirect: '/contact?as=rider' },
    '/join/**': { redirect: '/contact?as=company' },
    '/career': { redirect: '/about' }
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
