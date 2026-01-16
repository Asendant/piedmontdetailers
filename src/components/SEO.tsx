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
  keywords = 'mobile car detailing, car detailing, auto detailing, Piedmont Triad, North Carolina, mobile detailer, car wash, paint correction, ceramic coating, interior detailing, Greensboro car detailing, Winston-Salem car detailing, High Point car detailing, mobile car detailing near me',
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
    // Main LocalBusiness schema
    const localBusinessData = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${siteUrl}#business`,
      name: 'Piedmont Detailers',
      alternateName: 'Piedmont Detailers Mobile Car Detailing',
      image: fullImage,
      url: siteUrl,
      telephone: '+13365550123',
      email: 'business@piedmontdetailers.com',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'NC',
        addressState: 'North Carolina',
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
        {
          '@type': 'City',
          name: 'Greensboro',
          addressRegion: 'NC',
        },
        {
          '@type': 'City',
          name: 'Winston-Salem',
          addressRegion: 'NC',
        },
        {
          '@type': 'City',
          name: 'High Point',
          addressRegion: 'NC',
        },
        {
          '@type': 'AdministrativeArea',
          name: 'Guilford County',
          addressRegion: 'NC',
        },
        {
          '@type': 'AdministrativeArea',
          name: 'Forsyth County',
          addressRegion: 'NC',
        },
        {
          '@type': 'AdministrativeArea',
          name: 'Davidson County',
          addressRegion: 'NC',
        },
        {
          '@type': 'AdministrativeArea',
          name: 'Randolph County',
          addressRegion: 'NC',
        },
        {
          '@type': 'AdministrativeArea',
          name: 'Stokes County',
          addressRegion: 'NC',
        },
        {
          '@type': 'AdministrativeArea',
          name: 'Surry County',
          addressRegion: 'NC',
        },
        {
          '@type': 'AdministrativeArea',
          name: 'Yadkin County',
          addressRegion: 'NC',
        },
      ],
      serviceArea: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: '36.0726',
          longitude: '-80.0531',
        },
        geoRadius: {
          '@type': 'Distance',
          value: '50',
          unitCode: 'MI',
        },
      },
      description: description,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Car Detailing Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Express Wash',
              description: 'Quick exterior wash and dry service',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Full Detail',
              description: 'Complete interior and exterior detailing',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Interior Deep Clean',
              description: 'Comprehensive interior cleaning and protection',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Paint Correction',
              description: 'Professional paint correction and restoration',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Ceramic Coating',
              description: 'Long-lasting ceramic coating protection',
            },
          },
        ],
      },
      sameAs: [
        // Add your social media profiles here when available
        // 'https://www.facebook.com/piedmontdetailers',
        // 'https://www.instagram.com/piedmontdetailers',
      ],
    }

    // Organization schema for additional authority
    const organizationData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${siteUrl}#organization`,
      name: 'Piedmont Detailers',
      url: siteUrl,
      logo: `${siteUrl}/logo.png`, // Update with your logo URL
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+13365550123',
        contactType: 'Customer Service',
        areaServed: 'US',
        availableLanguage: 'English',
      },
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'NC',
        addressCountry: 'US',
      },
    }

    // BreadcrumbList schema for navigation
    const breadcrumbData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteUrl,
        },
        ...(url && url !== '/' ? [{
          '@type': 'ListItem',
          position: 2,
          name: fullTitle.split('|')[0].trim(),
          item: fullUrl,
        }] : []),
      ],
    }

    const structuredDataArray = [localBusinessData, organizationData, breadcrumbData]

    // Remove existing structured data scripts if present
    const existingScripts = document.querySelectorAll('[data-structured-data]')
    existingScripts.forEach(script => script.remove())

    // Add all structured data schemas
    structuredDataArray.forEach((data, index) => {
      const script = document.createElement('script')
      script.setAttribute('data-structured-data', 'true')
      script.id = `structured-data-${index}`
      script.type = 'application/ld+json'
      script.text = JSON.stringify(data)
      document.head.appendChild(script)
    })

    return () => {
      const scriptsToRemove = document.querySelectorAll('[data-structured-data]')
      scriptsToRemove.forEach(script => script.remove())
    }
  }, [description, fullImage, fullTitle, fullUrl, url])

  return null
}

export default SEO
