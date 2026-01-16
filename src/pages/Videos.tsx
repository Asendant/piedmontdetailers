import { loadVideos, saveVideos } from '../data/storage'
import { useStoredState } from '../hooks/useStoredState'

const Videos = () => {
  const [videos] = useStoredState(loadVideos, saveVideos)

  return (
    <div className="page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Before & After Results</p>
          <h1>Detailing Video Gallery</h1>
          <p>
            Watch our process, techniques, and transformations across the
            Piedmont Triad. See how we bring vehicles back to showroom condition.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container grid video-grid">
          {videos.map((video) => (
            <article key={video.id} className="card video-card">
              <div className="video-frame">
                <iframe
                  src={video.url}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="video-body">
                <h3>{video.title}</h3>
                <p>{video.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Videos
