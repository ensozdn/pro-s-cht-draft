// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // SSR devre dışı — vite-node SSR runner Nuxt4+Node22 kombinasyonunda crash ediyor
  // Blog SEO'su için routeRules ile prerender kullanılıyor
  ssr: false,

  routeRules: {
    '/blog/**': { prerender: true }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/i18n',
    '@nuxt/content',
    'nuxt-studio'
  ],

  studio: {
    enabled: true
  },

  typescript: {
    typeCheck: false,
    strict: false
  },
  
  googleFonts: {
    families: {
      'Space Grotesk': [400, 500, 600, 700]
    },
    display: 'swap'
  },
  
  tailwindcss: {
    config: {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Space Grotesk', 'sans-serif']
          },
          colors: {
            primary: '#4F46E5',      // Derin İndigo
            'primary-dark': '#4338CA', // Koyu İndigo
            accent: '#06B6D4',        // Premium Turkuaz
            'accent-light': '#22D3EE', // Açık Turkuaz
            'accent-dark': '#0891B2'   // Koyu Turkuaz
          }
        }
      }
    }
  },

  // ═══════════════════════════════════════════════════════
  // i18n Configuration - A-Grade Professional Setup
  // ═══════════════════════════════════════════════════════
  i18n: {
    // @ts-ignore - lazy property exists in runtime but not in type definitions
    lazy: false,
    strategy: 'no_prefix',
    defaultLocale: 'tr',
    langDir: 'locales',
    locales: [
      { code: 'tr', language: 'tr-TR', file: 'tr.json', name: 'Türkçe', dir: 'ltr' },
      { code: 'en', language: 'en-US', file: 'en.json', name: 'English', dir: 'ltr' },
      { code: 'ar', language: 'ar-SA', file: 'ar.json', name: 'العربية', dir: 'rtl' },
      { code: 'fr', language: 'fr-FR', file: 'fr.json', name: 'Français', dir: 'ltr' },
      { code: 'de', language: 'de-DE', file: 'de.json', name: 'Deutsch', dir: 'ltr' },
      { code: 'it', language: 'it-IT', file: 'it.json', name: 'Italiano', dir: 'ltr' },
      { code: 'pt', language: 'pt-PT', file: 'pt.json', name: 'Português', dir: 'ltr' },
      { code: 'ru', language: 'ru-RU', file: 'ru.json', name: 'Русский', dir: 'ltr' },
      { code: 'es', language: 'es-ES', file: 'es.json', name: 'Español', dir: 'ltr' },
      { code: 'nl', language: 'nl-NL', file: 'nl.json', name: 'Nederlands', dir: 'ltr' }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'prosicht_i18n_locale',
      redirectOn: 'root',
      alwaysRedirect: false
    }
  }
})