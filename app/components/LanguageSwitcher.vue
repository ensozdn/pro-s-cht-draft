<template>
  <div class="language-switcher">
    <button
      @click="toggleDropdown"
      class="language-button"
      :class="{ 'active': isOpen }"
    >
      <span class="language-flag">{{ currentLocale?.flag }}</span>
      <span class="language-code">{{ currentLocale?.code.toUpperCase() }}</span>
      <svg
        class="chevron"
        :class="{ 'rotate': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <Transition name="dropdown">
      <div v-if="isOpen" class="language-dropdown">
        <button
          v-for="lang in languages"
          :key="lang.code"
          @click="switchLanguage(lang.code)"
          class="language-item"
          :class="{ 'active': currentLocale?.code === lang.code }"
        >
          <span class="item-flag">{{ lang.flag }}</span>
          <span class="item-name">{{ lang.name }}</span>
          <svg
            v-if="currentLocale?.code === lang.code"
            class="check-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const languages = [
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
]

const isOpen = ref(false)

// Use official @nuxtjs/i18n composable
const { locale, setLocale } = useI18n()

const currentLocale = computed(() => {
  return languages.find(l => l.code === locale.value) || languages[0]
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const switchLanguage = (code: string) => {
  const selectedLocale = languages.find(l => l.code === code)
  if (selectedLocale) {
    setLocale(code as any) // Type assertion for @nuxtjs/i18n
    
    // Update HTML attributes for RTL support
    if (import.meta.client) {
      document.documentElement.setAttribute('dir', selectedLocale.dir)
      document.documentElement.setAttribute('lang', code.toLowerCase())
    }
  }
  isOpen.value = false
}

const closeDropdown = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.language-switcher')) {
    isOpen.value = false
  }
}

onMounted(() => {
  if (import.meta.client) {
    document.addEventListener('click', closeDropdown)
    
    // Set initial HTML attributes
    const current = currentLocale.value
    if (current) {
      document.documentElement.setAttribute('dir', current.dir)
      document.documentElement.setAttribute('lang', current.code.toLowerCase())
    }
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    document.removeEventListener('click', closeDropdown)
  }
})
</script>

<style scoped>
.language-switcher {
  position: relative;
  z-index: 50;
}

.language-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1e293b;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.language-button:hover {
  background: rgba(255, 255, 255, 0.7);
  border-color: rgba(61, 186, 162, 0.4);
  box-shadow: 0 4px 12px rgba(13, 124, 108, 0.1);
}

.language-button.active {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(61, 186, 162, 0.5);
}

.dark .language-button {
  background: rgba(15, 23, 42, 0.5);
  border-color: rgba(61, 186, 162, 0.2);
  color: #f1f5f9;
}

.dark .language-button:hover {
  background: rgba(15, 23, 42, 0.7);
  border-color: rgba(61, 186, 162, 0.4);
  box-shadow: 0 4px 12px rgba(61, 186, 162, 0.2);
}

.dark .language-button.active {
  background: rgba(15, 23, 42, 0.8);
  border-color: rgba(61, 186, 162, 0.5);
}

.language-flag {
  font-size: 1.25rem;
  line-height: 1;
}

.language-code {
  font-weight: 600;
  letter-spacing: 0.05em;
}

.chevron {
  width: 1rem;
  height: 1rem;
  transition: transform 0.3s ease;
}

.chevron.rotate {
  transform: rotate(180deg);
}

.language-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 200px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 1rem;
  padding: 0.5rem;
  box-shadow: 
    0 20px 40px -12px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  max-height: 400px;
  overflow-y: auto;
}

.dark .language-dropdown {
  background: rgba(15, 23, 42, 0.95);
  border-color: rgba(61, 186, 162, 0.2);
  box-shadow: 
    0 20px 40px -12px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(61, 186, 162, 0.1);
}

.language-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.language-item:hover {
  background: rgba(61, 186, 162, 0.08);
  color: #0D7C6C;
}

.language-item.active {
  background: rgba(61, 186, 162, 0.12);
  color: #0D7C6C;
  font-weight: 600;
}

.dark .language-item {
  color: #cbd5e1;
}

.dark .language-item:hover {
  background: rgba(61, 186, 162, 0.15);
  color: #5DD4BF;
}

.dark .language-item.active {
  background: rgba(61, 186, 162, 0.2);
  color: #5DD4BF;
}

.item-flag {
  font-size: 1.25rem;
  line-height: 1;
}

.item-name {
  flex: 1;
}

.check-icon {
  width: 1rem;
  height: 1rem;
  color: #0D7C6C;
}

.dark .check-icon {
  color: #3DBAA2;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.language-dropdown::-webkit-scrollbar {
  width: 6px;
}

.language-dropdown::-webkit-scrollbar-track {
  background: transparent;
}

.language-dropdown::-webkit-scrollbar-thumb {
  background: rgba(13, 124, 108, 0.3);
  border-radius: 3px;
}

.language-dropdown::-webkit-scrollbar-thumb:hover {
  background: rgba(13, 124, 108, 0.5);
}

.dark .language-dropdown::-webkit-scrollbar-thumb {
  background: rgba(61, 186, 162, 0.3);
}

.dark .language-dropdown::-webkit-scrollbar-thumb:hover {
  background: rgba(61, 186, 162, 0.5);
}
</style>
