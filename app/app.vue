<template>
  <div class="bg-slate-50">
    <!-- Premium Header -->
    <header class="header-bar">
      <div class="header-content">
        <div class="logo">ProSicht</div>
        <nav class="nav-menu">
          <a href="#products" class="nav-link">Ürünler</a>
          <a href="#technology" class="nav-link">Teknoloji</a>
          <a href="#contact" class="nav-link">İletişim</a>
        </nav>
      </div>
    </header>

    <!-- Fixed Three.js canvas -->
    <div class="scene-container">
      <canvas ref="canvasRef" />
    </div>
    
    <!-- HTML Overlay - Metin Katmanı -->
    <div class="content-wrapper">
      <section ref="section1" class="content-section">
        <div class="glass-card">
          <h1 class="content-title">
            <span class="text-gradient">Üretimde</span> Mükemmeli Yakalayın
          </h1>
          <p class="content-description">
            Yapay zeka destekli kalite kontrol sistemiyle üretim hatalarını anlık tespit edin
          </p>
          <button class="cta-button">
            Daha Fazla Keşfet
          </button>
        </div>
      </section>
      
      <section ref="section2" class="content-section">
        <div class="glass-card">
          <h1 class="content-title">
            <span class="text-gradient">Otonom</span> Karar Sistemi
          </h1>
          <p class="content-description">
            Gerçek zamanlı analiz ve otomatik kalite değerlendirmesi
          </p>
          <button class="cta-button cta-button-secondary">
            Sistemi İncele
          </button>
        </div>
      </section>
      
      <section ref="section3" class="content-section">
        <div class="glass-card">
          <h1 class="content-title">
            Maliyetleri <span class="text-gradient">Minimuma</span> İndirin
          </h1>
          <p class="content-description">
            %40'a varan maliyet tasarrufu ve sıfır kusurlu üretim
          </p>
          <button class="cta-button">
            Hemen Başlayın
          </button>
        </div>
      </section>
    </div>
    
    <!-- Scroll area -->
    <div ref="scrollAreaRef" class="scroll-area"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const scrollAreaRef = ref<HTMLDivElement | null>(null)
const section1 = ref<HTMLElement | null>(null)
const section2 = ref<HTMLElement | null>(null)
const section3 = ref<HTMLElement | null>(null)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let conveyorGroup: THREE.Group
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
  camera.position.set(0, 2, 5)
  camera.lookAt(0, 0, 0)

  // Renderer oluştur
  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
    alpha: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  // Premium Işıklandırma
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
  scene.add(ambientLight)

  // Ana ışık (yukarıdan önden)
  const mainLight = new THREE.DirectionalLight(0xffffff, 1.2)
  mainLight.position.set(5, 8, 5)
  scene.add(mainLight)

  // Dolgu ışığı (arka soldan)
  const fillLight = new THREE.DirectionalLight(0x88ccff, 0.5)
  fillLight.position.set(-5, 3, -5)
  scene.add(fillLight)

  // Konveyör Bandı Grubu Oluştur
  conveyorGroup = new THREE.Group()

  // Premium Materyal Ayarları
  const beltMaterial = new THREE.MeshStandardMaterial({
    color: 0x2a2a2a,
    metalness: 0.7,
    roughness: 0.3
  })

  const rollerMaterial = new THREE.MeshStandardMaterial({
    color: 0x555555,
    metalness: 0.7,
    roughness: 0.3
  })

  // Ana konveyör kasası (uzun ince kutu)
  const beltGeometry = new THREE.BoxGeometry(4, 0.3, 1)
  const beltMesh = new THREE.Mesh(beltGeometry, beltMaterial)
  conveyorGroup.add(beltMesh)

  // Rulo silindirler (yan yatmış)
  const rollerGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1.2, 16)
  
  // Sol silindir
  const leftRoller = new THREE.Mesh(rollerGeometry, rollerMaterial)
  leftRoller.rotation.z = Math.PI / 2
  leftRoller.position.set(-1.6, -0.15, 0)
  conveyorGroup.add(leftRoller)

  // Sağ silindir
  const rightRoller = new THREE.Mesh(rollerGeometry, rollerMaterial)
  rightRoller.rotation.z = Math.PI / 2
  rightRoller.position.set(1.6, -0.15, 0)
  conveyorGroup.add(rightRoller)

  // Orta silindir (opsiyonel detay)
  const centerRoller = new THREE.Mesh(rollerGeometry, rollerMaterial)
  centerRoller.rotation.z = Math.PI / 2
  centerRoller.position.set(0, -0.15, 0)
  conveyorGroup.add(centerRoller)

  // Konveyörü sahneye ekle
  scene.add(conveyorGroup)

  // Scroll progress objesi
  const scrollProgress = { value: 0 }

  // GSAP ScrollTrigger - scroll ile konveyörü döndür
  gsap.to(scrollProgress, {
    value: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: '.content-wrapper',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1
    }
  })

  // Render loop - scroll progress'e göre konveyörü döndür
  const animate = () => {
    animationId = requestAnimationFrame(animate)
    
    // Scroll progress'e göre X ekseninde döndür
    conveyorGroup.rotation.x = scrollProgress.value * Math.PI * 2
    
    renderer.render(scene, camera)
  }
  animate()

  // Metin Animasyonları
  const sections = [section1.value, section2.value, section3.value]
  
  sections.forEach((section) => {
    if (!section) return
    
    const title = section.querySelector('.content-title')
    
    gsap.fromTo(
      title,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          toggleActions: 'play reverse play reverse'
        }
      }
    )
  })
  
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
/* Header */
.header-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  backdrop-filter: blur(16px) saturate(180%);
  background: rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.25rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
}

.nav-menu {
  display: flex;
  gap: 2.5rem;
}

.nav-link {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.3s ease;
  letter-spacing: 0.01em;
}

.nav-link:hover {
  color: #06b6d4;
  transform: translateY(-1px);
}

/* Scene */
.scene-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  z-index: 0;
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.content-wrapper {
  position: relative;
  z-index: 10;
  pointer-events: none;
  padding-top: 80px;
}

.content-section {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  padding: 2rem;
}

.glass-card {
  backdrop-filter: blur(16px) saturate(180%);
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border-radius: 2rem;
  padding: 3rem 2.5rem;
  max-width: 900px;
  text-align: center;
}

.content-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: #1e293b;
  text-align: center;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
}

.content-description {
  font-size: 1.125rem;
  color: rgba(30, 41, 59, 0.8);
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.text-gradient {
  background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* CTA Buttons */
.cta-button {
  display: inline-block;
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px -5px rgba(6, 182, 212, 0.3);
  letter-spacing: 0.01em;
}

.cta-button:hover {
  transform: scale(1.05) translateY(-2px);
  box-shadow: 0 20px 35px -5px rgba(6, 182, 212, 0.5);
}

.cta-button-secondary {
  background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
  box-shadow: 0 10px 25px -5px rgba(139, 92, 246, 0.3);
}

.cta-button-secondary:hover {
  box-shadow: 0 20px 35px -5px rgba(139, 92, 246, 0.5);
}

.scroll-area {
  position: relative;
  z-index: 1;
  pointer-events: none;
  height: 0;
}

@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  
  .content-title {
    font-size: 2rem;
  }
  
  .content-description {
    font-size: 1rem;
  }
  
  .glass-card {
    padding: 2rem 1.5rem;
  }
  
  .cta-button {
    padding: 0.875rem 2rem;
    font-size: 0.9rem;
  }
}
</style>
