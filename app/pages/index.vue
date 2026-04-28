<template>
  <div :class="isDark ? 'bg-slate-900' : 'bg-slate-50'" class="main-content overflow-x-hidden w-full">
    <Preloader ref="preloaderComponent" />

    <div class="scroll-progress-bar" :style="{ width: scrollProgress + '%' }"></div>

    <AppHeader :is-dark="isDark" @toggle-menu="isMobileMenuOpen = true" />
    <MobileDrawer :is-open="isMobileMenuOpen" @close="isMobileMenuOpen = false" />

    <div class="scene-container">
      <canvas ref="canvasRef" />
    </div>

    <HeroSection ref="heroSectionRef" />
    <VideoScrollSection ref="videoSectionRef" />
    <WhyUsSection :features="whyUsFeatures" />
    <ApplicationsSection ref="appSectionRef" :categories="categories" />
    <ContributionsSection :contributions="contributions" />
    <PartnersSection :partners="partners" />
    <BlogSection />
    <ContactSection ref="contactSectionRef" :contact-info="contactInfo" />
    <ContactFormSection />

    <AppFooter />

    <button v-show="showBackToTop" @click="scrollToTop" class="back-to-top-btn" aria-label="Back to top">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    </button>

    <div ref="scrollAreaRef" class="scroll-area"></div>
  </div>
</template>

<script setup lang="ts">
import type Preloader from '../components/layout/Preloader.vue'
import type HeroSection from '../components/sections/HeroSection.vue'
import type VideoScrollSection from '../components/sections/VideoScrollSection.vue'
import type ApplicationsSection from '../components/sections/ApplicationsSection.vue'
import type ContactSection from '../components/sections/ContactSection.vue'
import { useTheme } from '../composables/useTheme'
import { useThreeScene } from '../composables/useThreeScene'
import { useScrollAnimations } from '../composables/useScrollAnimations'

const { isDark, toggleTheme, initTheme } = useTheme()

definePageMeta({ layout: false })

const { t, locale, setLocale } = useI18n()
provide('toggleTheme', toggleTheme)

const isMobileMenuOpen = ref(false)
const scrollProgress = ref(0)
const showBackToTop = ref(false)

const canvasRef = ref<HTMLCanvasElement | null>(null)
const scrollAreaRef = ref<HTMLDivElement | null>(null)
const preloaderComponent = ref<InstanceType<typeof Preloader>>()
const heroSectionRef = ref<InstanceType<typeof HeroSection>>()
const videoSectionRef = ref<InstanceType<typeof VideoScrollSection>>()
const appSectionRef = ref<InstanceType<typeof ApplicationsSection>>()
const contactSectionRef = ref<InstanceType<typeof ContactSection>>()

const detectUserLocale = async () => {
  if (localStorage.getItem('userLocationLang')) return
  try {
    const response = await fetch('https://api.country.is')
    const data = await response.json()
    const countryMap: Record<string, 'en'|'de'|'tr'|'fr'|'es'|'it'|'pt'|'nl'|'ru'|'ar'> = {
      DE: 'de', AT: 'de', CH: 'de', FR: 'fr', BE: 'fr',
      ES: 'es', AR: 'es', MX: 'es', CO: 'es', CL: 'es',
      IT: 'it', PT: 'pt', BR: 'pt', RU: 'ru', BY: 'ru', KZ: 'ru',
      NL: 'nl', SA: 'ar', AE: 'ar', EG: 'ar', QA: 'ar', KW: 'ar',
      TR: 'tr', AZ: 'tr', GB: 'en', US: 'en', CA: 'en', AU: 'en', NZ: 'en', IE: 'en'
    }
    const detectedLang = countryMap[data.country as string] || 'en'
    localStorage.setItem('userLocationLang', detectedLang)
    setLocale(detectedLang)
  } catch {}
}

