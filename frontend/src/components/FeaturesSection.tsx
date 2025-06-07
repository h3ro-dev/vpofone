'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Brain, LineChart, Briefcase, Bell, Shield, Zap, Globe, Users } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: "360° Executive Support",
    description: "AI assistants that understand context, anticipate needs, and proactively support your executive function.",
    highlights: ["Strategic planning", "Decision support", "Risk assessment"]
  },
  {
    icon: LineChart,
    title: "Market Analysis & Insights",
    description: "Real-time competitive intelligence and market trends delivered in executive-ready formats.",
    highlights: ["Competitor tracking", "Industry trends", "Market opportunities"]
  },
  {
    icon: Briefcase,
    title: "Project Management Automation",
    description: "Keep all initiatives on track with AI-powered project coordination and status updates.",
    highlights: ["Automated updates", "Resource optimization", "Timeline management"]
  },
  {
    icon: Bell,
    title: "Strategic Opportunity Alerts",
    description: "Never miss a critical opportunity with AI monitoring your strategic landscape 24/7.",
    highlights: ["Custom alerts", "Priority filtering", "Action recommendations"]
  }
]

const additionalBenefits = [
  { icon: Shield, text: "Enterprise-grade security" },
  { icon: Zap, text: "Lightning-fast implementation" },
  { icon: Globe, text: "Works with your existing tools" },
  { icon: Users, text: "White-glove onboarding" }
]

export default function FeaturesSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your AI Executive Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get the support of an entire executive team powered by AI. 
              Each assistant is specialized to handle specific aspects of your role.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  <ul className="space-y-1">
                    {feature.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-sm text-gray-500 flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-primary-50 rounded-2xl p-8"
        >
          <h3 className="text-xl font-semibold text-center text-gray-900 mb-6">
            Plus Everything You'd Expect
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {additionalBenefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <benefit.icon className="w-8 h-8 text-primary-600 mb-2" />
                <span className="text-sm text-gray-700">{benefit.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}