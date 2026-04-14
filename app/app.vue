<template>
  <div class="bg-slate-50">
    <!-- Premium Preloader -->
    <div ref="preloader" class="preloader">
      <div class="preloader-content">
        <h1 class="preloader-logo">ProSicht</h1>
        <div class="preloader-bar-wrapper">
          <div ref="preloaderBar" class="preloader-bar"></div>
        </div>
        <p ref="preloaderText" class="preloader-text">0%</p>
      </div>
    </div>

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

      <!-- İstatistikler Bölümü -->
      <section ref="statsSection" class="content-section">
        <div class="glass-card stats-card">
          <h2 class="stats-title">Sayılarla <span class="text-gradient">ProSicht</span></h2>
          
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-value">
                <span class="stat-number" data-target="99">0</span>
                <span class="stat-symbol">%</span>
              </div>
              <div class="stat-label">Doğruluk Oranı</div>
            </div>

            <div class="stat-item">
              <div class="stat-value">
                <span class="stat-number" data-target="15">0</span>
                <span class="stat-symbol">ms</span>
              </div>
              <div class="stat-label">Yanıt Süresi</div>
            </div>

            <div class="stat-item">
              <div class="stat-value">
                <span class="stat-number" data-target="1000">0</span>
                <span class="stat-symbol">+</span>
              </div>
              <div class="stat-label">Dakikada Parça</div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Yatay Kaydırma - Sektörler -->
    <section ref="sectorsSection" class="sectors-wrapper">
      <div class="sectors-title-container">
        <h2 class="sectors-main-title">Uygulama <span class="text-gradient">Alanlarımız</span></h2>
      </div>
      
      <div ref="sectorsContainer" class="sectors-container">
        <div class="sector-card">
          <div class="sector-icon">🏭</div>
          <h3 class="sector-title">Metal ve Çelik</h3>
          <p class="sector-description">
            Yüksek hassasiyetli yüzey kontrolü ve kaynak kalitesi tespiti
          </p>
        </div>

        <div class="sector-card">
          <div class="sector-icon">👔</div>
          <h3 class="sector-title">Tekstil ve Deri</h3>
          <p class="sector-description">
            Kumaş hataları, renk uyumsuzlukları ve dikiş kalitesi analizi
          </p>
        </div>

        <div class="sector-card">
          <div class="sector-icon">🚗</div>
          <h3 class="sector-title">Otomotiv</h3>
          <p class="sector-description">
            Parça uyumu, montaj doğruluğu ve boyama kalitesi kontrolü
          </p>
        </div>
      </div>
    </section>

    <!-- İletişim Bölümü -->
    <section ref="contactSection" class="contact-section">
      <div class="contact-container">
        <div class="contact-content">
          <div class="contact-info">
            <h2 class="contact-title">
              Üretiminizi <span class="text-gradient">Yapay Zeka</span> İle Dönüştürün
            </h2>
            <p class="contact-description">
              ProSicht ile kalite kontrolünüzü yeni nesil teknolojiye taşıyın. 
              Ücretsiz demo için hemen iletişime geçin.
            </p>
            <div class="contact-details">
              <div class="contact-item">
                <span class="contact-icon">📧</span>
                <span>info@prosicht.com</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">📞</span>
                <span>+90 (212) 555 00 00</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">📍</span>
                <span>İstanbul, Türkiye</span>
              </div>
            </div>
          </div>

          <div class="contact-form-wrapper">
            <form class="contact-form">
              <div class="form-group">
                <input 
                  type="text" 
                  placeholder="Adınız Soyadınız" 
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <input 
                  type="email" 
                  placeholder="E-posta Adresiniz" 
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <input 
                  type="tel" 
                  placeholder="Telefon Numaranız" 
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <textarea 
                  placeholder="Mesajınız" 
                  rows="4" 
                  class="form-input"
                ></textarea>
              </div>
              <button type="submit" class="form-button">
                Demo Talebinde Bulun
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-left">
          <span class="footer-logo">ProSicht</span>
          <span class="footer-copyright">© 2026 Tüm hakları saklıdır.</span>
        </div>
        <div class="footer-links">
          <a href="#privacy" class="footer-link">Gizlilik Politikası</a>
          <a href="#terms" class="footer-link">Kullanım Şartları</a>
        </div>
        <div class="footer-social">
          <a href="#" class="social-link">🔗</a>
          <a href="#" class="social-link">📘</a>
          <a href="#" class="social-link">🐦</a>
        </div>
      </div>
    </footer>

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
const statsSection = ref<HTMLElement | null>(null)
const sectorsSection = ref<HTMLElement | null>(null)
const sectorsContainer = ref<HTMLDivElement | null>(null)
const contactSection = ref<HTMLElement | null>(null)
const preloader = ref<HTMLDivElement | null>(null)
const preloaderBar = ref<HTMLDivElement | null>(null)
const preloaderText = ref<HTMLParagraphElement | null>(null)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let conveyorGroup: THREE.Group
let animationId: number
let lenis: any
let beltMaterial: THREE.MeshStandardMaterial
let rollerMaterial: THREE.MeshStandardMaterial

