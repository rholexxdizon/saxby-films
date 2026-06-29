import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  keywords?: string[]
  ogType?: 'website' | 'article'
  noIndex?: boolean
}

const SEO = ({
  title = 'Saxby Films - Visual Storytellers',
  description = 'Saxby Films captures real-life moments and transforms them into timeless visual stories. Specializing in wedding photography, videography, pre-wedding sessions, debut events, and corporate coverage.',
  image = '/saxby-films-logo-2.jpg',
  keywords = [
    'wedding photography',
    'wedding videography',
    'pre-wedding session',
    'debut coverage',
    'event photography',
    'event videography',
    'corporate events',
    'drone coverage',
    'Saxby Films',
    'visual storytellers',
    'Philippines wedding photographer',
    'Manila wedding videography'
  ],
  ogType = 'website',
  noIndex = false
}: SEOProps) => {
  const siteUrl = 'https://saxbyfilms.com'
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Saxby Films',
    description,
    url: siteUrl,
    logo: `${siteUrl}/saxby-films-logo-2.jpg`,
    image: fullImageUrl,
    telephone: '+63 912 345 6789',
    email: 'info@saxbyfilms.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Metro Manila',
      addressCountry: 'PH'
    },
    sameAs: [
      'https://www.instagram.com/saxbyfilms',
      'https://www.facebook.com/saxbyfilms'
    ],
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      opens: '09:00',
      closes: '18:00'
    },
    serviceType: [
      'Wedding Photography',
      'Wedding Videography',
      'Pre-Wedding Sessions',
      'Debut Coverage',
      'Event Photography',
      'Event Videography',
      'Corporate Events',
      'Drone Coverage'
    ]
  }

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content="Saxby Films" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@saxbyfilms" />

      {/* Additional Meta Tags */}
      <meta name="author" content="Saxby Films" />
      <meta name="theme-color" content="#0d0d0d" />
      <meta name="msapplication-TileColor" content="#0d0d0d" />

      {/* Canonical URL */}
      <link rel="canonical" href={siteUrl} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  )
}

export default SEO
