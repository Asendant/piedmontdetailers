import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'
import { loadVideos } from '../data/storage'

const Videos = () => {
  const [videos] = useState(loadVideos)

  return (
    <>
      <Helmet>
        <title>Car Detailing Process Videos | Piedmont Detailers | Piedmont Detailers</title>
        <meta name="description" content="Watch our mobile car detailing process in action. See how we clean interiors, wash exteriors, and deliver professional results in the Piedmont Triad area." />
        <meta name="keywords" content="car detailing videos, mobile detailing process, detailing walkthrough, car cleaning videos, professional detailing videos" />
        <meta property="og:title" content="Car Detailing Process Videos | Piedmont Detailers" />
        <meta property="og:description" content="Watch our mobile car detailing process in action. See how we clean interiors, wash exteriors, and deliver professional results." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://piedmontdetailers.com/videos" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Car Detailing Process Videos | Piedmont Detailers" />
        <meta name="twitter:description" content="Watch our mobile car detailing process in action. See how we clean interiors, wash exteriors, and deliver professional results." />
        <link rel="canonical" href="https://piedmontdetailers.com/videos" />
      </Helmet>
      <SEO
        title="Car Detailing Process Videos | Piedmont Detailers"
        description="Watch our mobile car detailing process in action. See how we clean interiors, wash exteriors, and deliver professional results in the Piedmont Triad area."
        keywords="car detailing videos, mobile detailing process, detailing walkthrough, car cleaning videos, professional detailing videos"
        url="/videos"
      />
      <div className="flex flex-col gap-0">
        <section className="py-20 sm:py-12 md:py-16 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-sky-300/5 pointer-events-none" />
          <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <p className="uppercase tracking-widest text-xs sm:text-sm text-primary-500 mb-4 font-bold inline-block px-4 py-2 bg-primary-500/10 rounded-full border border-primary-500/20">
              Process & Results
            </p>
            <h1 className="text-4xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight text-slate-800">
              Videos
            </h1>
            <p className="text-lg sm:text-base md:text-lg text-slate-500 leading-relaxed max-w-3xl">
              Quick clips that show what goes into a proper detail—and the results you can expect.
            </p>
          </div>
        </section>

        <section className="py-20 sm:py-12 md:py-16">
          <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
            {videos.length === 0 ? (
              <div className="text-center py-16 px-8 text-slate-500 bg-gradient-to-br from-slate-50 to-white rounded-3xl border-2 border-dashed border-primary-200">
                <p className="text-lg m-0">No videos yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {videos.map((video) => (
                  <article
                    key={video.id}
                    className="rounded-2xl overflow-hidden bg-gradient-to-br from-white to-slate-50 shadow-lg border-2 border-transparent flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-primary-200"
                  >
                    <div className="w-full aspect-video bg-black">
                      <iframe
                        className="w-full h-full"
                        src={video.url}
                        title={video.title}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl sm:text-lg md:text-xl font-bold text-slate-800 my-2 m-0">
                        {video.title}
                      </h3>
                      <p className="text-slate-500 leading-relaxed my-2 text-sm sm:text-xs md:text-sm m-0">
                        {video.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}

export default Videos

