import { useRef, useEffect, useMemo, useCallback } from 'react'
import * as THREE from 'three'
import { useCategoryImages } from '../utils/imageGen'

export default function Home({ categories, currentCategoryIndex, viewMode, onCylinderClick }) {
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

  const images = useCategoryImages(currentCategoryIndex)
  const categoryName = categories[currentCategoryIndex]?.name || 'Projects'

  // Create the 3D scene
  useEffect(() => {
    const container = canvasRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.z = 5
    camera.position.y = 0.2
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

    // Create cylinder from individual panels
    images.forEach((src, i) => {
      const angle = (i / segments) * Math.PI * 2
      const nextAngle = ((i + 1) / segments) * Math.PI * 2

      // Panel geometry
      const panelWidth = 2 * radius * Math.sin(Math.PI / segments)
      const geometry = new THREE.PlaneGeometry(panelWidth, height, 1, 1)

      // Load texture
      const texture = new THREE.TextureLoader().load(src)
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter

      const material = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide,
        roughness: 0.3,
        metalness: 0.1,
      })

      const panel = new THREE.Mesh(geometry, material)

      // Position panel
      const midAngle = (angle + nextAngle) / 2
      panel.position.x = Math.sin(midAngle) * radius
      panel.position.z = Math.cos(midAngle) * radius
      panel.rotation.y = midAngle
      panel.position.y = 0

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

      const refPanel = new THREE.Mesh(geometry.clone(), refMaterial)
      refPanel.position.copy(panel.position)
      refPanel.position.y = -height - 0.05
      refPanel.rotation.y = midAngle
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

    // Reset rotation
    autoRotRef.current = 0
    targetRotRef.current = { x: 0, y: 0 }
    currentRotRef.current = { x: 0, y: 0 }

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

        cylinderRef.current.rotation.y = autoRotRef.current + currentRotRef.current.x
        cylinderRef.current.rotation.x = currentRotRef.current.y * 0.1
      }
      if (reflectionRef.current) {
        reflectionRef.current.rotation.y = cylinderRef.current?.rotation.y || 0
        reflectionRef.current.rotation.x = cylinderRef.current?.rotation.x || 0
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
      isDraggingRef.current = true
      lastMouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseMove = (e) => {
      if (isDraggingRef.current) {
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
      isDraggingRef.current = true
      lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
    const onTouchMove = (e) => {
      if (isDraggingRef.current) {
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

  return (
    <div className="home">
      {/* Giant PORTFOLIO text in background */}
      <div className="home__bg-text">PORTFOLIO</div>

      {/* 3D Canvas */}
      <div
        className="home__canvas"
        ref={canvasRef}
        onDoubleClick={onCylinderClick}
        style={{ cursor: 'grab' }}
      />

      {/* Category label */}
      <div className="home__category-label">
        {categoryName}
      </div>
    </div>
  )
}
