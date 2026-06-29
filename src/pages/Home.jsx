import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { useCategoryImages } from '../utils/imageGen'

export default function Home({
  categories,
  currentCategoryIndex,
  viewMode,
  onCylinderClick,
  onNextCategory,
  onPrevCategory
}) {
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const cameraRef = useRef(null)
  const cylinderRef = useRef(null)
  const reflectionRef = useRef(null)
  const rafRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetRotRef = useRef({ x: 0, y: 0 })
  const currentRotRef = useRef({ x: 0, y: 0 })
  const autoRotRef = useRef(0)
  const isDraggingRef = useRef(false)
  const lastMouseRef = useRef({ x: 0, y: 0 })

  // Ref for the category label to animate it
  const labelRef = useRef(null)

  // Local state for transitioning categories smoothly
  const [localCategoryIndex, setLocalCategoryIndex] = useState(currentCategoryIndex)
  const isTransitioningRef = useRef(false)

  const images = useCategoryImages(localCategoryIndex)
  const categoryName = categories[localCategoryIndex]?.name || 'Projects'

  // Create the 3D scene
  useEffect(() => {
    const container = canvasRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.set(0, 0.2, 5)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6)
    dirLight.position.set(2, 3, 4)
    scene.add(dirLight)

    // Handle resize
    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafRef.current)
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  // Handle prop changes of currentCategoryIndex to kick off exit transitions
  useEffect(() => {
    if (currentCategoryIndex === localCategoryIndex) return
    if (isTransitioningRef.current) return

    isTransitioningRef.current = true

    // Exit animation timeline
    const timeline = gsap.timeline({
      onComplete: () => {
        setLocalCategoryIndex(currentCategoryIndex)
      }
    })

    if (cylinderRef.current && reflectionRef.current) {
      timeline.to(cylinderRef.current.scale, {
        x: 0, y: 0, z: 0,
        duration: 0.4,
        ease: 'power2.inOut'
      }, 0)

      timeline.to(reflectionRef.current.scale, {
        x: 0, y: 0, z: 0,
        duration: 0.4,
        ease: 'power2.inOut'
      }, 0)

      timeline.to(cylinderRef.current.rotation, {
        y: cylinderRef.current.rotation.y + Math.PI * 0.4,
        duration: 0.4,
        ease: 'power2.inOut'
      }, 0)
    } else {
      setLocalCategoryIndex(currentCategoryIndex)
      isTransitioningRef.current = false
    }

    if (labelRef.current) {
      timeline.to(labelRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.3,
        ease: 'power2.inOut'
      }, 0)
    }
  }, [currentCategoryIndex, localCategoryIndex])

  // Create/update cylinder when images or category changes
  useEffect(() => {
    const scene = sceneRef.current
    if (!scene || images.length === 0) return

    // Remove old cylinder
    if (cylinderRef.current) {
      scene.remove(cylinderRef.current)
      cylinderRef.current.traverse((child) => {
        if (child.isMesh) {
          child.geometry.dispose()
          if (child.material.map) child.material.map.dispose()
          child.material.dispose()
        }
      })
    }
    if (reflectionRef.current) {
      scene.remove(reflectionRef.current)
      reflectionRef.current.traverse((child) => {
        if (child.isMesh) {
          child.geometry.dispose()
          child.material.dispose()
        }
      })
    }

    const group = new THREE.Group()
    const reflectionGroup = new THREE.Group()

    const radius = 1.4
    const height = 1.8
    const segments = images.length

    // Create Cylinder panel segments
    images.forEach((src, i) => {
      const angle = (i / segments) * Math.PI * 2
      const nextAngle = ((i + 1) / segments) * Math.PI * 2

      // Create a small gap between panels
      const angleGap = 0.04
      const panelThetaStart = angle + angleGap / 2
      const panelThetaLength = (nextAngle - angle) - angleGap

      // Panel geometry: curved segment of a cylinder
      const geometry = new THREE.CylinderGeometry(
        radius, // radiusTop
        radius, // radiusBottom
        height, // height
        16, // radialSegments
        1, // heightSegments
        true, // openEnded
        panelThetaStart,
        panelThetaLength
      )

      // Load texture
      const texture = new THREE.TextureLoader().load(src)
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter

      // Helper to compile material with rounded corners shader
      const applyRoundedShader = (material, panelAspect) => {
        material.onBeforeCompile = (shader) => {
          shader.uniforms.uAspect = { value: panelAspect }
          shader.uniforms.uRadius = { value: 0.08 } // 8% corner radius

          shader.fragmentShader = `
            uniform float uAspect;
            uniform float uRadius;
          ` + shader.fragmentShader

          shader.fragmentShader = shader.fragmentShader.replace(
            '#include <map_fragment>',
            `
            #include <map_fragment>
            
            vec2 uv = vMapUv;
            vec2 p = (uv - vec2(0.5)) * vec2(uAspect, 1.0);
            vec2 size = vec2(0.5 * uAspect, 0.5);
            vec2 b = size - vec2(0.01); // 1% margin
            float r = uRadius;
            
            vec2 d = abs(p) - b + vec2(r);
            float dist = min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
            
            float edgeWidth = 0.008;
            float roundedAlpha = 1.0 - smoothstep(-edgeWidth, 0.0, dist);
            
            diffuseColor.a *= roundedAlpha;
            
            if (diffuseColor.a < 0.01) discard;
            `
          )
        }
      }

      const panelAspect = (radius * panelThetaLength) / height

      const material = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide,
        roughness: 0.3,
        metalness: 0.1,
        transparent: true,
      })
      applyRoundedShader(material, panelAspect)

      const panel = new THREE.Mesh(geometry, material)
      group.add(panel)

      // Reflection panel
      const refMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.25,
        roughness: 0.5,
        metalness: 0.1,
      })
      applyRoundedShader(refMaterial, panelAspect)

      const refPanel = new THREE.Mesh(geometry, refMaterial)
      refPanel.position.y = -height - 0.05
      refPanel.scale.y = -1
      reflectionGroup.add(refPanel)
    })

    // Add top/bottom rims
    const rimGeo = new THREE.TorusGeometry(radius, 0.015, 8, segments * 4)
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      roughness: 0.2,
      metalness: 0.8,
    })

    const topRim = new THREE.Mesh(rimGeo, rimMat)
    topRim.rotation.x = Math.PI / 2
    topRim.position.y = height / 2
    group.add(topRim)

    const bottomRim = new THREE.Mesh(rimGeo.clone(), rimMat.clone())
    bottomRim.rotation.x = Math.PI / 2
    bottomRim.position.y = -height / 2
    group.add(bottomRim)

    // Reflection rims
    const refTopRim = new THREE.Mesh(rimGeo.clone(), new THREE.MeshStandardMaterial({
      color: 0xcccccc, roughness: 0.2, metalness: 0.8, transparent: true, opacity: 0.2
    }))
    refTopRim.rotation.x = Math.PI / 2
    refTopRim.position.y = -height / 2 - 0.05
    reflectionGroup.add(refTopRim)

    const refBottomRim = new THREE.Mesh(rimGeo.clone(), new THREE.MeshStandardMaterial({
      color: 0xcccccc, roughness: 0.2, metalness: 0.8, transparent: true, opacity: 0.2
    }))
    refBottomRim.rotation.x = Math.PI / 2
    refBottomRim.position.y = -height - height / 2 - 0.05
    reflectionGroup.add(refBottomRim)

    scene.add(group)
    scene.add(reflectionGroup)
    cylinderRef.current = group
    reflectionRef.current = reflectionGroup

    // Reset rotation and start entrance animation
    autoRotRef.current = 0
    targetRotRef.current = { x: 0, y: 0 }
    currentRotRef.current = { x: 0, y: 0 }

    // Start with scale 0 and spin rotation
    group.scale.set(0, 0, 0)
    reflectionGroup.scale.set(0, 0, 0)
    group.rotation.y = -Math.PI * 0.4
    reflectionGroup.rotation.y = -Math.PI * 0.4

    gsap.to(group.scale, {
      x: 1, y: 1, z: 1,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => {
        isTransitioningRef.current = false
      }
    })
    gsap.to(reflectionGroup.scale, {
      x: 1, y: 1, z: 1,
      duration: 0.6,
      ease: 'power2.out'
    })
    gsap.to(group.rotation, {
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    })

    if (labelRef.current) {
      gsap.fromTo(labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 0.5, y: 0, duration: 0.5, ease: 'power2.out' }
      )
    }

  }, [images])

  // Animation loop
  useEffect(() => {
    const renderer = rendererRef.current
    const scene = sceneRef.current
    const camera = cameraRef.current
    if (!renderer || !scene || !camera) return

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)

      autoRotRef.current += 0.003

      if (cylinderRef.current) {
        // Lerp rotation
        currentRotRef.current.x += (targetRotRef.current.x - currentRotRef.current.x) * 0.05
        currentRotRef.current.y += (targetRotRef.current.y - currentRotRef.current.y) * 0.05

        // Only apply mouse/auto rotation if we are not transitioning
        if (!isTransitioningRef.current) {
          cylinderRef.current.rotation.y = autoRotRef.current + currentRotRef.current.x
          cylinderRef.current.rotation.x = currentRotRef.current.y * 0.1
        }
      }
      if (reflectionRef.current) {
        // Match rotation only if not transitioning
        if (!isTransitioningRef.current) {
          reflectionRef.current.rotation.y = cylinderRef.current?.rotation.y || 0
          reflectionRef.current.rotation.x = cylinderRef.current?.rotation.x || 0
        }
      }

      renderer.render(scene, camera)
    }

    animate()

    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Mouse interaction for cylinder rotation
  useEffect(() => {
    const container = canvasRef.current
    if (!container) return

    const onMouseDown = (e) => {
      if (isTransitioningRef.current) return
      isDraggingRef.current = true
      lastMouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseMove = (e) => {
      if (isDraggingRef.current && !isTransitioningRef.current) {
        const dx = e.clientX - lastMouseRef.current.x
        const dy = e.clientY - lastMouseRef.current.y
        targetRotRef.current.x += dx * 0.005
        targetRotRef.current.y += dy * 0.005
        targetRotRef.current.y = Math.max(-0.3, Math.min(0.3, targetRotRef.current.y))
        lastMouseRef.current = { x: e.clientX, y: e.clientY }
      }
    }

    const onMouseUp = () => {
      isDraggingRef.current = false
    }

    container.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    // Touch
    const onTouchStart = (e) => {
      if (isTransitioningRef.current) return
      isDraggingRef.current = true
      lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
    const onTouchMove = (e) => {
      if (isDraggingRef.current && !isTransitioningRef.current) {
        const dx = e.touches[0].clientX - lastMouseRef.current.x
        const dy = e.touches[0].clientY - lastMouseRef.current.y
        targetRotRef.current.x += dx * 0.005
        targetRotRef.current.y += dy * 0.005
        targetRotRef.current.y = Math.max(-0.3, Math.min(0.3, targetRotRef.current.y))
        lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
    }
    const onTouchEnd = () => {
      isDraggingRef.current = false
    }

    container.addEventListener('touchstart', onTouchStart, { passive: true })
    container.addEventListener('touchmove', onTouchMove, { passive: true })
    container.addEventListener('touchend', onTouchEnd)

    return () => {
      container.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      container.removeEventListener('touchstart', onTouchStart)
      container.removeEventListener('touchmove', onTouchMove)
      container.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  // Scroll and touch swipe detection for category navigation
  useEffect(() => {
    let lastScrollTime = 0
    const cooldown = 1000 // 1 second cooldown between switches

    const handleWheel = (e) => {
      if (isTransitioningRef.current) return

      const now = Date.now()
      if (now - lastScrollTime < cooldown) return

      if (Math.abs(e.deltaY) > 30) {
        if (e.deltaY > 0) {
          onNextCategory()
        } else {
          onPrevCategory()
        }
        lastScrollTime = now
      }
    }

    let touchStartY = 0
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      if (isTransitioningRef.current) return

      const touchEndY = e.changedTouches[0].clientY
      const deltaY = touchStartY - touchEndY
      const now = Date.now()

      if (now - lastScrollTime < cooldown) return

      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0) {
          onNextCategory()
        } else {
          onPrevCategory()
        }
        lastScrollTime = now
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [onNextCategory, onPrevCategory])

  return (
    <div className="home">
      {/* Giant PORTFOLIO text in background */}
      <div className="home__bg-text home__bg-text--left">PORT</div>
      <div className="home__bg-text home__bg-text--right">FOLIO</div>

      {/* 3D Canvas */}
      <div
        className="home__canvas"
        ref={canvasRef}
        onDoubleClick={onCylinderClick}
        style={{ cursor: 'grab' }}
      />

      {/* Category label */}
      <div className="home__category-label" ref={labelRef}>
        {categoryName}
      </div>
    </div>
  )
}
