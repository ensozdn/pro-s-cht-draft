<template>
  <section class="video-scroll-section">
    <div class="ipad-container">
      <div class="ipad-frame">
        <video ref="ipadVideoEl" src="/ipad_scroll.mp4" class="ipad-video" muted playsinline preload="auto"></video>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const ipadVideoEl = ref<HTMLVideoElement | null>(null)

defineExpose({ ipadVideoEl })
</script>