const categories = computed(() => [
  { id: 'metal-celik', title: t('categories.metalSteel.title', {}, { locale: locale.value }), description: t('categories.metalSteel.description', {}, { locale: locale.value }), image: '/images/metal-celik.png' },
  { id: 'deri', title: t('categories.leather.title', {}, { locale: locale.value }), description: t('categories.leather.description', {}, { locale: locale.value }), image: '/images/deri.png' },
  { id: 'tekstil', title: t('categories.textile.title', {}, { locale: locale.value }), description: t('categories.textile.description', {}, { locale: locale.value }), image: '/images/tekstil.png' },
  { id: 'mobilya', title: t('categories.furniture.title', {}, { locale: locale.value }), description: t('categories.furniture.description', {}, { locale: locale.value }), image: '/images/mobilya.png' },
  { id: 'mermer', title: t('categories.marble.title', {}, { locale: locale.value }), description: t('categories.marble.description', {}, { locale: locale.value }), image: '/images/mermer.png' },
  { id: 'cam', title: t('categories.glass.title', {}, { locale: locale.value }), description: t('categories.glass.description', {}, { locale: locale.value }), image: '/images/cam.png' },
  { id: 'son-kalite', title: t('categories.finalQuality.title', {}, { locale: locale.value }), description: t('categories.finalQuality.description', {}, { locale: locale.value }), image: '/images/son-kalite.png' }
])

const whyUsFeatures = computed(() => [
  { title: t('whyUs.speed.title', {}, { locale: locale.value }), desc: t('whyUs.speed.description', {}, { locale: locale.value }), icon: 'Rocket' },
  { title: t('whyUs.ai.title', {}, { locale: locale.value }), desc: t('whyUs.ai.description', {}, { locale: locale.value }), icon: 'BrainCircuit' },
  { title: t('whyUs.support.title', {}, { locale: locale.value }), desc: t('whyUs.support.description', {}, { locale: locale.value }), icon: 'Users' },
  { title: t('whyUs.realtime.title', {}, { locale: locale.value }), desc: t('whyUs.realtime.description', {}, { locale: locale.value }), icon: 'Activity' }
])

const contributions = computed(() => [
  { title: t('contributions.quality.title', {}, { locale: locale.value }), desc: t('contributions.quality.description', {}, { locale: locale.value }), icon: 'CheckCircle' },
  { title: t('contributions.reduce.title', {}, { locale: locale.value }), desc: t('contributions.reduce.description', {}, { locale: locale.value }), icon: 'TrendingDown' },
  { title: t('contributions.satisfaction.title', {}, { locale: locale.value }), desc: t('contributions.satisfaction.description', {}, { locale: locale.value }), icon: 'Smile' },
  { title: t('contributions.recall.title', {}, { locale: locale.value }), desc: t('contributions.recall.description', {}, { locale: locale.value }), icon: 'ShieldAlert' },
  { title: t('contributions.efficiency.title', {}, { locale: locale.value }), desc: t('contributions.efficiency.description', {}, { locale: locale.value }), icon: 'Zap' },
  { title: t('contributions.compliance.title', {}, { locale: locale.value }), desc: t('contributions.compliance.description', {}, { locale: locale.value }), icon: 'BarChart' }
])

const contactInfo = computed(() => [
  { icon: 'MapPin', text: t('contact.location.tr1', {}, { locale: locale.value }) },
  { icon: 'MapPin', text: t('contact.location.tr2', {}, { locale: locale.value }) },
  { icon: 'Phone', text: t('contact.phone.tr', {}, { locale: locale.value }) },
  { icon: 'MapPin', text: t('contact.location.germany', {}, { locale: locale.value }) },
  { icon: 'Phone', text: t('contact.phone.germany', {}, { locale: locale.value }) },
  { icon: 'Mail', text: t('contact.email', {}, { locale: locale.value }) }
])

const partners = ref([
  { name: 'KOSGEB', logo: '/images/partners/kosgeb.jpeg' },
  { name: 'TÜBİTAK', logo: '/images/partners/tübitak.jpg' },
  { name: 'BTM', logo: '/images/partners/btm.jpg' },
  { name: 'Sakarya Uygulamalı Bilimler Üniversitesi', logo: '/images/partners/sakarya uygulamalı bilimler üniversitesi .webp' },
  { name: 'TOYOTA', logo: '/images/partners/toyota.png' },
  { name: 'İTÜ Çekirdek', logo: '/images/partners/itüçekirdek.png' },
  { name: 'Ford', logo: '/images/partners/ford.png' },
  { name: 'Sakarya Üniversitesi', logo: '/images/partners/saü.jpg' },
  { name: 'Sakarya Teknokent', logo: '/images/partners/sakarya teknokent.svg' },
  { name: 'NVIDIA Inception Program', logo: '/images/partners/nvıdıa.png' },
  { name: 'Bilişim Vadisi', logo: '/images/partners/bilişim vadisi .jpg' }
])

