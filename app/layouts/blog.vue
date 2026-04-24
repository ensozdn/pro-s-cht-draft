<template>
  <div :class="isDark ? 'bg-slate-900' : 'bg-slate-50'" class="min-h-screen overflow-x-hidden">
    <AppHeader :is-dark="isDark" @toggle-menu="isMobileMenuOpen = true" />
    <MobileDrawer :is-open="isMobileMenuOpen" @close="isMobileMenuOpen = false" />
    <slot />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import AppHeader from '../components/layout/AppHeader.vue'
import MobileDrawer from '../components/layout/MobileDrawer.vue'
import AppFooter from '../components/layout/AppFooter.vue'
import { useTheme } from '../composables/useTheme'

const { isDark, toggleTheme, initTheme } = useTheme()
provide('toggleTheme', toggleTheme)

const isMobileMenuOpen = ref(false)

onMounted(() => initTheme())
</script>
