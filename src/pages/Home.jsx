import { useState, useRef, useEffect, useCallback } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { useCategoryHeadingImages } from '../utils/imageGen'

export default function Home({
  categories,
  currentCategoryIndex,
  viewMode,
  onCylinderClick,
  onNextCategory,
  onPrevCategory,
  onCategorySelect
}) {
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const cameraRef = useRef(null)
  const cylinderRef = useRef(null)
  const reflectionRef = useRef(null)
  const rafRef = useRef(null)
  
  // Physics and rotation states
  const baseRotYRef = useRef(-0.2 * Math.PI - (currentCategoryIndex / 5) * Math.PI * 2)
  const currentRotRef = useRef({ x: 0, y: 0 })
  const isDraggingRef = useRef(false)
  const lastMouseRef = useRef({ x: 0, y: 0 })
  const mouseDownPosRef = useRef({ x: 0, y: 0 })
  const snapTweenRef = useRef(null)
  
  // Ref for the category label to animate it
  const labelRef = useRef(null)

  // Local state for transitioning categories smoothly
  const [localCategoryIndex, setLocalCategoryIndex] = useState(currentCategoryIndex)
  const isTransitioningRef = useRef(false)

  const images = useCategoryHeadingImages()
  const categoryName = categories[localCategoryIndex]?.name || 'Projects'

  // Helper to calculate target rotation Y for any category index
  const getTargetRotationY = useCallback((index) => {
    return -0.2 * Math.PI - (index / 5) * Math.PI * 2
  }, [])

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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
    scene.add(ambientLight)
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5)
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

  // Handle category snaps when currentCategoryIndex updates from external triggers (scroll, keyboard, controls)
  useEffect(() => {
    setLocalCategoryIndex(currentCategoryIndex)

    const targetY = getTargetRotationY(currentCategoryIndex)

    if (snapTweenRef.current) snapTweenRef.current.kill()

    // Animate base rotation to snap the active category to the center-front
    snapTweenRef.current = gsap.timeline()
    
    snapTweenRef.current.to(baseRotYRef, {
      current: targetY,
      duration: 0.7,
      ease: 'power2.out'
    }, 0)

    snapTweenRef.current.to(currentRotRef.current, {
      x: 0,
      duration: 0.7,
      ease: 'power2.out'
    }, 0)

    if (labelRef.current) {
      gsap.fromTo(labelRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      )
    }
  }, [currentCategoryIndex, getTargetRotationY])

  // Create cylinder meshes once
  useEffect(() => {
    const scene = sceneRef.current
    if (!scene || images.length === 0) return

    // Remove old group
    if (cylinderRef.current) scene.remove(cylinderRef.current)
    if (reflectionRef.current) scene.remove(reflectionRef.current)

    const group = new THREE.Group()
    const reflectionGroup = new THREE.Group()

    const radius = 1.4
    const height = 1.8
    const segments = images.length // 5

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
      panel.userData = { index: i }
      group.add(panel)

      // Reflection panel
      const refMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.22,
        roughness: 0.5,
        metalness: 0.1,
      })
      applyRoundedShader(refMaterial, panelAspect)

      const refPanel = new THREE.Mesh(geometry, refMaterial)
      refPanel.position.y = -height - 0.05
      refPanel.scale.y = -1
      refPanel.userData = { index: i }
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

    // Set initial position and scale entrance
    group.scale.set(0, 0, 0)
    reflectionGroup.scale.set(0, 0, 0)
    
    // Position initial angle
    group.rotation.y = baseRotYRef.current
    reflectionGroup.rotation.y = baseRotYRef.current

    gsap.to(group.scale, {
      x: 1, y: 1, z: 1,
      duration: 0.8,
      ease: 'power3.out'
    })
    gsap.to(reflectionGroup.scale, {
      x: 1, y: 1, z: 1,
      duration: 0.8,
      ease: 'power3.out'
    })
  }, [images])

  // Animation frame loop
  useEffect(() => {
    const renderer = rendererRef.current
    const scene = sceneRef.current
    const camera = cameraRef.current
    if (!renderer || !scene || !camera) return

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)

      if (cylinderRef.current) {
        // Smooth transition of rotation including drag offset
        cylinderRef.current.rotation.y = baseRotYRef.current + currentRotRef.current.x
        // Subtle tilt sway on mouse Y
        cylinderRef.current.rotation.x += (currentRotRef.current.y * 0.1 - cylinderRef.current.rotation.x) * 0.05
      }

      if (reflectionRef.current && cylinderRef.current) {
        reflectionRef.current.rotation.y = cylinderRef.current.rotation.y
        reflectionRef.current.rotation.x = cylinderRef.current.rotation.x
      }

      renderer.render(scene, camera)
    }

    animate()

    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Mouse & touch drag controls + click raycasting
  useEffect(() => {
    const container = canvasRef.current
    if (!container) return

    const onMouseDown = (e) => {
      isDraggingRef.current = true
      lastMouseRef.current = { x: e.clientX, y: e.clientY }
      mouseDownPosRef.current = { x: e.clientX, y: e.clientY }
      container.style.cursor = 'grabbing'
      if (snapTweenRef.current) snapTweenRef.current.pause()
    }

    const onMouseMove = (e) => {
      if (!isDraggingRef.current) return
      const dx = e.clientX - lastMouseRef.current.x
      const dy = e.clientY - lastMouseRef.current.y
      
      // Update temporary rotation offsets
      currentRotRef.current.x += dx * 0.007
      currentRotRef.current.y += dy * 0.005
      currentRotRef.current.y = Math.max(-0.4, Math.min(0.4, currentRotRef.current.y))

      lastMouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseUp = (e) => {
      if (!isDraggingRef.current) return
      isDraggingRef.current = false
      container.style.cursor = 'grab'

      // Check pointer travel distance to differentiate clicks from drags
      const dragDistance = Math.sqrt(
        Math.pow(e.clientX - mouseDownPosRef.current.x, 2) +
        Math.pow(e.clientY - mouseDownPosRef.current.y, 2)
      )

      if (dragDistance < 4) {
        // It's a click! Perform Raycasting
        const mouse = new THREE.Vector2()
        const raycaster = new THREE.Raycaster()
        const rect = container.getBoundingClientRect()

        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

        if (cameraRef.current && cylinderRef.current) {
          raycaster.setFromCamera(mouse, cameraRef.current)
          const intersects = raycaster.intersectObjects(cylinderRef.current.children, true)
          const panelHit = intersects.find(hit => hit.object.userData && hit.object.userData.index !== undefined)

          if (panelHit) {
            const clickedIndex = panelHit.object.userData.index
            if (clickedIndex === currentCategoryIndex) {
              onCylinderClick()
            } else {
              onCategorySelect(clickedIndex)
            }
            return
          }
        }
      }

      // If it was a drag, perform snapping math
      const netY = baseRotYRef.current + currentRotRef.current.x
      const calculatedIndex = Math.round(- (netY + 0.2 * Math.PI) / (Math.PI * 2 / 5))
      const nearestIndex = ((calculatedIndex % 5) + 5) % 5

      onCategorySelect(nearestIndex)
    }

    // Touch Support
    const onTouchStart = (e) => {
      isDraggingRef.current = true
      lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      mouseDownPosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      if (snapTweenRef.current) snapTweenRef.current.pause()
    }

    const onTouchMove = (e) => {
      if (!isDraggingRef.current) return
      const dx = e.touches[0].clientX - lastMouseRef.current.x
      const dy = e.touches[0].clientY - lastMouseRef.current.y
      
      currentRotRef.current.x += dx * 0.007
      currentRotRef.current.y += dy * 0.005
      currentRotRef.current.y = Math.max(-0.4, Math.min(0.4, currentRotRef.current.y))

      lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }

    const onTouchEnd = (e) => {
      if (!isDraggingRef.current) return
      isDraggingRef.current = false

      const dragDistance = Math.sqrt(
        Math.pow(e.changedTouches[0].clientX - mouseDownPosRef.current.x, 2) +
        Math.pow(e.changedTouches[0].clientY - mouseDownPosRef.current.y, 2)
      )

      if (dragDistance < 4) {
        // Treat touch click on active category as select/open
        const mouse = new THREE.Vector2()
        const raycaster = new THREE.Raycaster()
        const rect = container.getBoundingClientRect()

        mouse.x = ((e.changedTouches[0].clientX - rect.left) / rect.width) * 2 - 1
        mouse.y = -((e.changedTouches[0].clientY - rect.top) / rect.height) * 2 + 1

        if (cameraRef.current && cylinderRef.current) {
          raycaster.setFromCamera(mouse, cameraRef.current)
          const intersects = raycaster.intersectObjects(cylinderRef.current.children, true)
          const panelHit = intersects.find(hit => hit.object.userData && hit.object.userData.index !== undefined)

          if (panelHit) {
            const clickedIndex = panelHit.object.userData.index
            if (clickedIndex === currentCategoryIndex) {
              onCylinderClick()
            } else {
              onCategorySelect(clickedIndex)
            }
            return
          }
        }
      }

      // Snapping math
      const netY = baseRotYRef.current + currentRotRef.current.x
      const calculatedIndex = Math.round(- (netY + 0.2 * Math.PI) / (Math.PI * 2 / 5))
      const nearestIndex = ((calculatedIndex % 5) + 5) % 5

      onCategorySelect(nearestIndex)
    }

    container.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

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
  }, [currentCategoryIndex, onCategorySelect, onCylinderClick])

  // Scroll and touch swipe detection for category navigation
  useEffect(() => {
    let lastScrollTime = 0
    const cooldown = 750

    const handleWheel = (e) => {
      if (isTransitioningRef.current) return

      const now = Date.now()
      if (now - lastScrollTime < cooldown) return

      if (Math.abs(e.deltaY) > 20) {
        if (e.deltaY > 0) {
          onNextCategory()
        } else {
          onPrevCategory()
        }
        lastScrollTime = now
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
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
        style={{ cursor: 'grab' }}
      />

      {/* Category label */}
      <div className="home__category-label" ref={labelRef}>
        {categoryName}
      </div>
    </div>
  )
}
