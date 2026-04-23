interface Particle {
  x: number; y: number; vx: number; vy: number; life: number; maxLife: number
}

export function useCursorTrail(cursorCanvas: Ref<HTMLCanvasElement | null>) {
  let cursorCtx: CanvasRenderingContext2D | null = null
  let cursorParticles: Particle[] = []
  let cursorAnimationId: number

  const init = () => {
    if (typeof window === 'undefined') return
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    if (isMobile || !cursorCanvas.value) return

    const canvas = cursorCanvas.value
    cursorCtx = canvas.getContext('2d')
    if (!cursorCtx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const handleMove = (e: MouseEvent) => {
      for (let i = 0; i < 2; i++) {
        cursorParticles.push({ x: e.clientX, y: e.clientY, vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2, life: 1, maxLife: 60 })
      }
    }

    const animateTrail = () => {
      if (!cursorCtx || !cursorCanvas.value) return
      cursorCtx.clearRect(0, 0, cursorCanvas.value.width, cursorCanvas.value.height)
      for (let i = cursorParticles.length - 1; i >= 0; i--) {
        const p = cursorParticles[i]
        if (!p) continue
        p.x += p.vx; p.y += p.vy; p.life++
        if (p.life >= p.maxLife) { cursorParticles.splice(i, 1); continue }
        const progress = p.life / p.maxLife
        const opacity = (1 - progress) * 0.6
        const size = 8 * (1 - progress)
        const gradient = cursorCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size)
        gradient.addColorStop(0, `rgba(61, 186, 162, ${opacity})`)
        gradient.addColorStop(1, `rgba(13, 124, 108, 0)`)
        cursorCtx.fillStyle = gradient
        cursorCtx.beginPath()
        cursorCtx.arc(p.x, p.y, size, 0, Math.PI * 2)
        cursorCtx.fill()
      }
      cursorAnimationId = requestAnimationFrame(animateTrail)
    }

    window.addEventListener('mousemove', handleMove)
    animateTrail()

    const handleResize = () => {
      if (cursorCanvas.value) { cursorCanvas.value.width = window.innerWidth; cursorCanvas.value.height = window.innerHeight }
    }
    window.addEventListener('resize', handleResize)
  }

  const destroy = () => { if (cursorAnimationId) cancelAnimationFrame(cursorAnimationId) }

  return { init, destroy }
}
