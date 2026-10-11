import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sound } from '../utils/audioEngine';
import { PROJECTS_DATA } from '../utils/mindverseData';

export default function Cosmos3DScene({ onSelectProject, onHoverPlanet }) {
  const containerRef = useRef(null);
  const [hoveredPlanetData, setHoveredPlanetData] = useState(null);
  const onSelectRef = useRef(onSelectProject);
  const onHoverRef = useRef(onHoverPlanet);
  const hoveredSlugRef = useRef(null);

  useEffect(() => {
    onSelectRef.current = onSelectProject;
    onHoverRef.current = onHoverPlanet;
  }, [onSelectProject, onHoverPlanet]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 700;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2500);
    camera.position.set(0, 110, 190);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xffc857, 3.5, 500);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // 3. Central Star ("The Mind")
    const sunGeo = new THREE.SphereGeometry(12, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({
      color: 0xffc857,
      wireframe: false
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sunMesh);

    // Sun corona glow sprite
    const coronaGeo = new THREE.SphereGeometry(13.8, 32, 32);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0xff6b4a,
      transparent: true,
      opacity: 0.35
    });
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    scene.add(coronaMesh);

    // 4. Background Starfield
    const starCount = 1200;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 1400;
      starPositions[i + 1] = (Math.random() - 0.5) * 1400;
      starPositions[i + 2] = (Math.random() - 0.5) * 1400;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xedebfa, size: 1.8, transparent: true, opacity: 0.85 });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // 5. Planetary System Meshes & Orbits
    const planetMeshes = [];
    const orbitalRadii = [32, 50, 70, 92, 114, 136];

    PROJECTS_DATA.forEach((proj, idx) => {
      const radius = orbitalRadii[idx % orbitalRadii.length];
      const planetSize = (proj.weight / 100) * 4.2 + 2.5;

      // Orbit Path Line
      const orbitCurve = new THREE.EllipseCurve(0, 0, radius, radius * 0.8, 0, 2 * Math.PI, false, 0);
      const orbitPoints = orbitCurve.getPoints(64);
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(
        orbitPoints.map((p) => new THREE.Vector3(p.x, 0, p.y))
      );
      const orbitMat = new THREE.LineBasicMaterial({
        color: 0x8a8fb0,
        transparent: true,
        opacity: 0.22
      });
      const orbitLine = new THREE.Line(orbitGeo, orbitMat);
      scene.add(orbitLine);

      // Planet Sphere Mesh
      let planetGeo;
      if (proj.planetType === 'crystal') {
        planetGeo = new THREE.IcosahedronGeometry(planetSize, 1);
      } else {
        planetGeo = new THREE.SphereGeometry(planetSize, 32, 32);
      }

      const planetMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(proj.primaryColor),
        roughness: 0.45,
        metalness: 0.25,
        emissive: new THREE.Color(proj.secondaryColor),
        emissiveIntensity: 0.2
      });

      const mesh = new THREE.Mesh(planetGeo, planetMat);
      mesh.userData = {
        project: proj,
        orbitalRadius: radius,
        orbitalSpeed: 0.006 / (idx + 1),
        currentAngle: (idx * Math.PI) / 3,
        planetSize
      };

      // Planetary Rings if applicable
      if (proj.rings > 0) {
        const ringGeo = new THREE.RingGeometry(planetSize * 1.35, planetSize * 1.9, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(proj.primaryColor),
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.7
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2.8;
        mesh.add(ringMesh);
      }

      scene.add(mesh);
      planetMeshes.push(mesh);
    });

    // 6. Interaction: Orbit Dragging & Raycasting
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let sphericalRotation = { x: 0, y: 0 };

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseDown = (e) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - prevMousePos.x;
        const deltaY = e.clientY - prevMousePos.y;
        prevMousePos = { x: e.clientX, y: e.clientY };

        scene.rotation.y += deltaX * 0.005;
        scene.rotation.x = Math.max(-0.6, Math.min(0.6, scene.rotation.x + deltaY * 0.003));
      } else {
        // Raycasting for hover
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(planetMeshes);

        if (intersects.length > 0) {
          const hit = intersects[0].object;
          const proj = hit.userData.project;
          if (hoveredSlugRef.current !== proj.slug) {
            hoveredSlugRef.current = proj.slug;
            setHoveredPlanetData(proj);
            onHoverRef.current?.(proj);
          }
          document.body.style.cursor = 'pointer';
        } else {
          if (hoveredSlugRef.current !== null) {
            hoveredSlugRef.current = null;
            setHoveredPlanetData(null);
            onHoverRef.current?.(null);
          }
          document.body.style.cursor = 'default';
        }
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    // Zoom fly-in state
    let targetCameraPos = null;
    let flyInTarget = null;

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planetMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const proj = hit.userData.project;
        if (!proj.unexplored) {
          sound.playPlanetChord(proj.planetType);

          // Fly camera to target planet
          flyInTarget = proj;
          const worldPos = new THREE.Vector3();
          hit.getWorldPosition(worldPos);

          targetCameraPos = new THREE.Vector3(
            worldPos.x + 8,
            worldPos.y + 6,
            worldPos.z + 16
          );

          setTimeout(() => {
            onSelectRef.current?.(proj);
          }, 700);
        }
      }
    };

    const handleWheel = (e) => {
      camera.position.z = Math.max(90, Math.min(320, camera.position.z + e.deltaY * 0.15));
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    dom.addEventListener('click', handleClick);
    dom.addEventListener('wheel', handleWheel, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || 700;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 7. Animation Loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Rotate sun and corona
      sunMesh.rotation.y += 0.004;
      coronaMesh.rotation.y -= 0.002;

      // Orbit planets
      planetMeshes.forEach((mesh) => {
        mesh.userData.currentAngle += mesh.userData.orbitalSpeed;
        const angle = mesh.userData.currentAngle;
        const rad = mesh.userData.orbitalRadius;

        mesh.position.x = Math.cos(angle) * rad;
        mesh.position.z = Math.sin(angle) * rad * 0.8;
        mesh.rotation.y += 0.015;
      });

      // Smooth camera interpolation if flying into a planet
      if (targetCameraPos) {
        camera.position.lerp(targetCameraPos, 0.08);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      dom.removeEventListener('click', handleClick);
      dom.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      if (container && container.contains(dom)) container.removeChild(dom);

      // Complete GPU memory and Three.js resource disposal
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      renderer.dispose();
      document.body.style.cursor = 'default';
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 'calc(100vh - 64px)', overflow: 'hidden' }}>
      {/* Three.js Canvas Container */}
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

      {/* Floating HUD Telemetry Badge on Hover */}
      {hoveredPlanetData && (
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(5, 6, 15, 0.92)',
            border: `1px solid ${hoveredPlanetData.primaryColor}`,
            boxShadow: `0 8px 30px rgba(0, 0, 0, 0.8), 0 0 20px ${hoveredPlanetData.glowColor}`,
            padding: '12px 24px',
            borderRadius: '8px',
            fontFamily: 'var(--font-mono)',
            textAlign: 'center',
            pointerEvents: 'none',
            zIndex: 10,
            animation: 'fadeIn 200ms ease'
          }}
        >
          <div style={{ fontSize: '0.72rem', color: hoveredPlanetData.primaryColor, letterSpacing: '0.12em' }}>
            SECTOR: {hoveredPlanetData.discipline.toUpperCase()} // STATUS: IN ORBIT
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: '2px 0' }}>
            {hoveredPlanetData.title}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--stardust-gold)' }}>
            ★ {hoveredPlanetData.oneLineOutcome}
          </div>
          <div style={{ fontSize: '0.68rem', color: 'var(--asteroid-gray)', marginTop: '4px' }}>
            [CLICK TO INITIATE 3D SURFACE LANDING]
          </div>
        </div>
      )}

      {/* 3D Scene Interactive Overlay Controls */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          background: 'rgba(5, 6, 15, 0.75)',
          border: '1px solid rgba(138, 143, 176, 0.25)',
          borderRadius: '4px',
          padding: '6px 12px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--asteroid-gray)',
          pointerEvents: 'none'
        }}
      >
        <span>DRAG TO ROTATE • SCROLL TO ZOOM • CLICK TO LAND</span>
      </div>
    </div>
  );
}
