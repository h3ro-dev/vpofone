export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VP of One',
  alternateName: 'VPofOne',
  url: 'https://vpofone.com',
  logo: 'https://vpofone.com/logo.png',
  description: 'Executive leverage for solo leaders - AI-powered executive assistants for strategy, analytics, and operations',
  sameAs: [
    'https://twitter.com/vpofone',
    'https://linkedin.com/company/vpofone',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'support@vpofone.com',
  },
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'VP of One',
  url: 'https://vpofone.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://vpofone.com/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

export const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'VP of One Executive Suite',
  description: 'Suite of AI executive assistants for strategy, analytics, and operations',
  brand: {
    '@type': 'Brand',
    name: 'VP of One',
  },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: 'VP of One',
    },
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '89',
  },
}

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is VP of One?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VP of One is a suite of AI executive assistants designed for VPs and executives without adequate support staff. It provides AI-powered assistance for strategy, analytics, and operations.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who is VP of One for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VP of One is designed for VPs and executives who have title responsibility without team support, are overloaded with data and reports, face competing priorities, and are at risk of burnout.',
      },
    },
    {
      '@type': 'Question',
      name: 'What services does VP of One provide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VP of One provides 360° executive support including market analysis and insights, project management automation, strategic opportunity alerts, and AI-powered executive assistance.',
      },
    },
  ],
}

export function createBreadcrumbSchema(items: Array<{ name: string; item: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  }
}