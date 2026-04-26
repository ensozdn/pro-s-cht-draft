import * as THREE from 'three'

export function useThreeScene(canvasRef: Ref<HTMLCanvasElement | null>) {
  let scene: THREE.Scene
  let camera: THREE.PerspectiveCamera
  let renderer: THREE.WebGLRenderer
  let conveyorGroup: THREE.Group
  let animationId: number
  let beltMaterial: THREE.MeshStandardMaterial
  let rollerMaterial: THREE.MeshStandardMaterial
  let scanBeam: THREE.Mesh
  let isPageVisible = true

  const mouse = { x: 0, y: 0 }
  const targetRotation = { x: 0, y: 0 }
  const currentRotation = { x: 0, y: 0 }

  let animate: () => void

  const handleResize = () => {
    if (!camera || !renderer) return
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  const handleVisibilityChange = () => {
    isPageVisible = !document.hidden
    if (!isPageVisible && animationId) {
      cancelAnimationFrame(animationId)
    } else if (isPageVisible) {
      animate()
    }
  }

  const handleMouseMove = (event: MouseEvent) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    targetRotation.x = mouse.y * 0.15
    targetRotation.y = mouse.x * 0.15
  }

  const initScene = () => {
    if (!canvasRef.value) return

    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 2, 5)
    camera.lookAt(0, 0, 0)

    renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.4))
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.8)
    mainLight.position.set(6, 10, 8)
    mainLight.castShadow = true
    scene.add(mainLight)
    const fillLight = new THREE.DirectionalLight(0xaaccff, 0.6)
    fillLight.position.set(-6, 4, -6)
    scene.add(fillLight)
    const spotLight1 = new THREE.SpotLight(0xffffff, 2.0)
    spotLight1.position.set(7, 7, 7)
    spotLight1.angle = Math.PI / 3
    scene.add(spotLight1)
    const accentLight = new THREE.SpotLight(0x3DBAA2, 1.2)
    accentLight.position.set(-4, 5, 4)
    accentLight.angle = Math.PI / 4
    scene.add(accentLight)

    // Materials
    const titaniumMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.85, roughness: 0.25, transparent: true, opacity: 0 })
    const matBlackMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.3, roughness: 0.8, transparent: true, opacity: 0 })
    const neonTurquoiseMaterial = new THREE.MeshStandardMaterial({ color: 0x3DBAA2, emissive: 0x3DBAA2, emissiveIntensity: 1.5, metalness: 0.4, roughness: 0.3, transparent: true, opacity: 0 })

    conveyorGroup = new THREE.Group()

    // Main body
    const mainBody = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 1.2, 8), titaniumMaterial)
    mainBody.rotation.z = Math.PI / 2
    conveyorGroup.add(mainBody)

    // Front ring
    const frontRing = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.4, 0.15, 8), matBlackMaterial)
    frontRing.rotation.z = Math.PI / 2
    frontRing.position.set(0.7, 0, 0)
    conveyorGroup.add(frontRing)

    // Back segment
    const backSegment = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.4, 8), titaniumMaterial)
    backSegment.rotation.z = Math.PI / 2
    backSegment.position.set(-0.7, 0, 0)
    conveyorGroup.add(backSegment)

    // Heat sinks (bottom only)
    const heatSinkGeo = new THREE.BoxGeometry(0.12, 0.5, 0.03)
    ;[-0.3, -0.15, 0, 0.15, 0.3].forEach(xPos => {
      const fin = new THREE.Mesh(heatSinkGeo, matBlackMaterial)
      fin.position.set(xPos, -0.43, 0)
      conveyorGroup.add(fin)
    })

    const bottomPanel = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.06, 0.48), matBlackMaterial)
    bottomPanel.position.set(0, -0.46, 0)
    conveyorGroup.add(bottomPanel)

    // Lens housing
    const lensHood1 = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.42, 0.2, 16), titaniumMaterial)
    lensHood1.rotation.z = Math.PI / 2
    lensHood1.position.set(0.9, 0, 0)
    conveyorGroup.add(lensHood1)

    const lensHood2 = new THREE.Mesh(new THREE.CylinderGeometry(0.40, 0.38, 0.15, 16), matBlackMaterial)
    lensHood2.rotation.z = Math.PI / 2
    lensHood2.position.set(1.05, 0, 0)
    conveyorGroup.add(lensHood2)

    const neonRing = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.04, 16, 32), neonTurquoiseMaterial)
    neonRing.rotation.y = Math.PI / 2
    neonRing.position.set(1.13, 0, 0)
    conveyorGroup.add(neonRing)

    const lensGlass = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.05, 32), new THREE.MeshPhysicalMaterial({ color: 0x334455, metalness: 0, roughness: 0.1, transmission: 0.7, thickness: 0.3, transparent: true, opacity: 0 }))
    lensGlass.rotation.z = Math.PI / 2
    lensGlass.position.set(1.15, 0, 0)
    conveyorGroup.add(lensGlass)

    const sensor = new THREE.Mesh(new THREE.CircleGeometry(0.12, 32), matBlackMaterial)
    sensor.rotation.y = Math.PI / 2
    sensor.position.set(1.16, 0, 0)
    conveyorGroup.add(sensor)

    // Mount bracket
    const bracketVertical = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.6, 0.2), matBlackMaterial)
    bracketVertical.position.set(0, -0.6, 0)
    conveyorGroup.add(bracketVertical)

    const bracketHorizontal = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.12, 0.3), titaniumMaterial)
    bracketHorizontal.position.set(0, -0.9, 0)
    conveyorGroup.add(bracketHorizontal)

    const supportWingGeo = new THREE.BoxGeometry(0.15, 0.25, 0.08)
    const leftWing = new THREE.Mesh(supportWingGeo, matBlackMaterial)
    leftWing.rotation.z = Math.PI / 6
    leftWing.position.set(-0.15, -0.7, -0.12)
    conveyorGroup.add(leftWing)
    const rightWing = new THREE.Mesh(supportWingGeo, matBlackMaterial)
    rightWing.rotation.z = -Math.PI / 6
    rightWing.position.set(-0.15, -0.7, 0.12)
    conveyorGroup.add(rightWing)

    // Bolts
    const boltGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.05, 6)
    const boltHeadGeo = new THREE.CylinderGeometry(0.03, 0.02, 0.01, 6)
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      const bolt = new THREE.Mesh(boltGeo, matBlackMaterial)
      bolt.rotation.z = Math.PI / 2
      bolt.position.set(0.88, Math.cos(angle) * 0.42, Math.sin(angle) * 0.42)
      conveyorGroup.add(bolt)
      const boltHead = new THREE.Mesh(boltHeadGeo, matBlackMaterial)
      boltHead.rotation.z = Math.PI / 2
      boltHead.position.set(0.9, Math.cos(angle) * 0.42, Math.sin(angle) * 0.42)
      conveyorGroup.add(boltHead)
    }
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      const bolt = new THREE.Mesh(boltGeo, matBlackMaterial)
      bolt.rotation.z = Math.PI / 2
      bolt.position.set(-0.7, Math.cos(angle) * 0.36, Math.sin(angle) * 0.36)
      conveyorGroup.add(bolt)
    }

    // Logo planes
    const textureLoader = new THREE.TextureLoader()
    const logoTexture = textureLoader.load('/images/logo.png')
    const logoMat = new THREE.MeshBasicMaterial({ map: logoTexture, transparent: true, opacity: 0.5, side: THREE.DoubleSide })
    const logoPlane = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.5), logoMat)
    logoPlane.position.set(-0.2, 0, 0.43)
    conveyorGroup.add(logoPlane)
    const logoPlaneBack = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.5), logoMat.clone())
    logoPlaneBack.position.set(-0.2, 0, -0.43)
    logoPlaneBack.rotation.y = Math.PI
    conveyorGroup.add(logoPlaneBack)

    // Scan beam
    const beamLength = 15
    const beamGeometry = new THREE.ConeGeometry(4.5, beamLength, 64, 1, true)
    beamGeometry.translate(0, -beamLength / 2, 0)
    const beamMaterial = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 }, color: { value: new THREE.Color(0x5FE3C0) }, opacity: { value: 0.45 } },
      vertexShader: `uniform float time; varying vec2 vUv; varying float vWave;
        void main() { vUv = uv; vec3 pos = position;
          float wave = sin(pos.y * 3.0 + time * 2.0) * 0.15;
          float pulse = sin(time * 3.0) * 0.1 + 1.0;
          pos.x += wave * pulse; pos.z += wave * pulse * 0.5; vWave = wave;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0); }`,
      fragmentShader: `uniform vec3 color; uniform float opacity; uniform float time; varying vec2 vUv; varying float vWave;
        void main() { float edgeGlow = 1.0 - abs(vWave) * 2.0; float pulse = sin(time * 3.0) * 0.2 + 0.8;
          float alpha = opacity * edgeGlow * pulse; gl_FragColor = vec4(color, alpha); }`,
      transparent: true, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false
    })
    scanBeam = new THREE.Mesh(beamGeometry, beamMaterial)
    scanBeam.position.set(0.8, 0, 0)
    scanBeam.rotation.z = Math.PI / 2
    conveyorGroup.add(scanBeam)

    const scanLight = new THREE.SpotLight(0x5FE3C0, 5, 30, Math.PI / 6, 0.5, 2)
    scanLight.position.copy(scanBeam.position)
    scanLight.target.position.set(scanBeam.position.x + beamLength, 0, 0)
    conveyorGroup.add(scanLight)
    conveyorGroup.add(scanLight.target)

    scene.add(conveyorGroup)
    conveyorGroup.rotation.y = -Math.PI

    beltMaterial = neonTurquoiseMaterial
    rollerMaterial = titaniumMaterial

    // Start animation loop
    animate = () => {
      if (!isPageVisible) return
      animationId = requestAnimationFrame(animate)
      const lerpFactor = 0.05
      currentRotation.x += (targetRotation.x - currentRotation.x) * lerpFactor
      currentRotation.y += (targetRotation.y - currentRotation.y) * lerpFactor
      conveyorGroup.rotation.x = currentRotation.x
      if (scanBeam?.material && (scanBeam.material as any).uniforms) {
        ;(scanBeam.material as any).uniforms.time.value = performance.now() * 0.001
      }
      renderer.render(scene, camera)
    }
    animate()

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('visibilitychange', handleVisibilityChange)
  }

  const fadeInMeshes = (gsap: any) => {
    conveyorGroup.traverse((child: any) => {
      if (child.isMesh && child.material) {
        gsap.to(child.material, { opacity: 1, duration: 1.5, ease: 'power2.out', delay: 0.3 })
      }
    })
  }

  const destroy = () => {
    if (animationId) cancelAnimationFrame(animationId)
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  }

  return {
    initScene,
    fadeInMeshes,
    destroy,
    getConveyorGroup: () => conveyorGroup,
    getBeltMaterial: () => beltMaterial,
    getRollerMaterial: () => rollerMaterial,
    getAnimate: () => animate,
    getRenderer: () => renderer
  }
}
