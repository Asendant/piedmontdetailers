export type SEOProps = {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
}

export type NormalizedSEO = {
  fullTitle: string
  description: string
  keywords: string
  fullImage: string
  fullUrl: string
  urlPath: string
  type: string
}

const defaultTitle = 'Piedmont Detailers | Mobile Car Detailing in the Piedmont Triad, NC'
const defaultDescription =
  'Premium mobile car detailing services across the Piedmont Triad. We bring professional-grade detailing directly to your location. Book your detail today!'
const defaultKeywords =
  'mobile car detailing, car detailing, auto detailing, Piedmont Triad, North Carolina, mobile detailer, car wash, paint correction, ceramic coating, interior detailing, Greensboro car detailing, Winston-Salem car detailing, High Point car detailing, mobile car detailing near me'
const defaultImage = '/og-image.jpg'

// This should be your canonical public domain (not CloudFront).
export const siteUrl = 'https://piedmontdetailers.com'

export const normalizeSEO = (props: SEOProps): NormalizedSEO => {
  const urlPath = props.url ?? '/'
  const type = props.type ?? 'website'
  const description = props.description ?? defaultDescription
  const keywords = props.keywords ?? defaultKeywords
  const image = props.image ?? defaultImage

  const fullTitle = props.title ? `${props.title} | Piedmont Detailers` : defaultTitle
  const fullUrl = `${siteUrl}${urlPath}`
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`

  return { fullTitle, description, keywords, fullImage, fullUrl, urlPath, type }
}

export const buildStructuredData = (seo: NormalizedSEO) => {
  const localBusinessData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}#business`,
    name: 'Piedmont Detailers',
    alternateName: 'Piedmont Detailers Mobile Car Detailing',
    image: seo.fullImage,
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
      { '@type': 'City', name: 'Greensboro', addressRegion: 'NC' },
      { '@type': 'City', name: 'Winston-Salem', addressRegion: 'NC' },
      { '@type': 'City', name: 'High Point', addressRegion: 'NC' },
      { '@type': 'AdministrativeArea', name: 'Guilford County', addressRegion: 'NC' },
      { '@type': 'AdministrativeArea', name: 'Forsyth County', addressRegion: 'NC' },
      { '@type': 'AdministrativeArea', name: 'Davidson County', addressRegion: 'NC' },
      { '@type': 'AdministrativeArea', name: 'Randolph County', addressRegion: 'NC' },
      { '@type': 'AdministrativeArea', name: 'Stokes County', addressRegion: 'NC' },
      { '@type': 'AdministrativeArea', name: 'Surry County', addressRegion: 'NC' },
      { '@type': 'AdministrativeArea', name: 'Yadkin County', addressRegion: 'NC' },
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
    description: seo.description,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Car Detailing Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Express Wash', description: 'Quick exterior wash and dry service' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Full Detail', description: 'Complete interior and exterior detailing' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Interior Deep Clean', description: 'Comprehensive interior cleaning and protection' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Paint Correction', description: 'Professional paint correction and restoration' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Ceramic Coating', description: 'Long-lasting ceramic coating protection' },
        },
      ],
    },
    sameAs: [],
  }

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}#organization`,
    name: 'Piedmont Detailers',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
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

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      ...(seo.urlPath !== '/' ? [{ '@type': 'ListItem', position: 2, name: seo.fullTitle.split('|')[0].trim(), item: seo.fullUrl }] : []),
    ],
  }

  return [localBusinessData, organizationData, breadcrumbData]
}

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')

export const renderHeadHtml = (seo: NormalizedSEO, structuredData: unknown[]) => {
  const jsonLd = structuredData
    .map((obj) => `<script type="application/ld+json">${escapeHtml(JSON.stringify(obj))}</script>`)
    .join('')

  return [
    `<title>${escapeHtml(seo.fullTitle)}</title>`,
    `<link rel="canonical" href="${escapeHtml(seo.fullUrl)}" />`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="keywords" content="${escapeHtml(seo.keywords)}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.fullTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:image" content="${escapeHtml(seo.fullImage)}" />`,
    `<meta property="og:url" content="${escapeHtml(seo.fullUrl)}" />`,
    `<meta property="og:type" content="${escapeHtml(seo.type)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.fullTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(seo.fullImage)}" />`,
    jsonLd,
  ].join('')
}

