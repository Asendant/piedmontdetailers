import SEO from '../components/SEO'
import { loadVideos, saveVideos } from '../data/storage'
import { useStoredState } from '../hooks/useStoredState'

const Videos = () => {
  const [videos] = useStoredState(loadVideos, saveVideos)

  return (
    <>
      <SEO
        title="Detailing Video Gallery"
        description="Watch our process, techniques, and transformations across the Piedmont Triad. See how we bring vehicles back to showroom condition."
        keywords="detailing videos, car detailing process, before and after videos, mobile detailing videos, detailing techniques"
        url="/videos"
      />
      <div className="flex flex-col gap-0">
      <section className="py-20 sm:py-12 md:py-16 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-sky-300/5 pointer-events-none" />
        <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="uppercase tracking-widest text-xs sm:text-sm text-primary-500 mb-4 font-bold inline-block px-4 py-2 bg-primary-500/10 rounded-full border border-primary-500/20">
            Before & After Results
          </p>
          <h1 className="text-4xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight text-slate-800">
            Detailing Video Gallery
          </h1>
          <p className="text-lg sm:text-base md:text-lg text-slate-500 leading-relaxed max-w-3xl">
            Watch our process, techniques, and transformations across the
            Piedmont Triad. See how we bring vehicles back to showroom condition.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-12 md:py-16">
        <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {videos.map((video) => (
              <article
                key={video.id}
                className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 shadow-md border-2 border-transparent relative overflow-hidden transition-all duration-300 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-xl hover:border-primary-200 overflow-hidden"
              >
                <div className="relative pt-[56.25%] rounded-2xl overflow-hidden shadow-md transition-all duration-300 mb-4 hover:shadow-lg hover:scale-[1.02]">
                  <iframe
                    src={video.url}
                    title={video.title}
                    className="absolute inset-0 w-full h-full border-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="grid gap-3">
                  <h3 className="text-xl sm:text-lg md:text-xl font-bold text-slate-800 m-0">
                    {video.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed m-0 text-sm sm:text-xs md:text-sm">
                    {video.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

export default Videos
