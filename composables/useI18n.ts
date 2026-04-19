import { ref, computed } from 'vue'
import type { Ref } from 'vue'

// Translation type
interface Translations {
  [key: string]: any
}

// Current locale
const currentLocale: Ref<string> = ref('tr')

// Load translations dynamically
const loadTranslations = async (locale: string): Promise<Translations> => {
  try {
    const translations = await import(`~/locales/${locale}.json`)
    return translations.default || translations
  } catch (error) {
    console.warn(`Failed to load translations for ${locale}, falling back to tr`)
    const fallback = await import('~/locales/tr.json')
    return fallback.default || fallback
  }
}

// Translations cache
const translationsCache: Ref<Record<string, Translations>> = ref({})

export const useI18n = () => {
  const locale = computed({
    get: () => currentLocale.value,
    set: async (newLocale: string) => {
      currentLocale.value = newLocale
      
      // Load translations if not cached
      if (!translationsCache.value[newLocale]) {
        translationsCache.value[newLocale] = await loadTranslations(newLocale)
      }
      
      // Save to localStorage
      if (process.client) {
        localStorage.setItem('locale', newLocale)
      }
    }
  })

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translationsCache.value[currentLocale.value]
    
    if (!value) return key
    
    for (const k of keys) {
      value = value[k]
      if (value === undefined) return key
    }
    
    return value
  }

  const setLocale = async (newLocale: string) => {
    locale.value = newLocale
  }

  // Initialize
  const init = async () => {
    // Load saved locale from localStorage
    if (process.client) {
      const savedLocale = localStorage.getItem('locale') || 'tr'
      currentLocale.value = savedLocale
    }
    
    // Load initial translations
    if (!translationsCache.value[currentLocale.value]) {
      translationsCache.value[currentLocale.value] = await loadTranslations(currentLocale.value)
    }
  }

  return {
    locale,
    t,
    setLocale,
    init
  }
}
