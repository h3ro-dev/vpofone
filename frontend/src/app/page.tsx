<<<<<<< HEAD
'use client'

import { useEffect } from 'react'
import { SEOHead } from '@/components/seo/SEOHead'
import { organizationSchema, websiteSchema, productSchema } from '@/components/seo/structuredData'
import { trackCTAClick } from '@/components/analytics/AnalyticsProvider'
import { reportWebVitals, observePerformance, prefetchCriticalResources } from '@/lib/performance'
import { LazyImage } from '@/components/ui/LazyImage'

export default function HomePage() {
  useEffect(() => {
    // Initialize performance monitoring
    reportWebVitals()
    observePerformance()
    prefetchCriticalResources()
  }, [])

  const handleCTAClick = () => {
    trackCTAClick('Get Executive Strategy Session', 'hero')
    // Handle navigation or form modal
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema, websiteSchema, productSchema],
  }

  return (
    <>
      <SEOHead
        title="Executive Leverage for Solo Leaders"
        description="AI-powered executive assistants for VPs without teams. Get 360° support for strategy, analytics, and operations. Punch above your weight."
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="section bg-gradient-to-b from-background to-background-secondary">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-text-primary mb-6">
              Punch Above Your Weight –{' '}
              <span className="text-gradient">Lead Big with a Small Team</span>
            </h1>
            
            <p className="text-xl text-text-secondary mb-8">
              Suite of AI executive assistants for strategy, analytics, and operations. 
              Get the leverage you need to excel as a VP without adequate support staff.
            </p>

            <button
              onClick={handleCTAClick}
              className="btn-primary text-lg"
              aria-label="Get Your Executive Strategy Session"
            >
              Get Your Executive Strategy Session
            </button>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="gpu-accelerated">
                <div className="text-3xl font-bold text-primary">360°</div>
                <div className="text-sm text-text-secondary">Executive Support</div>
              </div>
              <div className="gpu-accelerated">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-text-secondary">Always Available</div>
              </div>
              <div className="gpu-accelerated">
                <div className="text-3xl font-bold text-primary">10x</div>
                <div className="text-sm text-text-secondary">Productivity Boost</div>
              </div>
              <div className="gpu-accelerated">
                <div className="text-3xl font-bold text-primary">0</div>
                <div className="text-sm text-text-secondary">Team Members Needed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section">
        <div className="container-max">
          <h2 className="text-4xl font-bold text-center mb-12">
            The VP Without a Team Dilemma
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Title Without Support',
                description: 'VP-level responsibility but no team to delegate to',
              },
              {
                title: 'Data Overload',
                description: 'Drowning in reports, metrics, and analysis requests',
              },
              {
                title: 'Competing Priorities',
                description: 'Everything is urgent, nothing gets the attention it needs',
              },
              {
                title: 'Burnout Risk',
                description: 'Working nights and weekends just to keep up',
              },
            ].map((problem, index) => (
              <div key={index} className="card">
                <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
                <p className="text-text-secondary">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-background-secondary">
        <div className="container-max">
          <h2 className="text-4xl font-bold text-center mb-12">
            Your AI Executive Team
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Strategy Assistant',
                description: 'Market analysis, competitive intelligence, and strategic planning support',
                features: ['Market Research', 'Competitor Analysis', 'Strategic Roadmaps'],
              },
              {
                title: 'Analytics Assistant',
                description: 'Data analysis, reporting automation, and insight generation',
                features: ['Automated Reporting', 'Data Visualization', 'Trend Analysis'],
              },
              {
                title: 'Operations Assistant',
                description: 'Project management, process optimization, and task automation',
                features: ['Project Tracking', 'Process Automation', 'Priority Management'],
              },
            ].map((feature, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-text-secondary mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="w-5 h-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary text-white">
        <div className="container-max text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Lead Without Limits?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join VPs who are achieving more with AI-powered executive support
          </p>
          <button
            onClick={() => trackCTAClick('Start Free Trial', 'footer')}
            className="btn bg-white text-primary hover:bg-gray-100"
          >
            Start Your Free Trial
          </button>
        </div>
      </section>
    </>
=======
import React from 'react'
import HeroSection from '@/components/HeroSection'
import PainPointsSection from '@/components/PainPointsSection'
import FeaturesSection from '@/components/FeaturesSection'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <PainPointsSection />
      <FeaturesSection />
    </main>
>>>>>>> origin/main
  )
}