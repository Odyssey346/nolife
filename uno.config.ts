import {
    transformerDirectives,
    presetWebFonts,
    presetWind,
    defineConfig,
    presetIcons,
    transformerVariantGroup
} from 'unocss'

export default defineConfig({
    presets: [
        presetWind({
          dark: "media"
        }),
        presetWebFonts({
          provider: 'google', // default provider
          fonts: {
            // these will extend the default theme
            sans: ['Outfit:400'],
          },
        }),
        presetIcons({
          extraProperties: {
            'display': 'inline-block',
            'vertical-align': 'middle',
          },
        }),
    ],
    transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
    ],
    theme: {
        colors: {
            background: 'var(--background)',
            foreground: 'var(--foreground)',
            accent: 'var(--accent)',
            secondbackground: 'var(--second-background)',
            thirdbackground: 'var(--third-background)',
        },
        fontFamily: {
          sans: ["Nunito", "sans-serif"],
        },
    }
})