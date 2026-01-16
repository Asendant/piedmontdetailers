import { useState } from 'react'
import SEO from '../components/SEO'
import { loadBlogs, saveBlogs } from '../data/storage'
import { useStoredState } from '../hooks/useStoredState'
import type { BlogPost } from '../types'

const Blog = () => {
  const [posts] = useStoredState(loadBlogs, saveBlogs)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  return (
    <>
      <SEO
        title="Detailing Tips & Blog"
        description="Learn how to keep your vehicle protected between services and stay up to date on new offerings, techniques, and best practices from our detailing team."
        keywords="car detailing tips, car care blog, auto detailing advice, vehicle maintenance tips, detailing best practices"
        url="/blog"
      />
      <div className="flex flex-col gap-0">
      <section className="py-20 sm:py-12 md:py-16 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-sky-300/5 pointer-events-none" />
        <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="uppercase tracking-widest text-xs sm:text-sm text-primary-500 mb-4 font-bold inline-block px-4 py-2 bg-primary-500/10 rounded-full border border-primary-500/20">
            Detailing Tips & Updates
          </p>
          <h1 className="text-4xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight text-slate-800">
            From Our Detailing Team
          </h1>
          <p className="text-lg sm:text-base md:text-lg text-slate-500 leading-relaxed max-w-3xl">
            Learn how to keep your vehicle protected between services and stay
            up to date on new offerings, techniques, and best practices.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-12 md:py-16">
        <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 shadow-md border-2 border-transparent relative overflow-hidden transition-all duration-300 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-xl hover:border-primary-200 cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="absolute top-0 left-0 right-0 h-0.75 bg-gradient-to-r from-primary-500 via-primary-400 to-sky-300 scale-x-0 origin-left transition-transform duration-300 hover:scale-x-100" />
                {post.coverImage ? (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-[220px] sm:h-[180px] object-cover rounded-2xl transition-transform duration-300 mb-4 hover:scale-105"
                  />
                ) : null}
                <div className="grid gap-4">
                  <div className="flex gap-2.5 text-sm text-slate-500 font-medium">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.author}</span>
                  </div>
                  <h3 className="text-2xl sm:text-xl md:text-2xl font-bold text-slate-800 leading-tight m-0">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed m-0 text-base sm:text-sm md:text-base">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gradient-to-br from-blue-100 to-cyan-100 text-primary-700 rounded-full px-4 py-1.5 text-xs sm:text-xs md:text-sm font-semibold border border-primary-200 transition-all duration-300 shadow-sm hover:from-blue-200 hover:to-cyan-200 hover:-translate-y-0.5 hover:shadow-md hover:border-primary-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="bg-transparent border-none text-sky-300 font-semibold cursor-pointer p-0 mt-2 text-left transition-colors duration-200 hover:text-sky-400">
                    Read full post →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedPost && (
        <div
          className="fixed inset-0 bg-black/75 flex items-center justify-center z-[1000] p-8 sm:p-2 backdrop-blur-sm animate-[fadeIn_0.3s_ease] overflow-y-auto"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-gradient-to-br from-white to-slate-50 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative m-auto shadow-2xl border-2 border-white/20 animate-[slideUp_0.3s_ease]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-6 right-6 sm:top-3 sm:right-3 bg-white/90 border-2 border-primary-200 w-12 h-12 sm:w-9 sm:h-9 rounded-full text-2xl sm:text-lg cursor-pointer text-slate-800 flex items-center justify-center transition-all duration-300 z-10 shadow-md hover:bg-white hover:border-primary-500 hover:rotate-90 hover:shadow-lg font-light leading-none"
              onClick={() => setSelectedPost(null)}
            >
              ×
            </button>
            {selectedPost.coverImage && (
              <img
                src={selectedPost.coverImage}
                alt={selectedPost.title}
                className="w-full h-[350px] sm:h-[200px] object-cover rounded-t-3xl"
              />
            )}
            <div className="p-10 sm:p-6">
              <div className="flex gap-2.5 text-sm text-slate-500 font-medium mb-4">
                <span>{selectedPost.date}</span>
                <span>•</span>
                <span>{selectedPost.author}</span>
              </div>
              <h2 className="my-6 text-slate-800 text-3xl sm:text-2xl md:text-3xl font-extrabold leading-tight">
                {selectedPost.title}
              </h2>
              <p className="text-xl sm:text-base md:text-lg text-slate-500 my-6 font-medium leading-relaxed">
                {selectedPost.excerpt}
              </p>
              <p className="text-slate-700 leading-relaxed my-8 text-base sm:text-sm md:text-base">
                {selectedPost.content}
              </p>
              <div className="flex flex-wrap gap-3">
                {selectedPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gradient-to-br from-blue-100 to-cyan-100 text-primary-700 rounded-full px-4 py-1.5 text-xs sm:text-xs md:text-sm font-semibold border border-primary-200 transition-all duration-300 shadow-sm hover:from-blue-200 hover:to-cyan-200 hover:-translate-y-0.5 hover:shadow-md hover:border-primary-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  )
}

export default Blog
