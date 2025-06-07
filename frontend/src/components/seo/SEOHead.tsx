import { NextSeo, NextSeoProps } from 'next-seo'

interface SEOHeadProps extends NextSeoProps {
  structuredData?: object
}

export function SEOHead({ structuredData, ...seoProps }: SEOHeadProps) {
  const defaultSEO: NextSeoProps = {
    titleTemplate: '%s | VP of One',
    defaultTitle: 'VP of One - Executive Leverage for Solo Leaders',
    description: 'Suite of AI executive assistants for strategy, analytics, and operations. Punch above your weight and lead big with a small team.',
    canonical: 'https://vpofone.com',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://vpofone.com',
      siteName: 'VP of One',
      title: 'VP of One - Executive Leverage for Solo Leaders',
      description: 'Suite of AI executive assistants for strategy, analytics, and operations. Punch above your weight and lead big with a small team.',
      images: [
        {
          url: 'https://vpofone.com/og-image.png',
          width: 1200,
          height: 630,
          alt: 'VP of One - Executive Leverage for Solo Leaders',
        },
      ],
    },
    twitter: {
      handle: '@vpofone',
      site: '@vpofone',
      cardType: 'summary_large_image',
    },
    additionalMetaTags: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=5',
      },
      {
        name: 'theme-color',
        content: '#4169E1',
      },
      {
        name: 'keywords',
        content: 'executive assistant, AI, strategy, analytics, operations, VP, leadership, productivity',
      },
      {
        name: 'author',
        content: 'Utlyze',
      },
    ],
    additionalLinkTags: [
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png',
        sizes: '180x180',
      },
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
    ],
  }

  const mergedSEO = {
    ...defaultSEO,
    ...seoProps,
    openGraph: {
      ...defaultSEO.openGraph,
      ...seoProps.openGraph,
    },
    twitter: {
      ...defaultSEO.twitter,
      ...seoProps.twitter,
    },
  }

  return (
    <>
      <NextSeo {...mergedSEO} />
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
    </>
  )
}