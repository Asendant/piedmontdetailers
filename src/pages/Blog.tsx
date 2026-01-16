import { useState } from 'react'
import SEO from '../components/SEO'
import { loadBlogs } from '../data/storage'

const Blog = () => {
  const [posts] = useState(loadBlogs)

  return (
    <>
      <SEO
        title="Detailing Blog"
        description="Tips, guides, and insights from Piedmont Detailers. Learn how to keep your vehicle looking its best between details."
        keywords="car detailing blog, detailing tips, ceramic coating tips, paint correction advice, interior detailing guides"
        url="/blog"
      />
      <div className="flex flex-col gap-0">
        <section className="py-20 sm:py-12 md:py-16 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-sky-300/5 pointer-events-none" />
          <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <p className="uppercase tracking-widest text-xs sm:text-sm text-primary-500 mb-4 font-bold inline-block px-4 py-2 bg-primary-500/10 rounded-full border border-primary-500/20">
              Maintenance & Education
            </p>
            <h1 className="text-4xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight text-slate-800">
              The Piedmont Detailers Blog
            </h1>
            <p className="text-lg sm:text-base md:text-lg text-slate-500 leading-relaxed max-w-3xl">
              Short, practical tips to protect your paint, keep your interior fresh,
              and get more value out of every detail.
            </p>
          </div>
        </section>

        <section className="py-20 sm:py-12 md:py-16">
          <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length === 0 ? (
              <div className="text-center py-16 px-8 text-slate-500 bg-gradient-to-br from-slate-50 to-white rounded-3xl border-2 border-dashed border-primary-200">
                <p className="text-lg m-0">No blog posts yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="rounded-2xl overflow-hidden bg-gradient-to-br from-white to-slate-50 shadow-lg border-2 border-transparent flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-primary-200"
                  >
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-[200px] object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-[200px] bg-gradient-to-br from-primary-500/10 to-sky-300/10" />
                    )}
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-block bg-gradient-to-br from-blue-100 to-cyan-100 text-primary-700 px-3 py-1 rounded-full text-xs font-bold border border-primary-200 shadow-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl sm:text-lg md:text-xl font-bold text-slate-800 my-2 m-0">
                        {post.title}
                      </h3>
                      <p className="text-slate-500 leading-relaxed my-2 text-sm sm:text-xs md:text-sm m-0">
                        {post.excerpt}
                      </p>
                      <p className="text-slate-400 text-xs mt-4 m-0">
                        {post.date} • {post.author}
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

export default Blog