let lenis: any
let threeScene: ReturnType<typeof useThreeScene>

const updateScrollProgress = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = (scrollTop / docHeight) * 100
  showBackToTop.value = scrollTop > 500
}

const scrollToTop = () => {
  if (lenis) lenis.scrollTo(0, { duration: 1.5, easing: (t: number) => 1 - Math.pow(1 - t, 3) })
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(async () => {
  initTheme()
  detectUserLocale()

  window.addEventListener('scroll', updateScrollProgress)
  window.addEventListener('resize', updateScrollProgress)
  updateScrollProgress()

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  const Lenis = (await import('lenis')).default
  lenis = new Lenis({ duration: 0.8, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => { lenis.raf(time * 1000) })
  gsap.ticker.lagSmoothing(0)

  // ── Preloader: GLB yüklenmesini beklemiyor, hemen başlıyor ──────
  const pc = preloaderComponent.value
  if (pc?.preloaderEl) {
    const prog = { value: 0 }
    gsap.to(prog, {
      value: 100, duration: 2, ease: 'power2.inOut',
      onUpdate: () => {
        const p = Math.round(prog.value)
        if (pc.preloaderBarEl) pc.preloaderBarEl.style.width = `${p}%`
        if (pc.preloaderTextEl) pc.preloaderTextEl.textContent = `${p}%`
      },
      onComplete: () => {
        gsap.to(pc.preloaderEl, {
          y: '-100%', duration: 0.8, ease: 'power3.inOut',
          onComplete: () => { pc.preloaderEl!.style.display = 'none' }
        })
      }
    })
  }

  threeScene = useThreeScene(canvasRef)
  await threeScene.initScene()
  threeScene.fadeInMeshes(gsap)

  threeScene.stopAnimate()
  gsap.ticker.add(threeScene.getAnimateFrame())

  if (import.meta.dev) {
    const g = threeScene.getConveyorGroup() as any
    ;(window as any).__g = g
    ;(window as any).__setRY = (v: number) => { g.rotation.y = v }
    ;(window as any).__setPX = (v: number) => { g.position.x = v }
    ;(window as any).__setScale = (v: number) => { g.scale.set(v, v, v) }
  }

  const section1 = heroSectionRef.value?.section1El ?? null
  const section2 = heroSectionRef.value?.section2El ?? null
  const section3 = heroSectionRef.value?.section3El ?? null
  const statsSection = heroSectionRef.value?.statsSectionEl ?? null
  const ipadVideo = videoSectionRef.value?.ipadVideoEl ?? null
  const ipadContainer = videoSectionRef.value?.ipadContainerEl ?? null
  const horizontalSection = appSectionRef.value?.horizontalSectionEl ?? null
  const horizontalTrack = appSectionRef.value?.horizontalTrackEl ?? null
  const contactSection = contactSectionRef.value?.contactSectionEl ?? null

  const { setupAnimations } = useScrollAnimations()
  await setupAnimations({
    gsap,
    ScrollTrigger,
    conveyorGroup: threeScene.getConveyorGroup(),
    canvas: canvasRef.value,
    section1, section2, section3, statsSection,
    ipadVideo, ipadContainer, horizontalSection, horizontalTrack, contactSection,
    categoryCount: categories.value.length,
    beltMaterial: threeScene.getBeltMaterial(),
    rollerMaterial: threeScene.getRollerMaterial()
  })
})

onUnmounted(async () => {
  window.removeEventListener('scroll', updateScrollProgress)
  window.removeEventListener('resize', updateScrollProgress)
  if (lenis) lenis.destroy()
  gsap.ticker.remove(threeScene.getAnimateFrame())
  threeScene.destroy()
  try {
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill())
  } catch {}
})

watch(locale, async () => {
  try {
    await nextTick()
    const cards = document.querySelectorAll('.feature-card, .contribution-card, .partner-card, .blog-card')
    cards.forEach(card => {
      ;(card as HTMLElement).style.opacity = '1'
      ;(card as HTMLElement).style.transform = 'translateY(0) scale(1)'
    })
  } catch {}
})
</script>
