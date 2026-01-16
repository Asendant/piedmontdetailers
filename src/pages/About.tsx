import SEO from '../components/SEO'

const About = () => (
  <>
    <SEO
      title="About Piedmont Detailers"
      description="Locally owned mobile detailing team serving the Piedmont Triad. We bring professional-grade equipment and expertise directly to your location with craftsmanship, convenience, and care."
      keywords="about piedmont detailers, mobile detailing team, professional car detailing, local detailer, Piedmont Triad detailing"
      url="/about"
    />
    <div className="page">
    <section className="about-hero">
      <div className="container">
        <div className="about-hero-content">
          <div>
            <p className="eyebrow">Our Story</p>
            <h1>Detailing Built for the Piedmont Triad</h1>
            <p className="about-intro">
              Piedmont Detailers is a locally owned mobile detailing team serving
              drivers who want showroom-quality results without the hassle. We bring professional-grade equipment and expertise directly to your location.
            </p>
            <p>
              Founded with a passion for automotive excellence, we've built our reputation on attention to detail, 
              reliable service, and genuine care for every vehicle we touch. Whether you drive a daily commuter or 
              a weekend show car, we treat each detail with the same level of professionalism and precision.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="about-values-grid">
          <div className="about-value-card">
            <div className="value-icon">🎯</div>
            <h3>Craftsmanship</h3>
            <p>
              Every detail is performed with paint-safe techniques and premium tools. 
              We stay current with industry best practices and invest in professional-grade equipment 
              to ensure your vehicle receives the highest quality care.
            </p>
          </div>
          <div className="about-value-card">
            <div className="value-icon">🚐</div>
            <h3>Convenience</h3>
            <p>
              We bring water, power, and supplies to your location across the Triad. 
              No need to disrupt your day or drive to a shop. Our fully-equipped mobile unit 
              arrives ready to work, saving you time and hassle.
            </p>
          </div>
          <div className="about-value-card">
            <div className="value-icon">❤️</div>
            <h3>Care</h3>
            <p>
              We treat every vehicle like our own with a focus on long-term protection. 
              Our goal isn't just a clean car today, but maintaining your vehicle's value 
              and appearance for years to come.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="section alt">
      <div className="container">
        <div className="about-why-section">
          <div className="section-heading">
            <h2>Why Clients Choose Us</h2>
            <p>
              We keep communication clear and show up prepared to deliver
              consistent, professional results every time.
            </p>
          </div>
          <div className="why-grid">
            <div className="why-item">
              <div className="why-number">01</div>
              <h4>Transparent & Honest</h4>
              <p>Clear recommendations and honest pricing with no hidden fees. We explain what your vehicle needs and why.</p>
            </div>
            <div className="why-item">
              <div className="why-number">02</div>
              <h4>Expert Training</h4>
              <p>Detailers trained in paint correction, ceramic coatings, and advanced techniques. Continuous education keeps us at the forefront.</p>
            </div>
            <div className="why-item">
              <div className="why-number">03</div>
              <h4>Flexible Scheduling</h4>
              <p>We work around your schedule, whether that's early mornings, evenings, or weekends. Homes, offices, and dealerships welcome.</p>
            </div>
            <div className="why-item">
              <div className="why-number">04</div>
              <h4>Licensed & Insured</h4>
              <p>Fully licensed, bonded, and insured for your peace of mind. We take our business and your vehicle seriously.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  </>
)

export default About
