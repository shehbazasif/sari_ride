// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import betterTailwindcss from 'eslint-plugin-better-tailwindcss'
import { getDefaultAttributes } from 'eslint-plugin-better-tailwindcss/api/defaults'

export default withNuxt(
  betterTailwindcss.configs['correctness-error'],
  {
    settings: {
      'better-tailwindcss': {
        entryPoint: 'app/assets/css/main.css',
        attributes: [
          ...getDefaultAttributes(),
          ['^v-bind:ui$', [{ match: 'objectValues' }]]
        ]
      }
    }
  },
  {
    // Custom animation/panel classes defined in app/assets/css/main.css
    rules: {
      'better-tailwindcss/no-unknown-classes': ['error', {
        ignore: ['^(panel|grid-bg|glow-text|rise|sweep|flow|ping|float|draw|grow)( |$|\\b)']
      }]
    }
  }
)
