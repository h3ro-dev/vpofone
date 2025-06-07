/**
 * SEO Configuration and Utilities for VP of One
 * Handles metadata, structured data, and SEO optimization
 */

export const siteConfig = {
  name: 'VP of One',
  title: 'VP of One - Executive Leverage for Solo Leaders',
  description: 'Suite of AI executive assistants providing 360° support for VPs and executives without adequate support staff. Strategy, analytics, and operations automation.',
  url: 'https://vpofone.ai',
  ogImage: 'https://vpofone.ai/og-image.png',
  keywords: [
    'VP of One',
    'executive assistant AI',
    'solo VP support',
    'executive leverage',
    'AI strategy assistant',
    'automated analytics',
    'project management AI',
    'executive burnout solution',
    'one-person leadership',
    'VP without team'
  ],
  author: 'Utlyze',
  twitterHandle: '@vpofone',
};

// Generate page metadata
export function generateMetadata({
  title,
  description,
  keywords,
  path = '',
  image,
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  path?: string;
  image?: string;
}) {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const pageDescription = description || siteConfig.description;
  const pageKeywords = keywords ? [...siteConfig.keywords, ...keywords] : siteConfig.keywords;
  const pageUrl = `${siteConfig.url}${path}`;
  const pageImage = image || siteConfig.ogImage;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords.join(', '),
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      images: [pageImage],
    },
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Structured data for organization
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  sameAs: [
    `https://twitter.com/${siteConfig.twitterHandle.replace('@', '')}`,
    'https://linkedin.com/company/vpofone',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-555-123-4567',
    contactType: 'customer service',
    availableLanguage: ['English'],
  },
};

// Structured data for product/service
export const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'VP of One AI Suite',
  description: 'Comprehensive AI executive assistant suite for solo VPs and executives',
  brand: {
    '@type': 'Brand',
    name: siteConfig.name,
  },
  offers: {
    '@type': 'Offer',
    url: `${siteConfig.url}/consultation`,
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    priceValidUntil: '2025-12-31',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '127',
  },
};

// FAQ Schema generator
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Breadcrumb schema generator
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

// Generate robots.txt content
export const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${siteConfig.url}/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /static/`;

// Generate sitemap entries
export function generateSitemapEntries() {
  const staticPages = [
    { url: '/', changefreq: 'weekly', priority: 1.0 },
    { url: '/features', changefreq: 'monthly', priority: 0.8 },
    { url: '/pricing', changefreq: 'monthly', priority: 0.8 },
    { url: '/about', changefreq: 'monthly', priority: 0.7 },
    { url: '/consultation', changefreq: 'weekly', priority: 0.9 },
    { url: '/blog', changefreq: 'daily', priority: 0.7 },
    { url: '/contact', changefreq: 'monthly', priority: 0.6 },
  ];

  return staticPages.map(page => ({
    loc: `${siteConfig.url}${page.url}`,
    lastmod: new Date().toISOString(),
    changefreq: page.changefreq,
    priority: page.priority,
  }));
}

// Meta tags for social sharing
export const socialMetaTags = {
  'og:type': 'website',
  'og:locale': 'en_US',
  'fb:app_id': '', // Add Facebook App ID if available
  'article:author': siteConfig.author,
  'article:publisher': siteConfig.url,
};