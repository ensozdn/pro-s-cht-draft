// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@nuxtjs/i18n'],
  
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
    strategy: 'no_prefix', // Clean URLs without language prefix
    defaultLocale: 'tr',
    locales: [
      { code: 'tr', iso: 'tr-TR', file: 'tr.json', name: 'Türkçe', dir: 'ltr' },
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English', dir: 'ltr' },
      { code: 'ar', iso: 'ar-SA', file: 'ar.json', name: 'العربية', dir: 'rtl' },
      { code: 'fr', iso: 'fr-FR', file: 'fr.json', name: 'Français', dir: 'ltr' },
      { code: 'de', iso: 'de-DE', file: 'de.json', name: 'Deutsch', dir: 'ltr' },
      { code: 'it', iso: 'it-IT', file: 'it.json', name: 'Italiano', dir: 'ltr' },
      { code: 'pt', iso: 'pt-PT', file: 'pt.json', name: 'Português', dir: 'ltr' },
      { code: 'ru', iso: 'ru-RU', file: 'ru.json', name: 'Русский', dir: 'ltr' },
      { code: 'es', iso: 'es-ES', file: 'es.json', name: 'Español', dir: 'ltr' },
      { code: 'nl', iso: 'nl-NL', file: 'nl.json', name: 'Nederlands', dir: 'ltr' }
    ],
    lazy: true,
    langDir: 'locales', // i18n/locales/ klasöründeki dosyalar
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'prosicht_i18n_locale',
      redirectOn: 'root',
      alwaysRedirect: false
    },
    compilation: {
      strictMessage: false
    }
  }
})
