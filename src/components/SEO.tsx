import { useEffect } from 'react'

type SEOProps = {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
}

const defaultTitle = 'Piedmont Detailers | Mobile Car Detailing in the Piedmont Triad, NC'
const defaultDescription = 'Premium mobile car detailing services across the Piedmont Triad. We bring professional-grade detailing directly to your location. Book your detail today!'
const defaultImage = '/og-image.jpg' // You'll want to add this image
const siteUrl = 'https://piedmontdetailers.com' // Update with your actual domain

const SEO = ({
  title,
  description = defaultDescription,
  keywords = 'mobile car detailing, car detailing, auto detailing, Piedmont Triad, North Carolina, mobile detailer, car wash, paint correction, ceramic coating, interior detailing',
  image = defaultImage,
  url,
  type = 'website',
}: SEOProps) => {
  const fullTitle = title ? `${title} | Piedmont Detailers` : defaultTitle
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`

  useEffect(() => {
    // Update document title
    document.title = fullTitle

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    // Basic meta tags
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)
    updateMetaTag('author', 'Piedmont Detailers')
    updateMetaTag('robots', 'index, follow')
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0')

    // Open Graph tags
    updateMetaTag('og:title', fullTitle, 'property')
    updateMetaTag('og:description', description, 'property')
    updateMetaTag('og:image', fullImage, 'property')
    updateMetaTag('og:url', fullUrl, 'property')
    updateMetaTag('og:type', type, 'property')
    updateMetaTag('og:site_name', 'Piedmont Detailers', 'property')
    updateMetaTag('og:locale', 'en_US', 'property')

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', fullTitle)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', fullImage)

    // Additional meta tags
    updateMetaTag('theme-color', '#1e40af')
    updateMetaTag('apple-mobile-web-app-title', 'Piedmont Detailers')
  }, [fullTitle, description, keywords, fullImage, fullUrl, type])

  // Add structured data (JSON-LD)
  useEffect(() => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Piedmont Detailers',
      image: fullImage,
      '@id': siteUrl,
      url: siteUrl,
      telephone: '+13365550123',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'NC',
        addressCountry: 'US',
        addressLocality: 'Piedmont Triad',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '36.0726',
        longitude: '-80.0531',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '08:00',
          closes: '18:00',
        },
      ],
      areaServed: [
        'Guilford County',
        'Forsyth County',
        'Davidson County',
        'Randolph County',
        'Stokes County',
        'Surry County',
        'Yadkin County',
      ],
      serviceArea: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: '36.0726',
          longitude: '-80.0531',
        },
      },
      description: description,
      sameAs: [
        // Add your social media profiles here when available
        // 'https://www.facebook.com/piedmontdetailers',
        // 'https://www.instagram.com/piedmontdetailers',
      ],
    }

    // Remove existing structured data script if present
    const existingScript = document.getElementById('structured-data')
    if (existingScript) {
      existingScript.remove()
    }

    // Add new structured data
    const script = document.createElement('script')
    script.id = 'structured-data'
    script.type = 'application/ld+json'
    script.text = JSON.stringify(structuredData)
    document.head.appendChild(script)

    return () => {
      const scriptToRemove = document.getElementById('structured-data')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [description, fullImage])

  return null
}

export default SEO
