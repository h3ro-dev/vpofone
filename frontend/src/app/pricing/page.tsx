import React from 'react'
import { Check, X, ArrowRight, Zap, Shield, Users } from 'lucide-react'

const pricingTiers = [
  {
    name: "Starter",
    description: "Perfect for individual VPs getting started",
    price: "$497",
    period: "per month",
    features: [
      { name: "1 AI Executive Assistant", included: true },
      { name: "Basic analytics & reporting", included: true },
      { name: "Email & chat support", included: true },
      { name: "Standard integrations", included: true },
      { name: "Monthly strategy session", included: false },
      { name: "Custom AI training", included: false },
      { name: "Priority support", included: false },
      { name: "Advanced security features", included: false }
    ],
    cta: "Start Free Trial",
    highlighted: false
  },
  {
    name: "Professional",
    description: "For VPs ready to transform their productivity",
    price: "$997",
    period: "per month",
    badge: "Most Popular",
    features: [
      { name: "3 AI Executive Assistants", included: true },
      { name: "Advanced analytics & insights", included: true },
      { name: "Priority email & chat support", included: true },
      { name: "All integrations included", included: true },
      { name: "Monthly strategy session", included: true },
      { name: "Custom AI training", included: true },
      { name: "Priority support", included: true },
      { name: "Advanced security features", included: false }
    ],
    cta: "Get Started",
    highlighted: true
  },
  {
    name: "Enterprise",
    description: "For executives who need maximum leverage",
    price: "Custom",
    period: "contact sales",
    features: [
      { name: "Unlimited AI Assistants", included: true },
      { name: "Enterprise analytics suite", included: true },
      { name: "24/7 dedicated support", included: true },
      { name: "Custom integrations", included: true },
      { name: "Weekly strategy sessions", included: true },
      { name: "Bespoke AI training", included: true },
      { name: "White-glove onboarding", included: true },
      { name: "Enterprise security & compliance", included: true }
    ],
    cta: "Contact Sales",
    highlighted: false
  }
]

const faqs = [
  {
    question: "Can I change plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle."
  },
  {
    question: "Is there a setup fee?",
    answer: "No setup fees for Starter and Professional plans. Enterprise plans include complimentary white-glove onboarding."
  },
  {
    question: "What integrations are available?",
    answer: "We integrate with all major business tools including Slack, Microsoft Teams, Google Workspace, Salesforce, and more."
  },
  {
    question: "How secure is my data?",
    answer: "We maintain SOC 2 compliance, use end-to-end encryption, and follow enterprise-grade security practices."
  }
]

export default function PricingPage() {
  return (
    <main className="pt-24 pb-16">
      {/* Hero section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pricing That Scales With Your Ambition
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Choose the plan that matches your needs. All plans include a 14-day free trial.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary-600" />
                <span className="text-gray-700">No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-primary-600" />
                <span className="text-gray-700">Setup in minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary-600" />
                <span className="text-gray-700">Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`relative rounded-2xl p-8 ${
                  tier.highlighted
                    ? 'bg-primary-600 text-white shadow-2xl scale-105'
                    : 'bg-white border border-gray-200'
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      {tier.badge}
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold mb-2 ${tier.highlighted ? 'text-white' : 'text-gray-900'}`}>
                    {tier.name}
                  </h3>
                  <p className={`text-sm mb-6 ${tier.highlighted ? 'text-primary-100' : 'text-gray-600'}`}>
                    {tier.description}
                  </p>
                  <div className="flex items-baseline justify-center">
                    <span className={`text-4xl font-bold ${tier.highlighted ? 'text-white' : 'text-gray-900'}`}>
                      {tier.price}
                    </span>
                    <span className={`ml-2 ${tier.highlighted ? 'text-primary-100' : 'text-gray-600'}`}>
                      {tier.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      {feature.included ? (
                        <Check className={`w-5 h-5 flex-shrink-0 ${tier.highlighted ? 'text-primary-200' : 'text-primary-600'}`} />
                      ) : (
                        <X className={`w-5 h-5 flex-shrink-0 ${tier.highlighted ? 'text-primary-300' : 'text-gray-400'}`} />
                      )}
                      <span className={`text-sm ${
                        tier.highlighted 
                          ? feature.included ? 'text-white' : 'text-primary-200'
                          : feature.included ? 'text-gray-700' : 'text-gray-400'
                      }`}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                  tier.highlighted
                    ? 'bg-white text-primary-600 hover:bg-gray-100'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}>
                  {tier.cta}
                  <ArrowRight className="inline-block ml-2 w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Lead at the Next Level?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of VPs who are achieving more with less effort.
            </p>
            <button className="btn-primary">
              Start Your Free Trial
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}