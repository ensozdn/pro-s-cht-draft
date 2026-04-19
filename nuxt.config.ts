// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@nuxtjs/i18n'],
  
  i18n: {
    locales: [
      { code: 'tr', name: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
      { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr' },
      { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
      { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
      { code: 'de', name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
      { code: 'it', name: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
      { code: 'pt', name: 'Português', flag: '🇵🇹', dir: 'ltr' },
      { code: 'ru', name: 'Русский', flag: '🇷🇺', dir: 'ltr' },
      { code: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
      { code: 'nl', name: 'Nederlands', flag: '🇳🇱', dir: 'ltr' }
    ],
    defaultLocale: 'tr',
    strategy: 'no_prefix',
    detectBrowserLanguage: false
  } as any,
  
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
