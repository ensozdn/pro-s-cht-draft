// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@nuxtjs/i18n'],
  
  i18n: {
    locales: [
      { code: 'tr', iso: 'tr-TR', file: 'tr.json', name: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English', flag: '🇬🇧', dir: 'ltr' },
      { code: 'ar', iso: 'ar-SA', file: 'ar.json', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
      { code: 'fr', iso: 'fr-FR', file: 'fr.json', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
      { code: 'de', iso: 'de-DE', file: 'de.json', name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
      { code: 'it', iso: 'it-IT', file: 'it.json', name: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
      { code: 'pt', iso: 'pt-PT', file: 'pt.json', name: 'Português', flag: '🇵🇹', dir: 'ltr' },
      { code: 'ru', iso: 'ru-RU', file: 'ru.json', name: 'Русский', flag: '🇷🇺', dir: 'ltr' },
      { code: 'es', iso: 'es-ES', file: 'es.json', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
      { code: 'nl', iso: 'nl-NL', file: 'nl.json', name: 'Nederlands', flag: '🇳🇱', dir: 'ltr' }
    ],
    defaultLocale: 'tr',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },
    langDir: 'locales',
    lazy: true,
    vueI18n: './i18n.config.ts'
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
  }
})
