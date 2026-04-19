<template>
  <div class="language-switcher">
    <button
      @click="isOpen = !isOpen"
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
          v-for="locale in availableLocales"
          :key="locale.code"
          @click="switchLanguage(locale.code)"
          class="language-item"
          :class="{ 'active': currentLocale?.code === locale.code }"
        >
          <span class="item-flag">{{ locale.flag }}</span>
          <span class="item-name">{{ locale.name }}</span>
          <svg
            v-if="currentLocale?.code === locale.code"
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
// @ts-ignore
import { useI18n } from '#i18n'

const { locale, locales, setLocale } = useI18n()
const isOpen = ref(false)

const availableLocales = computed(() => {
  return locales.value as any[]
})

const currentLocale = computed(() => {
  return availableLocales.value.find(l => l.code === locale.value)
})

const switchLanguage = async (code: string) => {
  await setLocale(code)
  isOpen.value = false
  
  const selectedLocale = availableLocales.value.find(l => l.code === code)
  if (selectedLocale) {
    document.documentElement.setAttribute('dir', selectedLocale.dir)
    document.documentElement.setAttribute('lang', code)
  }
}

const closeDropdown = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.language-switcher')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
  
  const currentLoc = currentLocale.value
  if (currentLoc) {
    document.documentElement.setAttribute('dir', currentLoc.dir)
    document.documentElement.setAttribute('lang', currentLoc.code)
  }
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
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
