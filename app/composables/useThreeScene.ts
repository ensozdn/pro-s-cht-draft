import * as THREE from 'three'

export function useThreeScene(canvasRef: Ref<HTMLCanvasElement | null>) {
  let scene: THREE.Scene
  let camera: THREE.PerspectiveCamera
  let renderer: THREE.WebGLRenderer
  let conveyorGroup: THREE.Group
  let animationId: number
  let beltMaterial: THREE.MeshStandardMaterial
  let rollerMaterial: THREE.MeshStandardMaterial
  let beamMaterial: THREE.ShaderMaterial | null = null
  let beamMesh: THREE.Mesh | null = null
  let isPageVisible = true

  const mouse = { x: 0, y: 0 }
  const targetRotation = { x: 0, y: 0 }
  const currentRotation = { x: 0, y: 0 }

  let animate: () => void
  let animateFrame: () => void

  const handleResize = () => {
    if (!camera || !renderer) return
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  let useGSAPTicker = false

  const handleVisibilityChange = () => {
    isPageVisible = !document.hidden
    if (!useGSAPTicker) {
      if (!isPageVisible && animationId) {
        cancelAnimationFrame(animationId)
      } else if (isPageVisible) {
        animate()
      }
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
          const box = new THREE.Box3().setFromObject(gltf.scene)
          const center = box.getCenter(new THREE.Vector3())
          const size = box.getSize(new THREE.Vector3())

          const scaleFactor = 2.5 / Math.max(size.x, size.y, size.z)
          gltf.scene.scale.set(scaleFactor, scaleFactor, scaleFactor)

          const scaledBox = new THREE.Box3().setFromObject(gltf.scene)
          const scaledCenter = scaledBox.getCenter(new THREE.Vector3())
          gltf.scene.position.sub(scaledCenter)

          // Kamerayı da eski orijinal konumuna (çok daha yakına) alıyoruz
          camera.position.set(0, 2, 5)
          camera.near = 0.1
          camera.far = 1000
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

          const logoTexture = new THREE.TextureLoader().load('/images/logo.png')
          logoTexture.colorSpace = THREE.SRGBColorSpace
          const logoMat = new THREE.MeshBasicMaterial({
            map: logoTexture, transparent: true, side: THREE.DoubleSide,
            depthWrite: false, alphaTest: 0.05
          })
          const logoW = size.z * 0.95
          const logoH = size.y * 0.50
          const logoGeo = new THREE.PlaneGeometry(logoW, logoH)

          const logoLeft = new THREE.Mesh(logoGeo, logoMat)
          logoLeft.position.set(center.x + size.x * 0.10, center.y, center.z + size.z / 2 + 0.01)
          logoLeft.renderOrder = 1

          const logoRight = new THREE.Mesh(logoGeo, logoMat)
          logoRight.position.set(center.x + size.x * 0.10, center.y, center.z - size.z / 2 - 0.01)
          logoRight.rotation.y = Math.PI
          logoRight.renderOrder = 1

          gltf.scene.add(logoLeft)
          gltf.scene.add(logoRight)

          const lensX = globalBbox.min.x
          const beamLen = 3.5
          const beamRad = 0.6
          const beamGeo = new THREE.ConeGeometry(beamRad, beamLen, 64, 12, true)
          beamGeo.translate(0, -beamLen / 2, 0)
          beamGeo.applyMatrix4(new THREE.Matrix4().makeRotationZ(-Math.PI / 2))
          beamMaterial = new THREE.ShaderMaterial({
            uniforms: {
              uTime:    { value: 0 },
              uColor:   { value: new THREE.Color(0x3DBAA2) },
              uOpacity: { value: 0.35 },
              uBeamLen: { value: beamLen }
            },
            vertexShader: `
              varying float vAxisDist;
              void main() {
                vAxisDist   = -position.x;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `,
            fragmentShader: `
              uniform vec3  uColor;
              uniform float uOpacity;
              uniform float uTime;
              uniform float uBeamLen;
              varying float vAxisDist;
              void main() {
                float axial     = clamp(vAxisDist / uBeamLen, 0.0, 1.0);
                float axialFade = smoothstep(0.0, 0.08, axial) * (1.0 - smoothstep(0.5, 1.0, axial));
                float pulse     = sin(uTime * 2.5) * 0.12 + 0.88;
                float alpha     = axialFade * uOpacity * pulse;
                gl_FragColor    = vec4(uColor, alpha);
              }
            `,
            transparent: true,
            depthWrite:  false,
            side:        THREE.DoubleSide,
            blending:    THREE.AdditiveBlending
          })
          const beam = new THREE.Mesh(beamGeo, beamMaterial)
          beam.position.set(lensX, 0, 0)
          beamMesh = beam
          conveyorGroup.add(beam)

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

    scene.add(conveyorGroup)
    conveyorGroup.rotation.y = Math.PI * 0.15
    conveyorGroup.rotation.x = -0.2

    // Start animation loop
    animateFrame = () => {
      const lerpFactor = 0.05
      currentRotation.x += (targetRotation.x - currentRotation.x) * lerpFactor
      currentRotation.y += (targetRotation.y - currentRotation.y) * lerpFactor
      conveyorGroup.rotation.x = currentRotation.x - 0.2
      if (beamMaterial) beamMaterial.uniforms.uTime.value = performance.now() * 0.001
      if (beamMesh) {
        const t = performance.now() * 0.001
        beamMesh.rotation.z = Math.sin(t * 1.4) * 0.30
        beamMesh.rotation.y = Math.cos(t * 0.7) * 0.08
      }
      renderer.render(scene, camera)
    }

    animate = () => {
      if (!isPageVisible) return
      animationId = requestAnimationFrame(animate)
      animateFrame()
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

  const stopAnimate = () => {
    if (animationId) {
      cancelAnimationFrame(animationId)
      animationId = 0
    }
    useGSAPTicker = true
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
    stopAnimate,
    getConveyorGroup: () => conveyorGroup,
    getBeltMaterial: () => beltMaterial,
    getRollerMaterial: () => rollerMaterial,
    getAnimate: () => animate,
    getAnimateFrame: () => animateFrame,
    getRenderer: () => renderer
  }
}
