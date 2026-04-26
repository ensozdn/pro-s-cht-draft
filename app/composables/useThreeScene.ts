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

  const initScene = async () => {
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

    // Environment map — stüdyo ışığı yansıması (harici HDRI gerekmez)
    const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js')
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment()).texture
    pmremGenerator.dispose()

    conveyorGroup = new THREE.Group()

    // GLB model yükle + materyal uygula
    const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')
    await new Promise<void>((resolve) => {
      new GLTFLoader().load(
        '/basler-camera.glb',
        (gltf) => {
          gltf.scene.traverse((child) => {
            if (!(child as THREE.Mesh).isMesh) return
            const mesh = child as THREE.Mesh
            const n = mesh.name.toLowerCase()
            const isLens = n.includes('lens') || n.includes('glass') || n.includes('crystal') || n.includes('sensor') || n.includes('cam')
            mesh.material = isLens
              ? new THREE.MeshPhysicalMaterial({
                  color: 0x111827,
                  transmission: 1,
                  ior: 1.52,
                  roughness: 0.02,
                  metalness: 0,
                  thickness: 0.5,
                  transparent: true,
                  opacity: 0,
                  envMapIntensity: 2
                })
              : new THREE.MeshStandardMaterial({
                  color: 0x2c2f33,
                  roughness: 0.72,
                  metalness: 0.65,
                  transparent: true,
                  opacity: 0,
                  envMapIntensity: 1.5
                })
          })
          conveyorGroup.add(gltf.scene)
          resolve()
        },
        undefined,
        () => resolve()
      )
    })

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

    beltMaterial = new THREE.MeshStandardMaterial({ transparent: true, opacity: 0 })
    rollerMaterial = new THREE.MeshStandardMaterial({ transparent: true, opacity: 0 })

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
