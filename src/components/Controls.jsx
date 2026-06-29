import { useMemo } from 'react'
import { useCategoryImages } from '../utils/imageGen'

export default function Controls({
  currentPage,
  currentCategory,
  currentCategoryIndex,
  viewMode,
  gridMode,
  contactOpen,
  onPrev,
  onNext,
  onToggleViewMode,
  onGoHome,
  onOpenCategory,
  onToggleGrid,
  onToggleContact,
}) {
  const images = useCategoryImages(currentCategoryIndex)
  const thumbSrc = images[0] || ''

  // HOME page controls
  if (currentPage === 'home') {
    return (
      <div className="controls">
        {/* Main pill: thumb + category name + arrows */}
        <div className="pill" onClick={onOpenCategory}>
          <div className="pill__thumb">
            {thumbSrc && <img src={thumbSrc} alt="" />}
          </div>
          <span className="pill__label">{currentCategory?.name?.toUpperCase() || 'PROJECTS'}</span>
          <div className="pill__arrows">
            <div className="pill__arrow" onClick={(e) => { e.stopPropagation(); onPrev(); }}>←</div>
            <div className="pill__arrow" onClick={(e) => { e.stopPropagation(); onNext(); }}>→</div>
          </div>
        </div>

        {/* Mode toggle pill */}
        <div className="pill pill--circle" onClick={onToggleViewMode} title={viewMode === 'arc' ? 'Switch to flat' : 'Switch to arc'}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {viewMode === 'arc' ? (
              <>
                <path d="M4 12a8 8 0 0 1 16 0" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              </>
            ) : (
              <>
                <rect x="3" y="6" width="18" height="12" rx="2" />
                <line x1="3" y1="12" x2="21" y2="12" />
              </>
            )}
          </svg>
        </div>
      </div>
    )
  }

  // CATEGORY page controls
  if (currentPage === 'category') {
    return (
      <div className="controls">
        {/* Back arrow */}
        <div className="pill pill--circle" onClick={onGoHome} title="Back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </div>

        {/* Category pill */}
        <div className="pill">
          <div className="pill__thumb">
            {thumbSrc && <img src={thumbSrc} alt="" />}
          </div>
          <span className="pill__label">{gridMode ? 'GRID' : 'GALLERY'}</span>
        </div>

        {/* Grid/Layout toggle */}
        <div className="pill" onClick={onToggleGrid} style={{ paddingLeft: 14, paddingRight: 14 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {gridMode ? (
              <>
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
          <span className="pill__label">{gridMode ? 'LAYOUT' : 'GRID'}</span>
        </div>
      </div>
    )
  }

  // ABOUT page controls
  if (currentPage === 'about') {
    return (
      <div className="controls">
        {/* Back arrow */}
        <div className="pill pill--circle" onClick={onGoHome} title="Back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </div>

        {/* Profile pill */}
        <div className="pill">
          <div className="pill__thumb">
            {thumbSrc && <img src={thumbSrc} alt="" />}
          </div>
          <span className="pill__label">PROFILE</span>
        </div>

        {/* Contact toggle */}
        <div className="pill" onClick={onToggleContact} style={{ paddingLeft: 14, paddingRight: 14 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </div>
      </div>
    )
  }

  return null
}
