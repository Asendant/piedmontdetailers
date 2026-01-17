import { useMemo, useState } from 'react'
import SEO from '../components/SEO'
import { loadGallery, saveGallery } from '../data/storage'
import { useStoredState } from '../hooks/useStoredState'
import type { PackageType } from '../types'

const packageLabels: PackageType[] = [
  'Interior Package',
  'Exterior Package',
  'Full Wash Package',
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
      title="Our Work Gallery"
      description="See examples of our car cleaning work. Filter by package type to see specific results."
      keywords="car cleaning gallery, detailing results, car detailing photos, mobile detailing gallery"
        url="/gallery"
      />
      <div className="flex flex-col gap-0">
      <section className="py-20 sm:py-12 md:py-16 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-sky-300/5 pointer-events-none" />
        <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight text-slate-800">
            Our Work
          </h1>
          <p className="text-lg sm:text-base md:text-lg text-slate-500 leading-relaxed max-w-3xl mb-8">
            See examples of our work. Filter by package type to see specific results.
          </p>
          <div className="mt-8 grid gap-4">
            <span className="font-bold text-slate-800 text-base">Filter:</span>
            <div className="flex flex-wrap gap-3">
              {['All', ...packageLabels].map((label) => (
                <button
                  key={label}
                  className={`border-2 rounded-full px-5 py-2.5 cursor-pointer font-semibold text-sm transition-all duration-300 ${
                    activeFilter === label
                      ? 'bg-gradient-to-br from-primary-500 to-primary-400 text-white border-primary-500 shadow-lg hover:from-primary-600 hover:to-primary-500 hover:-translate-y-0.5 hover:shadow-xl'
                      : 'bg-white border-primary-200 text-slate-600 hover:border-primary-400 hover:bg-primary-500/5 hover:text-slate-800 hover:-translate-y-0.5'
                  }`}
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

      <section className="py-20 sm:py-12 md:py-16">
        <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl overflow-hidden bg-gradient-to-br from-white to-slate-50 shadow-lg border-2 border-transparent flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-primary-200"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-[220px] sm:h-[200px] object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="p-6">
                  <span className="inline-block bg-gradient-to-br from-blue-100 to-cyan-100 text-primary-700 px-4 py-1.5 rounded-full text-xs font-bold mb-3 border border-primary-200 shadow-sm">
                    {item.packageType}
                  </span>
                  <h3 className="text-xl sm:text-lg md:text-xl font-bold text-slate-800 my-2 m-0">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed my-2 text-sm sm:text-xs md:text-sm m-0">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
            {filteredItems.length === 0 && (
              <div className="col-span-full text-center py-16 px-8 text-slate-500 bg-gradient-to-br from-slate-50 to-white rounded-3xl border-2 border-dashed border-primary-200">
                <p className="text-lg m-0">
                  {items.length === 0
                    ? 'No gallery images yet.'
                    : 'No images found for this filter. Try selecting a different package type.'}
                </p>
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
