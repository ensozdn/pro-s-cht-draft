let _preloaderShown = false

export function useScrollAnimations() {
  const setupAnimations = async (opts: {
    gsap: any
    ScrollTrigger: any
    conveyorGroup: any
    section1: HTMLElement | null
    section2: HTMLElement | null
    section3: HTMLElement | null
    statsSection: HTMLElement | null
    ipadVideo: HTMLVideoElement | null
    horizontalSection: HTMLElement | null
    horizontalTrack: HTMLElement | null
    contactSection: HTMLElement | null
    categoryCount: number
    preloaderComponent: any
    beltMaterial: any
    rollerMaterial: any
  }) => {
    const {
      gsap, ScrollTrigger, conveyorGroup,
      section1, section2, section3, statsSection,
      ipadVideo, horizontalSection, horizontalTrack,
      contactSection, categoryCount, preloaderComponent,
      beltMaterial, rollerMaterial
    } = opts

    const isMobile = window.innerWidth < 768
    const isFirstVisit = !_preloaderShown
    if (isFirstVisit) _preloaderShown = true

    // ── Preloader ────────────────────────────────────────────────
    if (!isFirstVisit) {
      if (preloaderComponent?.preloaderEl) preloaderComponent.preloaderEl.style.display = 'none'
    } else {
    const loadingProgress = { value: 0 }
    gsap.to(loadingProgress, {
      value: 100, duration: 2, ease: 'power2.inOut',
      onUpdate: () => {
        const p = Math.round(loadingProgress.value)
        if (preloaderComponent?.preloaderBarEl) preloaderComponent.preloaderBarEl.style.width = `${p}%`
        if (preloaderComponent?.preloaderTextEl) preloaderComponent.preloaderTextEl.textContent = `${p}%`
      },
      onComplete: () => {
        if (!preloaderComponent?.preloaderEl) return
        gsap.to(preloaderComponent.preloaderEl, {
          y: '-100%', duration: 0.8, ease: 'power3.inOut',
          onComplete: () => {
            if (preloaderComponent?.preloaderEl) preloaderComponent.preloaderEl.style.display = 'none'
            if (section1) {
              const heroEls = section1.querySelectorAll('.content-title, .content-description, .cta-button')
              gsap.fromTo(heroEls, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' })
            }
            gsap.to([beltMaterial, rollerMaterial], { opacity: 1, duration: 1.2, ease: 'power2.out' })
          }
        })
      }
    })
    }

    // ── 3D Model position/scale ───────────────────────────────────
    conveyorGroup.scale.set(1.8, 1.8, 1.8)
    gsap.set(conveyorGroup.position, { x: isMobile ? 0 : 4.5, y: isMobile ? 1 : 0, z: isMobile ? -2 : 0 })

    // Camera timeline (scroll-driven rotation)
    gsap.timeline({
      scrollTrigger: { trigger: '.main-content', start: 'top top', end: 'bottom bottom', scrub: 1 }
    })
      .to(conveyorGroup.rotation, { y: Math.PI, duration: 0.5 }, 0)
      .to(conveyorGroup.rotation, { y: 0, duration: 0.5 }, 1)

    // ── Hero sections ─────────────────────────────────────────────
    if (section1 && section2) {
      gsap.set(section1, { opacity: 1, x: isMobile ? 0 : -280, rotateY: isMobile ? 0 : 2, transformPerspective: 1200, transformStyle: 'preserve-3d' })
      gsap.set(section2, { opacity: 0, x: isMobile ? 0 : 280, rotateY: isMobile ? 0 : 2 })

      const tl1 = gsap.timeline({ scrollTrigger: { trigger: section1, start: 'top top', end: '+=70%', scrub: 1.2 } })
      tl1.to(conveyorGroup.position, { x: isMobile ? 0 : -4, y: isMobile ? 1 : 0, z: isMobile ? -2 : 0, ease: 'power2.inOut' }, 0)
      tl1.to(section1, { opacity: 0, x: isMobile ? 0 : -120, y: isMobile ? -50 : 0, rotateY: isMobile ? 0 : 4, ease: 'power2.inOut' }, 0)
      tl1.to(section2, { opacity: 1, x: isMobile ? 0 : 280, y: 0, rotateY: isMobile ? 0 : -3, ease: 'power2.inOut' }, 0)
    }

    if (section2 && section3) {
      gsap.set(section3, { opacity: 0, x: isMobile ? 0 : -280, rotateY: isMobile ? 0 : 2 })

      const tl2 = gsap.timeline({ scrollTrigger: { trigger: section2, start: 'top top', end: '+=70%', scrub: 1.2 } })
      tl2.to(conveyorGroup.position, { x: isMobile ? 0 : 4, y: isMobile ? 1 : 0, z: isMobile ? -2 : 0, ease: 'power2.inOut' }, 0)
      tl2.to(section2, { opacity: 0, x: isMobile ? 0 : 320, y: isMobile ? -50 : 0, rotateY: isMobile ? 0 : 4, ease: 'power2.inOut' }, 0)
      tl2.to(section3, { opacity: 1, x: isMobile ? 0 : -280, y: 0, rotateY: isMobile ? 0 : 2, ease: 'power2.inOut' }, 0)
    }

    // ── Stats ─────────────────────────────────────────────────────
    if (statsSection) {
      gsap.timeline({ scrollTrigger: { trigger: statsSection, start: 'top center', end: 'center center', scrub: true } })
        .to(conveyorGroup.position, { x: 0, y: isMobile ? 1 : 0, z: isMobile ? -2 : 0 }, 0)

      const statNumbers = statsSection.querySelectorAll('.stat-number')
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target') || '0')
        const counter = { value: 0 }
        gsap.to(counter, {
          value: target, duration: 2, ease: 'power2.out',
          scrollTrigger: { trigger: statsSection, start: 'top center', once: true },
          onUpdate: () => { stat.textContent = Math.round(counter.value).toString() }
        })
      })
    }

    // ── iPad video ────────────────────────────────────────────────
    if (ipadVideo) {
      const setup = () => {
        if (!ipadVideo.duration || isNaN(ipadVideo.duration)) return
        gsap.timeline({
          scrollTrigger: {
            trigger: '.video-scroll-section', start: 'top top', end: 'bottom bottom', scrub: 1,
            pin: '.ipad-container',
            onUpdate: (self: any) => { ipadVideo.currentTime = ipadVideo.duration * self.progress }
          }
        })
      }
      if (ipadVideo.readyState >= 1) setup()
      else ipadVideo.addEventListener('loadedmetadata', setup)
    }

    // ── Horizontal scroll ─────────────────────────────────────────
    if (horizontalSection && horizontalTrack) {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        const track = horizontalTrack
        const cards = track.querySelectorAll('.horizontal-card')
        gsap.fromTo(cards, { opacity: 0, scale: 0.9, y: 30 }, {
          opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: horizontalSection, start: 'top 80%', once: true }
        })
        const getScrollDistance = () => -(track.scrollWidth - window.innerWidth)
        gsap.to(track, {
          x: getScrollDistance, ease: 'none',
          scrollTrigger: {
            trigger: horizontalSection, start: 'top top',
            end: () => `+=${track.scrollWidth * 1.5}`,
            scrub: 1.2, pin: true, anticipatePin: 1, invalidateOnRefresh: true,
            snap: { snapTo: 1 / (categoryCount - 1), duration: { min: 0.3, max: 0.6 }, delay: 0.05, ease: 'power2.inOut' }
          }
        })
      })
    }

    // ── Contact ───────────────────────────────────────────────────
    if (contactSection) {
      const el = contactSection.querySelector('.contact-content')
      if (el) {
        gsap.fromTo(el, { opacity: 0, y: 80 }, {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: contactSection, start: 'top 70%', once: true }
        })
      }
    }

    // ── Scroll reveal animations ──────────────────────────────────
    const featureCards = document.querySelectorAll('.feature-card')
    if (featureCards.length) {
      gsap.fromTo(featureCards, { opacity: 0, y: 60, scale: 0.9 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.why-us-grid', start: 'top 75%', toggleActions: 'play none none none' }
      })
    }

    const contributionCards = document.querySelectorAll('.contribution-card')
    if (contributionCards.length) {
      gsap.fromTo(contributionCards, { opacity: 0, y: 50, scale: 0.95 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.contributions-grid', start: 'top 70%', toggleActions: 'play none none none' }
      })
    }

    gsap.set(document.querySelectorAll('.partner-card'), { opacity: 1, y: 0, scale: 1 })

    const blogCards = document.querySelectorAll('.blog-card')
    if (blogCards.length) {
      gsap.fromTo(blogCards, { opacity: 0, y: 50, clipPath: 'inset(10% 10% 10% 10% round 1rem)' }, {
        opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 1rem)', duration: 1, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.blog-grid', start: 'top 70%', once: true }
      })
    }

    document.querySelectorAll('.why-us-title, .contributions-title, .partners-title, .blog-title').forEach(title => {
      gsap.fromTo(title, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: title, start: 'top 85%', once: true }
      })
    })

    const statItems = document.querySelectorAll('.stat-item')
    if (statItems.length) {
      gsap.fromTo(statItems, { opacity: 0, y: 30, scale: 0.8 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '.stats-grid', start: 'top 75%', once: true }
      })
    }
  }

  return { setupAnimations }
}
