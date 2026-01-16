import { useMemo, useState } from 'react'
import SEO from '../components/SEO'
import { loadGallery, saveGallery } from '../data/storage'
import { useStoredState } from '../hooks/useStoredState'
import type { PackageType } from '../types'

const packageLabels: PackageType[] = [
  'Express Wash',
  'Full Detail',
  'Interior Deep Clean',
  'Paint Correction',
  'Ceramic Coating',
]

const Gallery = () => {
  const [items] = useStoredState(loadGallery, saveGallery)
  const [activeFilter, setActiveFilter] = useState<PackageType | 'All'>('All')

  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') {
      return items
    }
    return items.filter((item) => item.packageType === activeFilter)
  }, [activeFilter, items])

  return (
    <>
      <SEO
        title="Detailing Gallery - Before & After Results"
        description="Browse real results from our mobile detailing team across the Piedmont Triad. See the quality and attention to detail we bring to every vehicle."
        keywords="car detailing gallery, before and after detailing, detailing results, car detailing photos, mobile detailing gallery"
        url="/gallery"
      />
      <div className="page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Project Highlights</p>
          <h1>Gallery by Detail Package</h1>
          <p>
            Browse real results from our mobile detailing team across the
            Piedmont Triad. See the quality and attention to detail we bring to every vehicle.
          </p>
          <div className="filter-row">
            <span className="filter-label">Filter:</span>
            <div className="filter-group">
              {['All', ...packageLabels].map((label) => (
                <button
                  key={label}
                  className={
                    activeFilter === label
                      ? 'filter-button active'
                      : 'filter-button'
                  }
                  onClick={() =>
                    setActiveFilter(label as PackageType | 'All')
                  }
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="gallery-unified-grid">
            {filteredItems.map((item) => (
              <article key={item.id} className="gallery-card">
                <img src={item.imageUrl} alt={item.title} />
                <div className="gallery-body">
                  <span className="gallery-package-tag">{item.packageType}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
            {filteredItems.length === 0 && (
              <div className="gallery-empty">
                <p>No images found for this filter. Try selecting a different package type.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

export default Gallery
