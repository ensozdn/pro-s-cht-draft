<template>
  <div>
    <!-- Fixed Three.js canvas -->
    <div class="scene-container">
      <canvas ref="canvasRef" />
    </div>
    
    <!-- Scroll area -->
    <div ref="scrollAreaRef" class="scroll-area h-[300vh]"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const scrollAreaRef = ref<HTMLDivElement | null>(null)

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

onMounted(async () => {
  if (!canvasRef.value) return

  // GSAP'i client-side import et
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

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

  // Scroll progress objesi
  const scrollProgress = { value: 0 }

  // GSAP ScrollTrigger - scroll progress'i takip et
  gsap.to(scrollProgress, {
    value: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: scrollAreaRef.value,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1
    }
  })

  // Render loop - scroll progress'e göre küpü döndür
  const animate = () => {
    animationId = requestAnimationFrame(animate)
    
    // Scroll progress'e göre rotasyonu ayarla
    cube.rotation.x = scrollProgress.value * Math.PI * 2
    cube.rotation.y = scrollProgress.value * Math.PI * 2
    
    renderer.render(scene, camera)
  }
  animate()
  
  window.addEventListener('resize', handleResize)
})

onUnmounted(async () => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  
  // ScrollTrigger'ı temizle
  try {
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  } catch (e) {
    // ignore
  }
  
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
  height: 300vh; /* Tailwind yerine CSS */
}
</style>
