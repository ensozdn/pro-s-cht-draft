<template>
  <div ref="preloaderEl" class="preloader">
    <div class="preloader-content">
      <img src="/images/logo.png" alt="ProSicht Logo" class="preloader-logo-img" />
      <div class="preloader-bar-wrapper">
        <div ref="preloaderBarEl" class="preloader-bar"></div>
      </div>
      <p ref="preloaderTextEl" class="preloader-text">0%</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const preloaderEl = ref<HTMLDivElement>()
const preloaderBarEl = ref<HTMLDivElement>()
const preloaderTextEl = ref<HTMLParagraphElement>()

defineExpose({
  preloaderEl,
  preloaderBarEl,
  preloaderTextEl
})
</script>

<style scoped>
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #fafafa;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dark .preloader {
  background: #0f172a;
}

.preloader-content {
  text-align: center;
}

.preloader-logo-img {
  height: 250px;
  width: auto;
  margin: 6rem auto 3rem;
  display: block;
  opacity: 0;
  animation: fadeInLogo 0.8s ease 0.2s forwards;
  filter: drop-shadow(0 10px 30px rgba(13, 124, 108, 0.15));
}

@keyframes fadeInLogo {
  to {
    opacity: 1;
    transform: scale(1);
  }
  from {
    opacity: 0;
    transform: scale(0.95);
  }
}

.preloader-bar-wrapper {
  width: 300px;
  height: 4px;
  background: rgba(13, 124, 108, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin: 0 auto 1.5rem;
}

.preloader-bar {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #0D7C6C 0%, #3DBAA2 100%);
  border-radius: 2px;
  transition: width 0.1s ease;
}

.preloader-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  opacity: 0.6;
}

.dark .preloader-text {
  color: #f1f5f9;
}
</style>