// Mouse parallax değişkenleri
const mouse = { x: 0, y: 0 }
const targetRotation = { x: 0, y: 0 }
const currentRotation = { x: 0, y: 0 }

// Resize handler
const handleResize = () => {
  if (!camera || !renderer) return
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

// Mouse move handler - Parallax efekti
const handleMouseMove = (event: MouseEvent) => {
  // Fare koordinatlarını normalize et (-1 ile 1 arası)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  
  // Hedef rotasyonu hafif bir şekilde ayarla
  targetRotation.x = mouse.y * 0.15
  targetRotation.y = mouse.x * 0.15
}

onMounted(async () => {
  if (!canvasRef.value) return

  // GSAP'i client-side import et
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  // Preloader Animasyonu
  const loadingProgress = { value: 0 }
  
  gsap.to(loadingProgress, {
    value: 100,
    duration: 2,
    ease: 'power2.inOut',
    onUpdate: () => {
      const progress = Math.round(loadingProgress.value)
      if (preloaderBar.value) {
        preloaderBar.value.style.width = `${progress}%`
      }
      if (preloaderText.value) {
        preloaderText.value.textContent = `${progress}%`
      }
    },
    onComplete: () => {
      // Preloader'ı kaldır
      gsap.to(preloader.value, {
        y: '-100%',
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          if (preloader.value) {
            preloader.value.style.display = 'none'
          }
          
          // Hero giriş animasyonları
          if (section1.value) {
            const heroElements = section1.value.querySelectorAll('.content-title, .content-description, .cta-button')
            gsap.fromTo(
              heroElements,
              { opacity: 0, y: 30 },
              { 
                opacity: 1, 
                y: 0, 
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out'
              }
            )
          }
          
          // 3D model fade-in
          gsap.to([beltMaterial, rollerMaterial], {
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out'
          })
        }
      })
    }
  })

  // Lenis Smooth Scroll başlat
  const Lenis = (await import('lenis')).default
  lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false
  })

  // Lenis ve GSAP ScrollTrigger senkronizasyonu
  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

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
  beltMaterial = new THREE.MeshStandardMaterial({
    color: 0x2a2a2a,
    metalness: 0.7,
    roughness: 0.3,
    transparent: true,
    opacity: 0
  })

  rollerMaterial = new THREE.MeshStandardMaterial({
    color: 0x555555,
    metalness: 0.7,
    roughness: 0.3,
    transparent: true,
    opacity: 0
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
    
    // Lerp (Linear Interpolation) - Yumuşak geçiş
    const lerpFactor = 0.05
    currentRotation.x += (targetRotation.x - currentRotation.x) * lerpFactor
    currentRotation.y += (targetRotation.y - currentRotation.y) * lerpFactor
    
    // Scroll progress'e göre base rotasyonu ayarla
    const baseRotationX = scrollProgress.value * Math.PI * 2
    
    // Base rotasyon + Mouse parallax
    conveyorGroup.rotation.x = baseRotationX + currentRotation.x
    conveyorGroup.rotation.y = currentRotation.y
    
    renderer.render(scene, camera)
  }
  animate()

  // Mouse parallax event listener ekle
  window.addEventListener('mousemove', handleMouseMove)

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

  // İstatistik Counter Animasyonları
  if (statsSection.value) {
    const statNumbers = statsSection.value.querySelectorAll('.stat-number')
    
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute('data-target') || '0')
      const counter = { value: 0 }
      
      gsap.to(counter, {
        value: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: statsSection.value,
          start: 'top center',
          once: true
        },
        onUpdate: () => {
          stat.textContent = Math.round(counter.value).toString()
        }
      })
    })
  }

  // Yatay Kaydırma Animasyonu
  if (sectorsSection.value && sectorsContainer.value) {
    const containerWidth = sectorsContainer.value.scrollWidth
    const viewportWidth = window.innerWidth
    const scrollDistance = containerWidth - viewportWidth

    gsap.to(sectorsContainer.value, {
      x: -scrollDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: sectorsSection.value,
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    })
  }

  // İletişim Bölümü Fade-Up Animasyonu
  if (contactSection.value) {
    gsap.fromTo(
      contactSection.value.querySelector('.contact-content'),
      {
        opacity: 0,
        y: 80
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contactSection.value,
          start: 'top 70%',
          once: true
        }
      }
    )
  }
  
  window.addEventListener('resize', handleResize)
})

