// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
  {
    files: ['app/ui/shadcn/components/ui/**/*.vue'],
    rules: {
      // disable the rule for these files
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    rules: {
      semi: 'off',
      'vue/html-self-closing': 'off',
      '@typescript-eslint/semi': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      quotes: ['error', 'single'],
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/member-delimiter-style': 'off',
      'vue/max-attributes-per-line': 'off',
    },
  },
])

// Your custom configs here
