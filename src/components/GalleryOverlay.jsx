import { useCategoryImages } from '../utils/imageGen'

export default function GalleryOverlay({ categoryIndex, imageIndex, onClose, onNext, onPrev }) {
  const images = useCategoryImages(categoryIndex)
  const src = images[imageIndex]

  return (
    <div className="gallery-overlay" onClick={onClose}>
      <div
        className="gallery-overlay__nav gallery-overlay__nav--prev"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
      >
        ←
      </div>

      <img
        className="gallery-overlay__image"
        src={src}
        alt={`Gallery image ${imageIndex + 1}`}
        onClick={(e) => e.stopPropagation()}
      />

      <div
        className="gallery-overlay__nav gallery-overlay__nav--next"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
      >
        →
      </div>

      <div className="gallery-overlay__close" onClick={onClose}>
        CLOSE
      </div>
    </div>
  )
}
