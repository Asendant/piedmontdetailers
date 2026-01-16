import { Link } from 'react-router-dom'

const NotFound = () => (
  <div className="page">
    <section className="page-hero">
      <div className="container">
        <h1>Page Not Found</h1>
        <p>Let’s get you back to the main site.</p>
        <Link className="btn btn-primary" to="/">
          Return Home
        </Link>
      </div>
    </section>
  </div>
)

export default NotFound
