<template>
  <div ref="preloaderEl" class="preloader">
    <div class="preloader-content">
      <!-- Logo with wipe reveal and light beam -->
      <div class="logo-container">
        <img src="/images/logo.png" alt="ProSicht Logo" class="preloader-logo-img" />
        <!-- Light beam that scans across the logo -->
        <div class="light-beam"></div>
      </div>
      
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

/* ═══════════════════════════════════════════
   LOGO CONTAINER WITH ANIMATIONS
   ═══════════════════════════════════════════ */

.logo-container {
  position: relative;
  display: inline-block;
  margin: 6rem auto 3rem;
}

.preloader-logo-img {
  height: 250px;
  width: auto;
  display: block;
  opacity: 0;
  filter: drop-shadow(0 10px 30px rgba(13, 124, 108, 0.15));
  
  /* Stage 1: Wipe reveal from left to right */
  clip-path: inset(0 100% 0 0);
  animation: 
    wipeReveal 1s ease-out 0.2s forwards,
    logoFadeIn 0.3s ease 0.2s forwards;
}

.dark .preloader-logo-img {
  filter: drop-shadow(0 10px 30px rgba(61, 186, 162, 0.25));
}

/* Stage 1: Wipe from left to right */
@keyframes wipeReveal {
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

@keyframes logoFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Stage 2: Light beam scanning across logo */
.light-beam {
  position: absolute;
  top: 0;
  left: -20%;
  width: 40%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(61, 186, 162, 0.3) 30%,
    rgba(61, 186, 162, 0.6) 50%,
    rgba(61, 186, 162, 0.3) 70%,
    transparent 100%
  );
  opacity: 0;
  pointer-events: none;
  mix-blend-mode: screen;
  filter: blur(8px);
  
  /* Start scanning after wipe completes */
  animation: 
    beamFadeIn 0.3s ease 1.2s forwards,
    beamScan 1.5s ease-in-out 1.2s forwards;
}

.dark .light-beam {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.15) 30%,
    rgba(255, 255, 255, 0.45) 50%,
    rgba(255, 255, 255, 0.15) 70%,
    transparent 100%
  );
  mix-blend-mode: overlay;
  filter: blur(6px);
  box-shadow: none;
}

@keyframes beamFadeIn {
  to {
    opacity: 1;
  }
}

@keyframes beamScan {
  0% {
    left: -20%;
  }
  100% {
    left: 100%;
    opacity: 0;
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
