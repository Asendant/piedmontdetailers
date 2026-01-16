import { useState } from 'react'
import { loadBlogs, saveBlogs } from '../data/storage'
import { useStoredState } from '../hooks/useStoredState'
import type { BlogPost } from '../types'

const Blog = () => {
  const [posts] = useStoredState(loadBlogs, saveBlogs)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  return (
    <div className="page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Detailing Tips & Updates</p>
          <h1>From Our Detailing Team</h1>
          <p>
            Learn how to keep your vehicle protected between services and stay
            up to date on new offerings, techniques, and best practices.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container grid blog-grid">
          {posts.map((post) => (
            <article 
              key={post.id} 
              className="card blog-card"
              onClick={() => setSelectedPost(post)}
              style={{ cursor: 'pointer' }}
            >
              {post.coverImage ? (
                <img src={post.coverImage} alt={post.title} />
              ) : null}
              <div className="blog-body">
                <div className="blog-meta">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.author}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="tag-row">
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="blog-read-more">Read full post →</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedPost && (
        <div className="blog-modal-overlay" onClick={() => setSelectedPost(null)}>
          <div className="blog-modal" onClick={(e) => e.stopPropagation()}>
            <button className="blog-modal-close" onClick={() => setSelectedPost(null)}>×</button>
            {selectedPost.coverImage && (
              <img src={selectedPost.coverImage} alt={selectedPost.title} className="blog-modal-image" />
            )}
            <div className="blog-modal-content">
              <div className="blog-meta">
                <span>{selectedPost.date}</span>
                <span>•</span>
                <span>{selectedPost.author}</span>
              </div>
              <h2>{selectedPost.title}</h2>
              <p className="blog-modal-excerpt">{selectedPost.excerpt}</p>
              <p className="blog-modal-body">{selectedPost.content}</p>
              <div className="tag-row">
                {selectedPost.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog
