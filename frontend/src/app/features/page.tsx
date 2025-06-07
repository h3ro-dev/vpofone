import React from 'react'
import { Brain, LineChart, Briefcase, Bell, Shield, Clock, Zap, CheckCircle } from 'lucide-react'

const detailedFeatures = [
  {
    category: "Executive Intelligence",
    icon: Brain,
    features: [
      {
        title: "Strategic Planning Assistant",
        description: "AI that understands your business context and helps craft winning strategies",
        capabilities: [
          "Scenario modeling and analysis",
          "Risk assessment and mitigation",
          "Strategic roadmap development",
          "Quarterly planning support"
        ]
      },
      {
        title: "Decision Support System",
        description: "Get data-driven recommendations for critical business decisions",
        capabilities: [
          "Multi-criteria decision analysis",
          "Impact assessment",
          "Stakeholder analysis",
          "Decision documentation"
        ]
      }
    ]
  },
  {
    category: "Analytics & Insights",
    icon: LineChart,
    features: [
      {
        title: "Market Intelligence",
        description: "Stay ahead with real-time competitive and market analysis",
        capabilities: [
          "Competitor monitoring",
          "Industry trend analysis",
          "Customer sentiment tracking",
          "Market opportunity identification"
        ]
      },
      {
        title: "Performance Analytics",
        description: "Transform data into actionable insights automatically",
        capabilities: [
          "KPI tracking and alerting",
          "Predictive analytics",
          "Custom dashboard creation",
          "Executive report generation"
        ]
      }
    ]
  },
  {
    category: "Operational Excellence",
    icon: Briefcase,
    features: [
      {
        title: "Project Orchestration",
        description: "Keep all initiatives aligned and on track effortlessly",
        capabilities: [
          "Multi-project coordination",
          "Resource optimization",
          "Timeline management",
          "Stakeholder updates"
        ]
      },
      {
        title: "Process Automation",
        description: "Eliminate manual work with intelligent automation",
        capabilities: [
          "Workflow automation",
          "Report generation",
          "Meeting preparation",
          "Follow-up management"
        ]
      }
    ]
  }
]

export default function FeaturesPage() {
  return (
    <main className="pt-24 pb-16">
      {/* Hero section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Features That Transform Your Executive Function
            </h1>
            <p className="text-xl text-gray-600">
              Every feature is designed to multiply your impact while reducing your workload. 
              Explore how VP of One becomes your unfair advantage.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed features */}
      <section className="py-16">
        <div className="container">
          <div className="space-y-20">
            {detailedFeatures.map((category, index) => (
              <div key={index}>
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <category.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">{category.category}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {category.features.map((feature, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {feature.description}
                      </p>
                      <div className="space-y-3">
                        {feature.capabilities.map((capability, capIdx) => (
                          <div key={capIdx} className="flex items-start space-x-2">
                            <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{capability}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <Shield className="w-8 h-8 text-primary-600" />
              <h2 className="text-3xl font-bold text-gray-900">Enterprise-Grade Security</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">SOC 2 Compliant</h3>
                <p className="text-gray-600">Your data is protected by industry-leading security standards</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">End-to-End Encryption</h3>
                <p className="text-gray-600">All data is encrypted in transit and at rest</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">GDPR Compliant</h3>
                <p className="text-gray-600">Full compliance with international privacy regulations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-primary-600">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to 10x Your Executive Capability?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join VPs and executives who are already leading more effectively with AI support.
            </p>
            <button className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Your Executive Strategy Session
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}