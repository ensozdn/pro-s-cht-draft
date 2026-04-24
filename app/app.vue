<template>
  <div>
    <canvas ref="cursorCanvas" class="cursor-trail-canvas"></canvas>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCursorTrail } from './composables/useCursorTrail'
import './assets/styles/main.css'

const cursorCanvas = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  const { init } = useCursorTrail(cursorCanvas)
  init()
})
</script>
