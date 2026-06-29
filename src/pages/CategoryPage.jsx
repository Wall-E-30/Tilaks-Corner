import { useCategoryImages } from '../utils/imageGen'

export default function CategoryPage({ category, categoryIndex, onImageClick, gridMode }) {
  const images = useCategoryImages(categoryIndex)
  const categoryName = category?.name || 'Projects'

  if (gridMode) {
    return (
      <div className="grid-view">
        <div className="grid-view__container">
          {images.map((src, i) => (
            <div
              key={i}
              className="grid-view__item"
              style={{ animationDelay: `${0.1 + i * 0.06}s` }}
              onClick={() => onImageClick(i)}
            >
              <img src={src} alt={`${categoryName} ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="category-page">
      <h2 className="category-page__title">{categoryName}</h2>
      <div className="category-page__images">
        {images.map((src, i) => (
          <div
            key={i}
            className="category-page__img-wrapper"
            style={{ animationDelay: `${0.3 + i * 0.1}s` }}
            onClick={() => onImageClick(i)}
          >
            <img src={src} alt={`${categoryName} ${i + 1}`} />
            <div className="category-page__zoom-btn">ZOOM</div>
          </div>
        ))}
      </div>
    </div>
  )
}
