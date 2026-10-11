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

  // Intro launch state: active on mount
  const [isIntroPlaying, setIsIntroPlaying] = useState(true);

  const skipIntroRef = useRef(null);

  useEffect(() => {
    onSelectRef.current = onSelectProject;
    onHoverRef.current = onHoverPlanet;
  }, [onSelectProject, onHoverPlanet]);

  // Keyboard shortcut to skip intro (Escape)
  useEffect(() => {
    if (!isIntroPlaying) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        skipIntroRef.current?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isIntroPlaying]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 700;

    // 1. Scene & Pure Black Void Background
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2500);
    camera.position.set(0, 0, 85);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lights (Bright illumination so rocket gleams)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 3.0);
    dirLight.position.set(20, 40, 50);
    scene.add(dirLight);

    const sunLight = new THREE.PointLight(0xffc857, 0.2, 500);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // 3. Solar System Parent Group (Hidden initially during pitch-black rocket sweep)
    const solarSystemGroup = new THREE.Group();
    solarSystemGroup.visible = false;
    solarSystemGroup.scale.set(0.1, 0.1, 0.1);
    scene.add(solarSystemGroup);

    // Central Star ("The Mind")
    const sunGeo = new THREE.SphereGeometry(12, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xffc857, wireframe: false });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    solarSystemGroup.add(sunMesh);

    // Sun Corona Glow
    const coronaGeo = new THREE.SphereGeometry(13.8, 32, 32);
    const coronaMat = new THREE.MeshBasicMaterial({ color: 0xff6b4a, transparent: true, opacity: 0.35 });
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    solarSystemGroup.add(coronaMesh);

    // Background Starfield
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
    solarSystemGroup.add(starPoints);

    // Planetary System Meshes & Orbits
    const planetMeshes = [];
    const orbitalRadii = [32, 50, 70, 92, 114, 136];

    PROJECTS_DATA.forEach((proj, idx) => {
      const radius = orbitalRadii[idx % orbitalRadii.length];
      const planetSize = (proj.weight / 100) * 4.2 + 2.5;

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
      solarSystemGroup.add(orbitLine);

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

      solarSystemGroup.add(mesh);
      planetMeshes.push(mesh);
    });

    // 4. Bold 3D Spacecraft & Curvy Trajectory Setup
    let rocketGroup = new THREE.Group();
    let flameMesh = null;
    let innerFlameMesh = null;
    let thrusterPointLight = null;
    let isLaunching = true;
    let launchStartTime = null;
    let launchAudioPlayed = false;
    let solarRevealed = false;

    // Mathematical 3D Curvy Arc: Swooping from bottom-left clearly in view into cosmic center
    const flightCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-36, -22, 10), // 1. Bottom-left visible
      new THREE.Vector3(-18, -6, 5),   // 2. Soaring upward
      new THREE.Vector3(2, 10, -5),    // 3. High arc across upper center
      new THREE.Vector3(20, 2, -28),   // 4. Banking into deep space
      new THREE.Vector3(0, 0, -90)     // 5. Diving into cosmic center (sun)
    ]);

    // Fuselage Body (High-contrast pearl white hull)
    const bodyGeo = new THREE.CylinderGeometry(1.6, 2.2, 14, 24);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      metalness: 0.15,
      roughness: 0.2,
      emissive: 0x1E2A4A,
      emissiveIntensity: 0.35
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    rocketGroup.add(bodyMesh);

    // Bold Aerodynamic Nose Cone (Stardust Gold)
    const noseGeo = new THREE.ConeGeometry(1.6, 5.5, 24);
    const noseMat = new THREE.MeshStandardMaterial({
      color: 0xFFC857,
      metalness: 0.2,
      roughness: 0.25,
      emissive: 0xFF9900,
      emissiveIntensity: 0.45
    });
    const noseMesh = new THREE.Mesh(noseGeo, noseMat);
    noseMesh.position.y = 9.75;
    rocketGroup.add(noseMesh);

    // Glowing Cockpit Visor (Cyan Plasma - MeshBasicMaterial guarantees 100% luminosity)
    const visorGeo = new THREE.SphereGeometry(1.3, 16, 16);
    visorGeo.scale(0.7, 1.5, 1.2);
    const visorMat = new THREE.MeshBasicMaterial({
      color: 0x00F5D4
    });
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.position.set(0, 4.8, 0.95);
    rocketGroup.add(visorMesh);

    // Swept Delta Stabilizer Wings (3 Symmetrical Fins in Cosmic Violet)
    for (let i = 0; i < 3; i++) {
      const angle = (i * 2 * Math.PI) / 3;
      const finGeo = new THREE.BoxGeometry(0.35, 5.5, 4.2);
      const finMat = new THREE.MeshStandardMaterial({
        color: 0x9D4EDD,
        metalness: 0.2,
        roughness: 0.3,
        emissive: 0x5A189A,
        emissiveIntensity: 0.35
      });
      const finMesh = new THREE.Mesh(finGeo, finMat);
      finMesh.position.set(Math.sin(angle) * 2.2, -5.2, Math.cos(angle) * 2.2);
      finMesh.rotation.y = angle;
      finMesh.rotation.x = 0.22;
      rocketGroup.add(finMesh);
    }

    // Exhaust Bell Nozzle
    const bellGeo = new THREE.CylinderGeometry(2.1, 1.4, 3.2, 24);
    const bellMat = new THREE.MeshStandardMaterial({
      color: 0x33384D,
      metalness: 0.4,
      roughness: 0.3
    });
    const bellMesh = new THREE.Mesh(bellGeo, bellMat);
    bellMesh.position.y = -8.2;
    rocketGroup.add(bellMesh);

    // Blazing Rocket Thruster Flame (Outer Solar Coral - MeshBasicMaterial is always bright!)
    const flameGeo = new THREE.ConeGeometry(2.1, 13.0, 24);
    flameGeo.rotateX(Math.PI);
    const flameMat = new THREE.MeshBasicMaterial({
      color: 0xFF5400,
      transparent: true,
      opacity: 0.92
    });
    flameMesh = new THREE.Mesh(flameGeo, flameMat);
    flameMesh.position.y = -14.2;
    rocketGroup.add(flameMesh);

    // Core White-Hot Heat Jet
    const innerFlameGeo = new THREE.ConeGeometry(1.15, 8.5, 16);
    innerFlameGeo.rotateX(Math.PI);
    const innerFlameMat = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: 1.0
    });
    innerFlameMesh = new THREE.Mesh(innerFlameGeo, innerFlameMat);
    innerFlameMesh.position.y = -12.0;
    rocketGroup.add(innerFlameMesh);

    // Dedicated PointLight on Rocket Engine (Warm rear glow)
    thrusterPointLight = new THREE.PointLight(0xFF6B4A, 6.0, 80);
    thrusterPointLight.position.y = -9;
    rocketGroup.add(thrusterPointLight);

    // Dedicated Hull Key Light (Ensures rocket is brilliantly illuminated at all times)
    const rocketKeyLight = new THREE.PointLight(0xFFFFFF, 3.5, 120);
    rocketKeyLight.position.set(8, 12, 16);
    rocketGroup.add(rocketKeyLight);

    // Initial placement at curve start (Bottom-left visible immediately)
    rocketGroup.position.copy(flightCurve.getPoint(0));
    scene.add(rocketGroup);

    // Skip handler: immediately reveals solar system
    const completeOrSkipLaunch = () => {
      if (!isLaunching && !rocketGroup) return;
      isLaunching = false;
      setIsIntroPlaying(false);

      solarSystemGroup.visible = true;
      solarSystemGroup.scale.set(1, 1, 1);
      sunLight.intensity = 3.5;

      if (rocketGroup) {
        scene.remove(rocketGroup);
        rocketGroup.traverse((obj) => {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
            else obj.material.dispose();
          }
        });
        rocketGroup = null;
      }

      camera.position.set(0, 110, 190);
      camera.lookAt(0, 0, 0);
    };

    skipIntroRef.current = completeOrSkipLaunch;

    // 5. Interaction: Orbit Dragging, Touch & Raycasting
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let touchStartPos = { x: 0, y: 0 };
    let isTouchDrag = false;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const getIntersectedProject = (coords) => {
      raycaster.setFromCamera(coords, camera);
      const intersects = raycaster.intersectObjects(planetMeshes, true);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const proj = hit.userData?.project || hit.parent?.userData?.project;
        const hitSphere = hit.userData?.project ? hit : (hit.parent || hit);
        return { hit: hitSphere, proj };
      }
      return null;
    };

    const handleMouseDown = (e) => {
      if (isLaunching) return;
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (isLaunching) return;
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
        const target = getIntersectedProject(mouse);
        if (target && target.proj) {
          const { proj } = target;
          if (hoveredSlugRef.current !== proj.slug) {
            hoveredSlugRef.current = proj.slug;
            setHoveredPlanetData(proj);
            onHoverRef.current?.(proj);
            sound.playHover();
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

    const handleTouchStart = (e) => {
      if (isLaunching) return;
      if (!e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
      touchStartPos = { x: touch.clientX, y: touch.clientY };
      prevMousePos = { x: touch.clientX, y: touch.clientY };
      isTouchDrag = false;

      const target = getIntersectedProject(mouse);
      if (target && target.proj) {
        const { proj } = target;
        if (hoveredSlugRef.current !== proj.slug) {
          hoveredSlugRef.current = proj.slug;
          setHoveredPlanetData(proj);
          onHoverRef.current?.(proj);
          sound.playHover();
        }
        isDragging = false;
      } else {
        if (hoveredSlugRef.current !== null) {
          hoveredSlugRef.current = null;
          setHoveredPlanetData(null);
          onHoverRef.current?.(null);
        }
        isDragging = true;
      }
    };

    const handleTouchMove = (e) => {
      if (isLaunching) return;
      if (!e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;

      const deltaX = touch.clientX - prevMousePos.x;
      const deltaY = touch.clientY - prevMousePos.y;
      const dist = Math.hypot(touch.clientX - touchStartPos.x, touch.clientY - touchStartPos.y);

      if (dist > 8) {
        isTouchDrag = true;
      }

      if (isDragging) {
        prevMousePos = { x: touch.clientX, y: touch.clientY };
        scene.rotation.y += deltaX * 0.005;
        scene.rotation.x = Math.max(-0.6, Math.min(0.6, scene.rotation.x + deltaY * 0.003));
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
      if (!isTouchDrag && hoveredSlugRef.current) {
        const target = getIntersectedProject(mouse);
        if (target && target.proj && target.proj.slug === hoveredSlugRef.current) {
          triggerLanding(target.hit, target.proj);
        }
      }
    };

    let targetCameraPos = null;
    let flyInTarget = null;

    const triggerLanding = (hitObject, proj) => {
      if (!proj || proj.unexplored) return;
      sound.playPlanetChord(proj.planetType);

      flyInTarget = proj;
      const worldPos = new THREE.Vector3();
      hitObject.getWorldPosition(worldPos);

      targetCameraPos = new THREE.Vector3(
        worldPos.x + 8,
        worldPos.y + 6,
        worldPos.z + 16
      );

      setTimeout(() => {
        onSelectRef.current?.(proj);
      }, 700);
    };

    const handleClick = () => {
      if (isLaunching) return;
      const target = getIntersectedProject(mouse);
      if (target && target.proj) {
        triggerLanding(target.hit, target.proj);
      }
    };

    const handleWheel = (e) => {
      if (isLaunching) return;
      camera.position.z = Math.max(90, Math.min(320, camera.position.z + e.deltaY * 0.15));
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    dom.addEventListener('click', handleClick);
    dom.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    dom.addEventListener('wheel', handleWheel, { passive: true });

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || 700;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 6. Animation Loop
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Rotate sun and corona inside solar system
      sunMesh.rotation.y += 0.004;
      coronaMesh.rotation.y -= 0.002;

      // Handle Curvy Rocket Motion across Pure Black Screen
      if (isLaunching && rocketGroup) {
        if (!launchStartTime) launchStartTime = performance.now();
        const elapsed = (performance.now() - launchStartTime) / 1000;
        const totalDuration = 3.2;

        if (!launchAudioPlayed) {
          launchAudioPlayed = true;
          sound.playRocketLaunch();
        }

        // Rocket progresses along curve from bottom-left (0.0 to 1.0)
        const progress = Math.min(1.0, elapsed / 2.3);

        // Smooth cubic ease-in-out progress
        const tEase = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        const pos = flightCurve.getPoint(tEase);
        const tangent = flightCurve.getTangent(tEase).normalize();

        rocketGroup.position.copy(pos);

        // Align rocket heading with curve tangent
        const defaultUp = new THREE.Vector3(0, 1, 0);
        const quat = new THREE.Quaternion().setFromUnitVectors(defaultUp, tangent);
        rocketGroup.quaternion.copy(quat);

        // Dynamic aeronautical banking roll as it carves the curve
        const bankRoll = Math.sin(tEase * Math.PI) * 0.85;
        rocketGroup.rotateOnAxis(defaultUp, bankRoll);

        // Dynamic plasma thruster pulse
        const flamePulse = 1.0 + Math.sin(performance.now() * 0.05) * 0.35;
        flameMesh.scale.set(1.15 * flamePulse, 1.45 * flamePulse, 1.15 * flamePulse);
        innerFlameMesh.scale.set(0.9 * flamePulse, 1.3 * flamePulse, 0.9 * flamePulse);

        // Camera tracks the rocket smoothly during flight
        if (progress < 0.88) {
          camera.position.x = pos.x * 0.2;
          camera.position.y = pos.y * 0.15;
          camera.position.z = 85 - (pos.z * -0.1);
          camera.lookAt(pos.x * 0.5, pos.y * 0.5, pos.z * 0.5);
        }

        // AT PROGRESS >= 0.88: SMOOTH SEAMLESS WIPE INTO THE SOLAR SYSTEM!
        if (progress >= 0.88 && !solarRevealed) {
          solarRevealed = true;
          solarSystemGroup.visible = true; // Solar system bursts into view!
        }

        // Solar system blossoms open and camera glides up into orbit view
        if (progress >= 0.88) {
          solarSystemGroup.scale.lerp(new THREE.Vector3(1, 1, 1), 0.08);
          sunLight.intensity = Math.min(3.5, sunLight.intensity + 0.18);
          camera.position.lerp(new THREE.Vector3(0, 110, 190), 0.075);
          camera.lookAt(0, 0, 0);
        }

        // Complete sequence when elapsed hits totalDuration
        if (elapsed >= totalDuration) {
          completeOrSkipLaunch();
        }
      }

      // Orbit planets once solar system is revealed
      if (solarSystemGroup.visible) {
        planetMeshes.forEach((mesh) => {
          const isTargeted =
            (hoveredSlugRef.current && hoveredSlugRef.current === mesh.userData.project.slug) ||
            (flyInTarget && flyInTarget.slug === mesh.userData.project.slug);

          if (!isTargeted) {
            mesh.userData.currentAngle += mesh.userData.orbitalSpeed;
            const angle = mesh.userData.currentAngle;
            const rad = mesh.userData.orbitalRadius;

            mesh.position.x = Math.cos(angle) * rad;
            mesh.position.z = Math.sin(angle) * rad * 0.8;
            mesh.rotation.y += 0.015;

            mesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
          } else {
            mesh.scale.lerp(new THREE.Vector3(1.18, 1.18, 1.18), 0.12);
          }
        });
      }

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
      dom.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      dom.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      if (container && container.contains(dom)) container.removeChild(dom);

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
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 'calc(100vh - 60px)', overflow: 'hidden', background: '#000000' }}>
      {/* Three.js Canvas Container (Contains the pure black void and 3D rocket) */}
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

      {/* Top-Right Discreet Skip Button during Intro (Zero HTML occlusion) */}
      {isIntroPlaying && (
        <button
          onClick={() => skipIntroRef.current?.()}
          title="Skip intro to solar system (Esc)"
          style={{
            position: 'absolute',
            top: '20px',
            right: '24px',
            zIndex: 50,
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#8A8FB0',
            borderRadius: '9999px',
            padding: '6px 16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.74rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            cursor: 'pointer',
            backdropFilter: 'blur(16px)',
            transition: 'all 160ms ease'
          }}
        >
          SKIP ⇥
        </button>
      )}

      {/* Floating HUD Telemetry Badge on Hover / Touch */}
      {!isIntroPlaying && hoveredPlanetData && (
        <div
          onClick={() => {
            if (!hoveredPlanetData.unexplored) {
              sound.playPlanetChord(hoveredPlanetData.planetType);
              onSelectRef.current?.(hoveredPlanetData);
            }
          }}
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(5, 6, 15, 0.94)',
            border: `1.5px solid ${hoveredPlanetData.primaryColor}`,
            boxShadow: `0 8px 32px rgba(0, 0, 0, 0.85), 0 0 24px ${hoveredPlanetData.glowColor}`,
            padding: '14px 28px',
            borderRadius: '10px',
            fontFamily: 'var(--font-mono)',
            textAlign: 'center',
            cursor: 'pointer',
            pointerEvents: 'auto',
            zIndex: 10,
            animation: 'fadeIn 200ms ease'
          }}
        >
          <div style={{ fontSize: '0.72rem', color: hoveredPlanetData.primaryColor, letterSpacing: '0.12em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span>SECTOR: {hoveredPlanetData.discipline.toUpperCase()}</span>
            <span style={{ color: 'var(--stardust-gold)' }}>// ORBIT LOCKED</span>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0' }}>
            {hoveredPlanetData.title}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--stardust-gold)' }}>
            ★ {hoveredPlanetData.oneLineOutcome}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--aurora-teal)', marginTop: '6px', fontWeight: 700, letterSpacing: '0.06em' }}>
            [CLICK / TAP TO INITIATE 3D SURFACE LANDING]
          </div>
        </div>
      )}

      {/* 3D Scene Interactive Overlay Controls (Displayed after intro) */}
      {!isIntroPlaying && (
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
          <span>TOUCH/HOVER PLANET TO HALT ORBIT • CLICK TO LAND • DRAG TO ROTATE</span>
        </div>
      )}
    </div>
  );
}
