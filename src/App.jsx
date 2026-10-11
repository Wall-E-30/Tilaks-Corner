import { useState, useEffect, useCallback } from 'react';
import MissionControl from './components/MissionControl';
import AstronautGuide from './components/AstronautGuide';
import ShootingStars from './components/ShootingStars';
import WarpTransition from './components/WarpTransition';
import CursorShip from './components/CursorShip';
import QuickTourOverlay from './components/QuickTourOverlay';
import RocketLaunchIntro from './components/RocketLaunchIntro';

import HomePage from './pages/HomePage';
import FastLanePage from './pages/FastLanePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ConstellationPage from './pages/ConstellationPage';
import CockpitSkillsPage from './pages/CockpitSkillsPage';
import AboutAstronautPage from './pages/AboutAstronautPage';
import LabExperimentsPage from './pages/LabExperimentsPage';
import CuriosityPage from './pages/CuriosityPage';
import OrbitAmbitionsPage from './pages/OrbitAmbitionsPage';
import ContactTransmissionPage from './pages/ContactTransmissionPage';
import SecretSignalPage from './pages/SecretSignalPage';
import NotFoundPage from './pages/NotFoundPage';

import { sound } from './utils/audioEngine';
import { PROJECTS_DATA } from './utils/mindverseData';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProjectSlug, setSelectedProjectSlug] = useState(null);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [theme, setTheme] = useState('void'); // 'void' | 'eclipse'
  const [soundActive, setSoundActive] = useState(false);
  const [isWarping, setIsWarping] = useState(false);
  const [quickTourActive, setQuickTourActive] = useState(false);
  const [caughtStarsCount, setCaughtStarsCount] = useState(0);
  const [showRocketLaunch, setShowRocketLaunch] = useState(false);

  // Initialize caught stars from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mindverse_stars_count');
      if (saved) setCaughtStarsCount(parseInt(saved, 10) || 0);
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Sync with browser URL / history on initial load and popstate
  const syncRouteFromPath = useCallback(() => {
    const path = window.location.pathname.replace(/\/+$/, '') || '/';
    if (path === '/' || path === '') {
      setCurrentPage('home');
      setSelectedProjectSlug(null);
    } else if (path === '/fast-lane') {
      setCurrentPage('fast-lane');
    } else if (path === '/projects') {
      setCurrentPage('projects');
      setSelectedProjectSlug(null);
    } else if (path.startsWith('/projects/')) {
      const slug = path.split('/projects/')[1];
      setCurrentPage('project-detail');
      setSelectedProjectSlug(slug);
    } else if (path === '/constellation') {
      setCurrentPage('constellation');
    } else if (path === '/skills') {
      setCurrentPage('skills');
    } else if (path === '/about') {
      setCurrentPage('about');
    } else if (path === '/lab' || path === '/lab/moon') {
      setCurrentPage('lab');
    } else if (path === '/curiosity') {
      setCurrentPage('curiosity');
    } else if (path === '/orbit') {
      setCurrentPage('orbit');
    } else if (path === '/contact') {
      setCurrentPage('contact');
    } else if (path === '/secret-signal') {
      setCurrentPage('secret-signal');
    } else {
      setCurrentPage('404');
    }
  }, []);

  useEffect(() => {
    syncRouteFromPath();
    window.addEventListener('popstate', syncRouteFromPath);
    return () => window.removeEventListener('popstate', syncRouteFromPath);
  }, [syncRouteFromPath]);

  // Page navigation helper with optional warp effect and history push
  const navigateTo = useCallback((targetPage, slug = null, skipWarp = false) => {
    let newPath = '/';
    let newPage = targetPage;

    if (targetPage === 'home') {
      newPath = '/';
    } else if (targetPage === 'fast-lane') {
      newPath = '/fast-lane';
    } else if (targetPage === 'projects') {
      newPath = '/projects';
    } else if (targetPage === 'project-detail' || targetPage.startsWith('project-')) {
      const projectSlug = slug || targetPage.replace('project-', '');
      newPath = `/projects/${projectSlug}`;
      newPage = 'project-detail';
      setSelectedProjectSlug(projectSlug);
    } else {
      newPath = `/${targetPage}`;
    }

    if (window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
    }

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!skipWarp && !prefersReducedMotion && targetPage !== 'fast-lane' && currentPage !== targetPage) {
      sound.playWarp();
      setIsWarping(true);
      setTimeout(() => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 350);
    } else {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  // Theme toggle
  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'void' ? 'eclipse' : 'void';
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });
  }, []);

  // Sound toggle
  const toggleSound = useCallback(() => {
    const active = sound.toggle();
    setSoundActive(active);
  }, []);

  // Star caught handler
  const handleStarCaught = useCallback(() => {
    setCaughtStarsCount((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem('mindverse_stars_count', String(next));
      } catch {}
      return next;
    });
  }, []);

  // Secret Easter Egg: typing "houston" anywhere navigates to Contact (PRD page 16)
  useEffect(() => {
    let keyBuffer = '';
    const handleKeyDown = (e) => {
      // Don't intercept when user is typing in form inputs
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'Escape') {
        setIsWarping(false);
        setQuickTourActive(false);
      }

      keyBuffer = (keyBuffer + e.key.toLowerCase()).slice(-7);
      if (keyBuffer === 'houston') {
        sound.playWarp();
        navigateTo('contact');
        keyBuffer = '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigateTo]);

  const handleSelectProject = useCallback((proj) => {
    navigateTo('project-detail', proj.slug);
  }, [navigateTo]);

  // Find active project if on project-detail
  const currentProject = PROJECTS_DATA.find((p) => p.slug === (selectedProjectSlug || 'pratyaksha')) || PROJECTS_DATA[0];

  return (
    <div className={`mindverse-app ${currentPage === 'fast-lane' ? 'fast-lane-active' : 'custom-cursor-active'}`}>
      {/* Opening Cinematic Rocket Liftoff */}
      {showRocketLaunch && (
        <RocketLaunchIntro
          onLaunchComplete={() => setShowRocketLaunch(false)}
        />
      )}

      {/* Film Grain Texture Overlay */}
      <div className="film-grain" />

      {/* Warp Jump Transition Effect */}
      <WarpTransition
        isWarping={isWarping}
        onWarpComplete={() => setIsWarping(false)}
      />

      {/* Desktop Spaceship Cursor (Disabled in Fast Lane & on Form inputs) */}
      <CursorShip
        isEnabled={currentPage !== 'fast-lane'}
        isTelescope={currentPage === 'lab'}
      />

      {/* Persistent Mission Control HUD Header & Minimap */}
      <MissionControl
        currentPage={currentPage}
        onNavigate={navigateTo}
        theme={theme}
        onToggleTheme={toggleTheme}
        soundActive={soundActive}
        onToggleSound={toggleSound}
        caughtStarsCount={caughtStarsCount}
      />

      {/* Shooting Stars Trivia System (Always active except during Fast Lane) */}
      {currentPage !== 'fast-lane' && (
        <ShootingStars
          caughtCount={caughtStarsCount}
          onStarCaught={handleStarCaught}
          onNavigate={navigateTo}
        />
      )}

      {/* Floating Astronaut Mascot Guide */}
      <AstronautGuide
        hoveredPlanet={hoveredPlanet}
        currentPage={currentPage}
        onTriggerQuickTour={() => setQuickTourActive(true)}
      />

      {/* 60-Second Quick Tour Coordinator */}
      {quickTourActive && (
        <QuickTourOverlay
          onNavigate={(target) => navigateTo(target, null, true)}
          onComplete={() => {
            setQuickTourActive(false);
            navigateTo('home');
          }}
        />
      )}

      {/* Page Routing */}
      <main id="main-content" role="main">
        {currentPage === 'home' && (
          <HomePage
            onSelectProject={handleSelectProject}
            onHoverPlanet={setHoveredPlanet}
            onNavigate={navigateTo}
            onStartQuickTour={() => setQuickTourActive(true)}
            onRelaunchRocket={() => setShowRocketLaunch(true)}
          />
        )}

        {currentPage === 'fast-lane' && (
          <FastLanePage
            onSelectProject={(proj) => navigateTo('project-detail', proj.slug)}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'projects' && (
          <HomePage
            onSelectProject={(proj) => navigateTo('project-detail', proj.slug)}
            onHoverPlanet={setHoveredPlanet}
            onNavigate={navigateTo}
            onStartQuickTour={() => setQuickTourActive(true)}
          />
        )}

        {currentPage === 'project-detail' && (
          <ProjectDetailPage
            project={currentProject}
            onNavigate={navigateTo}
            onSelectProject={(proj) => navigateTo('project-detail', proj.slug)}
          />
        )}

        {currentPage === 'constellation' && (
          <ConstellationPage
            onSelectProject={(proj) => navigateTo('project-detail', proj.slug)}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'skills' && (
          <CockpitSkillsPage
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'about' && (
          <AboutAstronautPage
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'lab' && (
          <LabExperimentsPage
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'curiosity' && (
          <CuriosityPage
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'orbit' && (
          <OrbitAmbitionsPage
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'contact' && (
          <ContactTransmissionPage
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'secret-signal' && (
          <SecretSignalPage
            onNavigate={navigateTo}
          />
        )}

        {currentPage === '404' && (
          <NotFoundPage
            onNavigate={navigateTo}
          />
        )}
      </main>
    </div>
  );
}
