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

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 5000)
    camera.position.set(0, 0, 100)
    camera.lookAt(0, 0, 0)

    renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    const mainLight = new THREE.DirectionalLight(0xffffff, 2.0)
    mainLight.position.set(50, 100, 80)
    mainLight.castShadow = true
    scene.add(mainLight)
    const fillLight = new THREE.DirectionalLight(0xaaccff, 0.8)
    fillLight.position.set(-60, 40, -60)
    scene.add(fillLight)
    const spotLight1 = new THREE.SpotLight(0xffffff, 3.0)
    spotLight1.position.set(70, 70, 70)
    spotLight1.angle = Math.PI / 3
    scene.add(spotLight1)
    const accentLight = new THREE.SpotLight(0x3DBAA2, 2.0)
    accentLight.position.set(-40, 50, 40)
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
    let sharedMaterial: THREE.MeshStandardMaterial
    await new Promise<void>((resolve) => {
      new GLTFLoader().load(
        '/basler-camera.glb',
        (gltf) => {
          // Modeli merkeze ortala
          const box = new THREE.Box3().setFromObject(gltf.scene)
          const center = box.getCenter(new THREE.Vector3())
          const size = box.getSize(new THREE.Vector3())
          gltf.scene.position.sub(center) // Merkeze taşı

          // Kamerayı modelin boyutuna göre otomatik ayarla
          const maxDim = Math.max(size.x, size.y, size.z)
          const fov = camera.fov * (Math.PI / 180)
          const cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * 2.2
          camera.position.set(0, 0, cameraZ)
          camera.near = maxDim * 0.001
          camera.far = maxDim * 100
          camera.updateProjectionMatrix()

          // Orijinal materyaller düzgün olmadığı için özel endüstriyel koyu gri bir materyal kullanıyoruz
          // Global boyutları hesapla ki parçaların nerede olduğunu anlayabilelim
          const globalBbox = new THREE.Box3().setFromObject(gltf.scene)
          const globalCenter = new THREE.Vector3()
          globalBbox.getCenter(globalCenter)
          const globalSize = new THREE.Vector3()
          globalBbox.getSize(globalSize)

          // Referans görsele uygun materyaller (Panda tasarımı)
          const silverMaterial = new THREE.MeshStandardMaterial({
            color: 0xe0e5ec, roughness: 0.25, metalness: 0.85, side: THREE.DoubleSide, envMapIntensity: 2.5
          })
          const blackMaterial = new THREE.MeshStandardMaterial({
            color: 0x181a1b, roughness: 0.5, metalness: 0.4, side: THREE.DoubleSide, envMapIntensity: 1.0
          })
          const glassMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x111827, transmission: 0.8, ior: 1.52, roughness: 0.05, thickness: 0.5, side: THREE.DoubleSide, transparent: true, envMapIntensity: 2
          })

          gltf.scene.traverse((child) => {
            if (!(child as THREE.Mesh).isMesh) return
            const mesh = child as THREE.Mesh
            const n = mesh.name.toLowerCase()
            
            // Her parçanın kendi boyut ve konumunu buluyoruz
            mesh.geometry.computeBoundingBox()
            const bbox = mesh.geometry.boundingBox!
            const center = new THREE.Vector3()
            bbox.getCenter(center)
            const size = new THREE.Vector3()
            bbox.getSize(size)
            
            const relX = (center.x - globalBbox.min.x) / globalSize.x // 0 = En Arka, 1 = En Ön
            const isGlass = n.includes('lens') || n.includes('glass') || n.includes('crystal')

            let mat = silverMaterial // Varsayılan: Gümüş (Ön/Arka kapaklar, vidalar, soketler)

            if (isGlass) {
              mat = glassMaterial
            } else if (relX < 0.45) {
              // Ön kısımdaki uzun lens silindiri -> Siyah
              mat = blackMaterial
            } else if (size.x > globalSize.x * 0.15 && size.y < globalSize.y * 0.4) {
              // Sadece Üst ve Alt siyah gövde plakaları (Uzun ama Y ekseninde ince) -> Siyah
              mat = blackMaterial
            } else {
              // Sağ, Sol, Arka, Ön plakalar ve diğer detaylar -> Gümüş
              mat = silverMaterial
            }
            
            mesh.material = mat
          })



          conveyorGroup.add(gltf.scene)
          resolve()
        },
        undefined,
        (err) => { console.error('GLB load error:', err); resolve() }
      )
    })

    // Belt ve roller material için dummy materyaller (çünkü GLB içindeki kendi materyallerini kullanıyor)
    beltMaterial = new THREE.MeshStandardMaterial({ transparent: true, opacity: 0 })
    rollerMaterial = new THREE.MeshStandardMaterial({ transparent: true, opacity: 0 })

    // Scan beam (Kamera boyutuna göre pozisyonunu ayarlıyoruz, dışarı çıksın)
    const beamLength = 40
    const beamGeometry = new THREE.ConeGeometry(12, beamLength, 64, 1, true)
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
    scanBeam.position.set(25, 0, 0) // Kamera boyutu büyük olduğu için X ekseninde 25 birim ileri alındı
    scanBeam.rotation.z = -Math.PI / 2 // Doğru yöne bakması için döndürüldü
    conveyorGroup.add(scanBeam)

    const scanLight = new THREE.SpotLight(0x5FE3C0, 5, 100, Math.PI / 6, 0.5, 2)
    scanLight.position.copy(scanBeam.position)
    scanLight.target.position.set(scanBeam.position.x + beamLength, 0, 0)
    conveyorGroup.add(scanLight)
    conveyorGroup.add(scanLight.target)

    scene.add(conveyorGroup)
    conveyorGroup.rotation.y = -Math.PI

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
    // Fade in mantığı kaldırıldı, çünkü preloader zaten ekranı kaplıyor
    // Doğrudan opacity 1 ve transparent false olarak ayarlandı, böylece performans artacak ve x-ray sorunu yaşanmayacak
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
