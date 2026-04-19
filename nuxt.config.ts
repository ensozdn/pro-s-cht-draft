// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],
  
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