onUnmounted(async () => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  
  // Lenis'i durdur
  if (lenis) {
    lenis.destroy()
  }
  
  // ScrollTrigger'ı temizle
  try {
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  } catch (e) {
    // ignore
  }
  
  // Event listener'ları temizle
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style scoped>
/* Preloader */
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

.preloader-content {
  text-align: center;
}

.preloader-logo {
  font-size: 4rem;
  font-weight: 700;
  background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  margin-bottom: 3rem;
}

.preloader-bar-wrapper {
  width: 300px;
  height: 4px;
  background: rgba(6, 182, 212, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin: 0 auto 1.5rem;
}

.preloader-bar {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #06b6d4 0%, #3b82f6 100%);
  border-radius: 2px;
  transition: width 0.1s ease;
}

.preloader-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  opacity: 0.6;
}

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

/* İstatistikler */
.stats-card {
  max-width: 1100px;
  padding: 4rem 3rem;
}

.stats-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  text-align: center;
  margin-bottom: 3rem;
  letter-spacing: -0.02em;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 4rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-number {
  display: inline-block;
  min-width: 2ch;
  text-align: center;
}

.stat-symbol {
  font-size: 2.5rem;
  margin-left: 0.25rem;
  opacity: 0.8;
}

.stat-label {
  font-size: 1.125rem;
  font-weight: 500;
  color: rgba(30, 41, 59, 0.7);
  letter-spacing: 0.01em;
}

/* Yatay Kaydırma - Sektörler */
.sectors-wrapper {
  position: relative;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

.sectors-title-container {
  position: absolute;
  top: 6rem;
  left: 0;
  right: 0;
  z-index: 10;
  text-align: center;
}

.sectors-main-title {
  font-size: 3rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.02em;
}

.sectors-container {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  display: flex;
  gap: 4rem;
  padding: 0 4rem;
  will-change: transform;
}

.sector-card {
  min-width: 400px;
  backdrop-filter: blur(16px) saturate(180%);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border-radius: 2rem;
  padding: 3rem 2.5rem;
  text-align: center;
}

.sector-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.sector-title {
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
}

.sector-description {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

/* İletişim Bölümü */
.contact-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
  padding: 6rem 2rem;
}

.contact-container {
  max-width: 1200px;
  width: 100%;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.contact-info {
  padding: 2rem 0;
}

.contact-title {
  font-size: 3rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
}

.contact-description {
  font-size: 1.25rem;
  color: rgba(30, 41, 59, 0.7);
  line-height: 1.6;
  margin-bottom: 3rem;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.125rem;
  color: #1e293b;
}

.contact-icon {
  font-size: 1.5rem;
}

.contact-form-wrapper {
  backdrop-filter: blur(16px) saturate(180%);
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 2rem;
  padding: 3rem 2.5rem;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-input {
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.75rem;
  outline: none;
  transition: all 0.3s ease;
  font-family: 'Space Grotesk', sans-serif;
  color: #1e293b;
}

.form-input::placeholder {
  color: rgba(30, 41, 59, 0.5);
}

.form-input:focus {
  background: rgba(255, 255, 255, 0.7);
  border-color: #06b6d4;
  box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
  transform: translateY(-1px);
}

.form-button {
  width: 100%;
  padding: 1.125rem 2.5rem;
  background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
  color: white;
  font-weight: 600;
  font-size: 1.125rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px -5px rgba(6, 182, 212, 0.3);
  letter-spacing: 0.01em;
}

.form-button:hover {
  transform: scale(1.02) translateY(-2px);
  box-shadow: 0 20px 35px -5px rgba(6, 182, 212, 0.5);
}

/* Footer */
.footer {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  padding: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.footer-logo {
  font-size: 1.25rem;
  font-weight: 700;
  background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-copyright {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
}

.footer-links {
  display: flex;
  gap: 2rem;
}

.footer-link {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #06b6d4;
}

.footer-social {
  display: flex;
  gap: 1rem;
}

.social-link {
  font-size: 1.5rem;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.social-link:hover {
  transform: translateY(-3px);
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

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .stats-title {
    font-size: 1.75rem;
  }

  .stat-value {
    font-size: 3rem;
  }

  .stat-symbol {
    font-size: 2rem;
  }

  .stats-card {
    padding: 2.5rem 2rem;
  }

  .sectors-main-title {
    font-size: 1.75rem;
  }

  .sector-card {
    min-width: 300px;
    padding: 2rem 1.5rem;
  }

  .sector-icon {
    font-size: 3rem;
  }

  .sector-title {
    font-size: 1.5rem;
  }

  .sector-description {
    font-size: 1rem;
  }

  .sectors-container {
    gap: 2rem;
    padding: 0 2rem;
  }

  .contact-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .contact-title {
    font-size: 2rem;
  }

  .contact-description {
    font-size: 1rem;
  }

  .contact-form-wrapper {
    padding: 2rem 1.5rem;
  }

  .footer-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-left {
    flex-direction: column;
    gap: 0.5rem;
  }

  .footer-links {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
