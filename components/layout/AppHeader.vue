<template>
  <header class="header-bar">
    <div class="header-content">
      <div class="logo-container">
        <img src="/images/logo.png" alt="ProSicht Logo" class="logo-img" />
      </div>

      <nav class="nav-menu desktop-nav">
        <a href="#applications" class="nav-link">Uygulama Alanlarımız</a>
        <a href="#why-us" class="nav-link">Neden Biz</a>
        <a href="#contributions" class="nav-link">Katkılarımız</a>
        <a href="#blog" class="nav-link">Blog</a>
        <a href="#contact" class="nav-cta">İletişim</a>
      </nav>

      <!-- Desktop Controls -->
      <div class="desktop-controls">
        <button 
          @click="toggleTheme"
          class="theme-toggle"
          aria-label="Toggle theme"
        >
          <svg
            :class="['theme-icon', 'sun-icon', { 'icon-hidden': isDark }]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>

          <svg
            :class="['theme-icon', 'moon-icon', { 'icon-visible': isDark }]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>

        <ClientOnly>
          <LanguageSwitcher />
        </ClientOnly>
      </div>

      <!-- Mobile Controls -->
      <div class="mobile-right-controls">
        <button 
          @click="toggleTheme"
          class="theme-toggle"
          aria-label="Toggle theme"
        >
          <svg
            :class="['theme-icon', 'sun-icon', { 'icon-hidden': isDark }]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>

          <svg
            :class="['theme-icon', 'moon-icon', { 'icon-visible': isDark }]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>

        <!-- Language Switcher -->
        <ClientOnly>
          <LanguageSwitcher />
        </ClientOnly>

        <button class="mobile-menu-btn" @click="$emit('toggle-menu')">
          <svg class="hamburger-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import LanguageSwitcher from '../LanguageSwitcher.vue'

defineProps<{
  isDark: boolean
}>()

defineEmits<{
  'toggle-menu': []
}>()

const toggleTheme = inject<() => void>('toggleTheme')
</script>

<style scoped>
.header-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  backdrop-filter: blur(16px) saturate(180%);
  background: rgba(255, 255, 255, 0.7);
  border-bottom: 1px solid rgba(61, 186, 162, 0.1);
  transition: all 0.3s ease;
}

.dark .header-bar {
  background: rgba(15, 23, 42, 0.8);
  border-bottom: 1px solid rgba(61, 186, 162, 0.2);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-img {
  height: 110px;
  width: auto;
  transition: all 0.3s ease;
  cursor: pointer;
}

.logo-img:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 4px 12px rgba(13, 124, 108, 0.2));
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.desktop-nav {
  display: flex;
}

.nav-link {
  position: relative;
  color: #1e293b;
  font-weight: 500;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.3s ease;
  letter-spacing: 0.01em;
  padding-bottom: 0.25rem;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 2px;
  background: linear-gradient(90deg, #0D7C6C 0%, #3DBAA2 100%);
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: #0D7C6C;
}

.nav-link:hover::after {
  width: 100%;
}

.dark .nav-link {
  color: #e2e8f0;
}

.dark .nav-link:hover {
  color: #3DBAA2;
}

.nav-cta {
  padding: 0.625rem 1.5rem;
  background: #0D7C6C;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(13, 124, 108, 0.25);
}

.nav-cta:hover {
  background: #3DBAA2;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(61, 186, 162, 0.3);
}

/* Desktop Controls */
.desktop-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Mobile Controls */
.mobile-right-controls {
  display: none;
  align-items: center;
  gap: 0.75rem;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #1e293b;
  transition: color 0.3s ease;
}

.mobile-menu-btn:hover {
  color: #0D7C6C;
}

.hamburger-icon {
  width: 28px;
  height: 28px;
}

.theme-toggle {
  position: relative;
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(226, 232, 240, 0.6);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  margin-left: 1rem;
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(61, 186, 162, 0.4);
  box-shadow: 0 0 15px rgba(61, 186, 162, 0.3);
  transform: translateY(-2px);
}

.theme-toggle:active {
  transform: scale(0.95);
}

.theme-icon {
  position: absolute;
  width: 24px;
  height: 24px;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.sun-icon {
  color: #0D7C6C;
  transform: scale(1) rotate(0deg);
  opacity: 1;
}

.sun-icon.icon-hidden {
  transform: scale(0) rotate(90deg);
  opacity: 0;
}

.moon-icon {
  color: #3DBAA2;
  transform: scale(0) rotate(-90deg);
  opacity: 0;
}

.moon-icon.icon-visible {
  transform: scale(1) rotate(0deg);
  opacity: 1;
}

.dark .theme-toggle {
  background: rgba(30, 41, 59, 0.5);
  border-color: rgba(71, 85, 105, 0.6);
}

.dark .theme-toggle:hover {
  background: rgba(30, 41, 59, 0.8);
  border-color: rgba(61, 186, 162, 0.4);
}

@media (max-width: 768px) {
  .nav-menu {
    display: none !important;
  }
  
  .desktop-nav {
    display: none;
  }

  /* Hide desktop controls on mobile */
  .desktop-controls {
    display: none;
  }

  /* Show mobile controls on mobile */
  .mobile-right-controls {
    display: flex;
  }
  
  .mobile-menu-btn {
    display: block;
  }
  
  .logo-img {
    height: 60px;
  }
  
  .header-content {
    padding: 0.75rem 1rem;
    width: 100%;
    justify-content: space-between;
  }
  
  .theme-toggle {
    width: 42px;
    height: 42px;
  }
  
  .theme-icon {
    width: 20px;
    height: 20px;
  }
  
  .hamburger-icon {
    width: 24px;
    height: 24px;
  }
}
</style>
