import { useState, useCallback } from 'react'
import Preloader from './components/Preloader'
import Header from './components/Header'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import AboutPage from './pages/AboutPage'
import GalleryOverlay from './components/GalleryOverlay'
import Controls from './components/Controls'

import { portfolioData as categories } from './utils/portfolioData'

function App() {
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState('home') // home | category | about
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0)
  const [viewMode, setViewMode] = useState('arc') // arc | flat
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryImageIndex, setGalleryImageIndex] = useState(0)
  const [gridMode, setGridMode] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  const currentCategory = categories[currentCategoryIndex]

  const goNextCategory = useCallback(() => {
    setCurrentCategoryIndex((i) => (i + 1) % categories.length)
  }, [])

  const goPrevCategory = useCallback(() => {
    setCurrentCategoryIndex((i) => (i - 1 + categories.length) % categories.length)
  }, [])

  const openCategory = useCallback(() => {
    setCurrentPage('category')
    setGridMode(false)
  }, [])

  const goHome = useCallback(() => {
    setCurrentPage('home')
    setGalleryOpen(false)
    setGridMode(false)
    setContactOpen(false)
  }, [])

  const openAbout = useCallback(() => {
    setCurrentPage('about')
    setContactOpen(false)
  }, [])

  const openGallery = useCallback((index) => {
    setGalleryImageIndex(index)
    setGalleryOpen(true)
  }, [])

  const closeGallery = useCallback(() => {
    setGalleryOpen(false)
    setGridMode(true)
  }, [])

  const toggleViewMode = useCallback(() => {
    setViewMode((m) => (m === 'arc' ? 'flat' : 'arc'))
  }, [])

  const toggleGrid = useCallback(() => {
    setGridMode((g) => !g)
  }, [])

  const toggleContact = useCallback(() => {
    setContactOpen((c) => !c)
  }, [])

  return (
    <>
      <Preloader loading={loading} onComplete={() => setLoading(false)} />
      {!loading && (
        <div className="app">
          <Header onAboutClick={openAbout} currentPage={currentPage} />

          {currentPage === 'home' && (
            <Home
              categories={categories}
              currentCategoryIndex={currentCategoryIndex}
              viewMode={viewMode}
              onCylinderClick={openCategory}
              onNextCategory={goNextCategory}
              onPrevCategory={goPrevCategory}
              onCategorySelect={setCurrentCategoryIndex}
            />
          )}

          {currentPage === 'category' && !gridMode && (
            <CategoryPage
              category={currentCategory}
              categoryIndex={currentCategoryIndex}
              onImageClick={openGallery}
            />
          )}

          {currentPage === 'category' && gridMode && (
            <CategoryPage
              category={currentCategory}
              categoryIndex={currentCategoryIndex}
              onImageClick={openGallery}
              gridMode
            />
          )}

          {currentPage === 'about' && (
            <AboutPage
              contactOpen={contactOpen}
              onToggleContact={toggleContact}
            />
          )}

          {galleryOpen && (
            <GalleryOverlay
              categoryIndex={currentCategoryIndex}
              imageIndex={galleryImageIndex}
              onClose={closeGallery}
              onNext={() => {
                const len = categories[currentCategoryIndex]?.items?.length || 1
                setGalleryImageIndex((i) => (i + 1) % len)
              }}
              onPrev={() => {
                const len = categories[currentCategoryIndex]?.items?.length || 1
                setGalleryImageIndex((i) => (i - 1 + len) % len)
              }}
            />
          )}

          <Controls
            currentPage={currentPage}
            currentCategory={currentCategory}
            currentCategoryIndex={currentCategoryIndex}
            viewMode={viewMode}
            gridMode={gridMode}
            contactOpen={contactOpen}
            onPrev={goPrevCategory}
            onNext={goNextCategory}
            onToggleViewMode={toggleViewMode}
            onGoHome={goHome}
            onOpenCategory={openCategory}
            onToggleGrid={toggleGrid}
            onToggleContact={toggleContact}
          />
        </div>
      )}
    </>
  )
}

export default App
