// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  vite: { plugins: [tailwindcss()] },
  css: ["~/assets/css/index.css"],
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@vueuse/nuxt",
    "@vee-validate/nuxt",
    "shadcn-nuxt",
    "@pinia/nuxt",
  ],
  shadcn: {
    prefix: "",
    componentDir: "~/ui/shadcn",
  },
  veeValidate: {
    autoImports: true,
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
});
