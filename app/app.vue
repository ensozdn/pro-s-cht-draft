<template>
  <div>
    <!-- Fixed Three.js canvas -->
    <div class="scene-container">
      <canvas ref="canvasRef" />
    </div>
    
    <!-- Scroll area -->
    <div class="scroll-area h-[300vh]"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// GSAP ScrollTrigger'ı kaydet
gsap.registerPlugin(ScrollTrigger)

const canvasRef = ref<HTMLCanvasElement | null>(null)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let cube: THREE.Mesh
let animationId: number

// Resize handler
const handleResize = () => {
  if (!camera || !renderer) return
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onMounted(() => {
  if (!canvasRef.value) return

  // Sahne oluştur
  scene = new THREE.Scene()

  // Kamera oluştur
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 5

  // Renderer oluştur
  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
    alpha: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  // Basit küp oluştur
  const geometry = new THREE.BoxGeometry(2, 2, 2)
  const material = new THREE.MeshBasicMaterial({ 
    color: 0x0066ff,
    wireframe: true 
  })
  cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  // Render loop (sadece render - otomatik rotasyon yok)
  const animate = () => {
    animationId = requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
  animate()

  // GSAP ScrollTrigger - scroll ile küpü döndür
  gsap.to(cube.rotation, {
    x: Math.PI * 2,
    y: Math.PI * 2,
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true
    }
  })
  
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.scene-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #000;
  z-index: 0;
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.scroll-area {
  position: relative;
  z-index: 1;
  pointer-events: none;
}
</style>
