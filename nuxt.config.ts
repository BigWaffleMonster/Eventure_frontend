// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@vee-validate/nuxt',
    'shadcn-nuxt',
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],
  plugins: [],
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/index.css'],
  compatibilityDate: '2025-07-15',
  vite: { plugins: [tailwindcss()] },

  runtimeConfig: {
    // Private environment variables (server-side only)
    // These will be loaded from process.env at runtime
    // apiSecret: '',
    public: {
      apiUrl: ''
    }
  },

  eslint: {
    config: {
      stylistic: true
    }
  },
  shadcn: {
    prefix: '',
    componentDir: '~/ui/shadcn'
  },
  veeValidate: {
    autoImports: true
  }
})
