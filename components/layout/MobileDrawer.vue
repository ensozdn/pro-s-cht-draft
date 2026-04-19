<template>
  <Transition name="drawer">
    <div v-if="isOpen" class="mobile-drawer-overlay" @click="$emit('close')">
      <div class="mobile-drawer-panel" @click.stop>
        <button class="drawer-close-btn" @click="$emit('close')">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <nav class="drawer-nav">
          <a href="#" class="drawer-link" @click="$emit('close')">Anasayfa</a>
          <a href="#" class="drawer-link" @click="$emit('close')">Uygulamalarımız</a>
          <a href="#" class="drawer-link" @click="$emit('close')">Hakkımızda</a>
          <a href="#" class="drawer-link" @click="$emit('close')">Fiyatlandırma</a>
          <a href="#" class="drawer-link" @click="$emit('close')">İletişim</a>
        </nav>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  close: []
}>()
</script>

<style scoped>
.mobile-drawer-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  justify-content: flex-end;
}

.mobile-drawer-panel {
  position: relative;
  width: 75%;
  max-width: 280px;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px) saturate(180%);
  border-left: 1px solid rgba(13, 124, 108, 0.2);
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.2);
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
}

.drawer-close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(13, 124, 108, 0.1);
  border-radius: 10px;
  color: #0D7C6C;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.drawer-close-btn:hover {
  background: rgba(13, 124, 108, 0.2);
  transform: rotate(90deg);
}

.drawer-nav {
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.drawer-link {
  color: #1e293b;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.drawer-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background: linear-gradient(135deg, #0D7C6C 0%, #3DBAA2 100%);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.drawer-link:hover {
  background: rgba(13, 124, 108, 0.1);
  color: #0D7C6C;
  padding-left: 1.5rem;
}

.drawer-link:hover::before {
  transform: scaleY(1);
}

.dark .mobile-drawer-panel {
  background: rgba(15, 23, 42, 0.95);
  border-left-color: rgba(61, 186, 162, 0.2);
}

.dark .drawer-close-btn {
  background: rgba(61, 186, 162, 0.1);
  color: #3DBAA2;
}

.dark .drawer-close-btn:hover {
  background: rgba(61, 186, 162, 0.2);
}

.dark .drawer-link {
  color: #e2e8f0;
}

.dark .drawer-link:hover {
  background: rgba(61, 186, 162, 0.1);
  color: #3DBAA2;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-enter-active .mobile-drawer-panel,
.drawer-leave-active .mobile-drawer-panel {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-from .mobile-drawer-panel,
.drawer-leave-to .mobile-drawer-panel {
  transform: translateX(100%);
}
</style>
