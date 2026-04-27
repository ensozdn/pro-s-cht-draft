<template>
  <section class="video-scroll-section">
    <div ref="ipadContainerEl" class="ipad-container">
      <div class="ipad-frame">
        <video ref="ipadVideoEl" src="/ipad_scroll.mp4" class="ipad-video" muted playsinline preload="auto"></video>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const ipadVideoEl = ref<HTMLVideoElement | null>(null)
const ipadContainerEl = ref<HTMLDivElement | null>(null)

defineExpose({ ipadVideoEl, ipadContainerEl })
</script>
