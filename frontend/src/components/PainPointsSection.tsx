'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, Users, Clock, Zap, BarChart3, Target } from 'lucide-react'

const painPoints = [
  {
    icon: Users,
    title: "Title Without Team",
    description: "VP-level responsibility but no direct reports? We understand the unique challenge of leading without a team.",
    solution: "Get AI-powered executive support that scales with your needs"
  },
  {
    icon: BarChart3,
    title: "Data Overload",
    description: "Drowning in reports, dashboards, and analytics? Critical insights get lost in the noise.",
    solution: "Automated analysis that surfaces what matters most"
  },
  {
    icon: Target,
    title: "Competing Priorities",
    description: "Every initiative is 'urgent.' Strategic planning becomes reactive firefighting.",
    solution: "AI-driven prioritization based on real impact"
  },
  {
    icon: Zap,
    title: "Burnout Risk",
    description: "Working 60+ hour weeks just to keep up? The path to burnout is unsustainable.",
    solution: "Delegate to AI assistants that work 24/7"
  }
]

export default function PainPointsSection() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              We Know Your Challenges
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Being a VP without adequate support isn't just difficult—it's a recipe for burnout. 
              Here's how we help you overcome the most common pain points.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <point.icon className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {point.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {point.description}
                  </p>
                  <div className="flex items-start space-x-2">
                    <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertCircle className="w-3 h-3 text-primary-600" />
                    </div>
                    <p className="text-sm text-primary-700 font-medium">
                      {point.solution}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-600 mb-6">
            Ready to transform how you work?
          </p>
          <button className="btn-primary">
            Get Your Executive Strategy Session
          </button>
        </motion.div>
      </div>
    </section>
  )
}