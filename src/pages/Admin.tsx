import { useState } from 'react'
import {
  loadBlogs,
  loadGallery,
  loadVideos,
  saveBlogs,
  saveGallery,
  saveVideos,
} from '../data/storage'
import { useStoredState } from '../hooks/useStoredState'
import type { BlogPost, GalleryItem, PackageType, VideoItem } from '../types'

const packageOptions: PackageType[] = [
  'Express Wash',
  'Full Detail',
  'Interior Deep Clean',
  'Paint Correction',
  'Ceramic Coating',
]

const createId = (prefix: string) =>
  `${prefix}-${typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : Date.now().toString(36)}`

const getEmbedUrl = (rawUrl: string) => {
  if (!rawUrl) {
    return ''
  }
  if (rawUrl.includes('youtube.com/embed')) {
    return rawUrl
  }
  const youtubeMatch =
    rawUrl.match(/v=([^&]+)/) || rawUrl.match(/youtu\.be\/([^?]+)/)
  if (youtubeMatch?.[1]) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`
  }
  return rawUrl
}

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error('Unable to read file'))
    reader.readAsDataURL(file)
  })

const Admin = () => {
  const [galleryItems, setGalleryItems] = useStoredState(loadGallery, saveGallery)
  const [blogPosts, setBlogPosts] = useStoredState(loadBlogs, saveBlogs)
  const [videoItems, setVideoItems] = useStoredState(loadVideos, saveVideos)

  const [galleryForm, setGalleryForm] = useState({
    title: '',
    packageType: packageOptions[0],
    imageUrl: '',
    description: '',
  })
  const [blogForm, setBlogForm] = useState({
    title: '',
    author: 'Piedmont Detailers',
    excerpt: '',
    content: '',
    tags: '',
    coverImage: '',
  })
  const [videoForm, setVideoForm] = useState({
    title: '',
    url: '',
    thumbnailUrl: '',
    description: '',
  })

  const galleryCount = galleryItems.length
  const blogCount = blogPosts.length
  const videoCount = videoItems.length

  return (
    <div className="page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Admin tools</p>
          <h1>Manage gallery, blog, and videos</h1>
          <p>
            Add new content in seconds. Everything is stored locally on this
            device for easy updates.
          </p>
          <div className="tag-row">
            <span className="tag">Gallery: {galleryCount}</span>
            <span className="tag">Blog posts: {blogCount}</span>
            <span className="tag">Videos: {videoCount}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container admin-grid">
          <div className="admin-card">
            <div className="admin-card-header">
              <h3>📸 Gallery Images</h3>
            </div>
            <div className="admin-card-body">
              <form
                className="admin-form"
                onSubmit={(event) => {
                  event.preventDefault()
                  if (!galleryForm.title || !galleryForm.imageUrl) {
                    return
                  }
                  const newItem: GalleryItem = {
                    id: createId('gallery'),
                    title: galleryForm.title,
                    packageType: galleryForm.packageType,
                    imageUrl: galleryForm.imageUrl,
                    description: galleryForm.description,
                  }
                  setGalleryItems([newItem, ...galleryItems])
                  setGalleryForm({
                    title: '',
                    packageType: packageOptions[0],
                    imageUrl: '',
                    description: '',
                  })
                }}
              >
                <label>
                  Title *
                  <input
                    type="text"
                    value={galleryForm.title}
                    onChange={(event) =>
                      setGalleryForm({ ...galleryForm, title: event.target.value })
                    }
                    required
                    placeholder="e.g., 2020 Toyota Camry Full Detail"
                  />
                </label>
                <label>
                  Package Type
                  <select
                    value={galleryForm.packageType}
                    onChange={(event) =>
                      setGalleryForm({
                        ...galleryForm,
                        packageType: event.target.value as PackageType,
                      })
                    }
                  >
                    {packageOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Image URL *
                  <input
                    type="url"
                    value={galleryForm.imageUrl}
                    onChange={(event) =>
                      setGalleryForm({
                        ...galleryForm,
                        imageUrl: event.target.value,
                      })
                    }
                    placeholder="https://example.com/image.jpg"
                  />
                </label>
                <label>
                  Or upload image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (event) => {
                      const file = event.target.files?.[0]
                      if (!file) {
                        return
                      }
                      const dataUrl = await fileToDataUrl(file)
                      setGalleryForm({ ...galleryForm, imageUrl: dataUrl })
                    }}
                  />
                </label>
                <label>
                  Description
                  <textarea
                    rows={3}
                    value={galleryForm.description}
                    onChange={(event) =>
                      setGalleryForm({
                        ...galleryForm,
                        description: event.target.value,
                      })
                    }
                    placeholder="Brief description of the work performed..."
                  />
                </label>
                <button className="btn btn-primary" type="submit">
                  Add Gallery Image
                </button>
              </form>
              <div className="admin-form-section">
                <div className="admin-form-section-title">
                  Existing Images ({galleryItems.length})
                </div>
                <div className="admin-list">
                  {galleryItems.length === 0 ? (
                    <div className="admin-list-empty">
                      No gallery images yet. Add your first image above!
                    </div>
                  ) : (
                    galleryItems.map((item) => (
                      <div key={item.id} className="admin-list-item">
                        <span>{item.title}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setGalleryItems(
                              galleryItems.filter((entry) => entry.id !== item.id),
                            )
                          }
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-card-header">
              <h3>✍️ Blog Posts</h3>
            </div>
            <div className="admin-card-body">
              <form
                className="admin-form"
                onSubmit={(event) => {
                  event.preventDefault()
                  if (!blogForm.title || !blogForm.excerpt) {
                    return
                  }
                  const newPost: BlogPost = {
                    id: createId('blog'),
                    title: blogForm.title,
                    excerpt: blogForm.excerpt,
                    content: blogForm.content,
                    date: new Date().toISOString().split('T')[0],
                    author: blogForm.author,
                    tags: blogForm.tags
                      .split(',')
                      .map((tag) => tag.trim())
                      .filter(Boolean),
                    coverImage: blogForm.coverImage || undefined,
                  }
                  setBlogPosts([newPost, ...blogPosts])
                  setBlogForm({
                    title: '',
                    author: 'Piedmont Detailers',
                    excerpt: '',
                    content: '',
                    tags: '',
                    coverImage: '',
                  })
                }}
              >
                <label>
                  Title *
                  <input
                    type="text"
                    value={blogForm.title}
                    onChange={(event) =>
                      setBlogForm({ ...blogForm, title: event.target.value })
                    }
                    required
                    placeholder="e.g., 5 Tips for Maintaining Your Car's Shine"
                  />
                </label>
                <label>
                  Author
                  <input
                    type="text"
                    value={blogForm.author}
                    onChange={(event) =>
                      setBlogForm({ ...blogForm, author: event.target.value })
                    }
                    placeholder="Piedmont Detailers"
                  />
                </label>
                <label>
                  Excerpt *
                  <textarea
                    rows={2}
                    value={blogForm.excerpt}
                    onChange={(event) =>
                      setBlogForm({ ...blogForm, excerpt: event.target.value })
                    }
                    required
                    placeholder="A brief summary that appears in the blog listing..."
                  />
                </label>
                <label>
                  Full Content
                  <textarea
                    rows={6}
                    value={blogForm.content}
                    onChange={(event) =>
                      setBlogForm({ ...blogForm, content: event.target.value })
                    }
                    placeholder="The full blog post content..."
                  />
                </label>
                <label>
                  Tags (comma separated)
                  <input
                    type="text"
                    value={blogForm.tags}
                    onChange={(event) =>
                      setBlogForm({ ...blogForm, tags: event.target.value })
                    }
                    placeholder="detailing, tips, maintenance"
                  />
                </label>
                <label>
                  Cover Image URL
                  <input
                    type="url"
                    value={blogForm.coverImage}
                    onChange={(event) =>
                      setBlogForm({ ...blogForm, coverImage: event.target.value })
                    }
                    placeholder="https://example.com/cover-image.jpg"
                  />
                </label>
                <button className="btn btn-primary" type="submit">
                  Add Blog Post
                </button>
              </form>
              <div className="admin-form-section">
                <div className="admin-form-section-title">
                  Existing Posts ({blogPosts.length})
                </div>
                <div className="admin-list">
                  {blogPosts.length === 0 ? (
                    <div className="admin-list-empty">
                      No blog posts yet. Create your first post above!
                    </div>
                  ) : (
                    blogPosts.map((post) => (
                      <div key={post.id} className="admin-list-item">
                        <span>{post.title}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setBlogPosts(
                              blogPosts.filter((entry) => entry.id !== post.id),
                            )
                          }
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-card-header">
              <h3>🎥 Videos</h3>
            </div>
            <div className="admin-card-body">
              <form
                className="admin-form"
                onSubmit={(event) => {
                  event.preventDefault()
                  if (!videoForm.title || !videoForm.url) {
                    return
                  }
                  const newVideo: VideoItem = {
                    id: createId('video'),
                    title: videoForm.title,
                    url: getEmbedUrl(videoForm.url),
                    thumbnailUrl:
                      videoForm.thumbnailUrl ||
                      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
                    description: videoForm.description,
                  }
                  setVideoItems([newVideo, ...videoItems])
                  setVideoForm({
                    title: '',
                    url: '',
                    thumbnailUrl: '',
                    description: '',
                  })
                }}
              >
                <label>
                  Title *
                  <input
                    type="text"
                    value={videoForm.title}
                    onChange={(event) =>
                      setVideoForm({ ...videoForm, title: event.target.value })
                    }
                    required
                    placeholder="e.g., Full Detail Transformation - 2020 Camry"
                  />
                </label>
                <label>
                  Video URL (YouTube or Vimeo) *
                  <input
                    type="url"
                    value={videoForm.url}
                    onChange={(event) =>
                      setVideoForm({ ...videoForm, url: event.target.value })
                    }
                    required
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  <small style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>
                    Paste any YouTube or Vimeo URL - we'll convert it automatically
                  </small>
                </label>
                <label>
                  Thumbnail URL (optional)
                  <input
                    type="url"
                    value={videoForm.thumbnailUrl}
                    onChange={(event) =>
                      setVideoForm({
                        ...videoForm,
                        thumbnailUrl: event.target.value,
                      })
                    }
                    placeholder="https://example.com/thumbnail.jpg"
                  />
                  <small style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>
                    Leave empty to use default thumbnail
                  </small>
                </label>
                <label>
                  Description
                  <textarea
                    rows={3}
                    value={videoForm.description}
                    onChange={(event) =>
                      setVideoForm({
                        ...videoForm,
                        description: event.target.value,
                      })
                    }
                    placeholder="Brief description of the video content..."
                  />
                </label>
                <button className="btn btn-primary" type="submit">
                  Add Video
                </button>
              </form>
              <div className="admin-form-section">
                <div className="admin-form-section-title">
                  Existing Videos ({videoItems.length})
                </div>
                <div className="admin-list">
                  {videoItems.length === 0 ? (
                    <div className="admin-list-empty">
                      No videos yet. Add your first video above!
                    </div>
                  ) : (
                    videoItems.map((video) => (
                      <div key={video.id} className="admin-list-item">
                        <span>{video.title}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setVideoItems(
                              videoItems.filter((entry) => entry.id !== video.id),
                            )
                          }
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Admin
