// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
  {
    ignores: ['app/ui/shadcn/components/ui/**/*']
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
      '@stylistic/brace-style': 'off',
      '@stylistic/comma-dangle': 'off',
      '@stylistic/operator-linebreak': 'off',
      '@stylistic/arrow-parens': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/comma-dangle': 'off',
      'nuxt/nuxt-config-keys-order': 'off',
      'vue/attribute-hyphenation': 'off',
      'vue/v-on-event-hyphenation': 'off'
    }
  }
])

// Your custom configs here
