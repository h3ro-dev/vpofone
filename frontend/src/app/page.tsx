"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ConsultationForm } from "@/components/ConsultationForm";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const painPoints = [
    {
      title: "VP in Name, Army of One in Practice",
      description: "You've got executive-level responsibilities but you're still doing analyst work, administrative tasks, and everything in between.",
      icon: "👤"
    },
    {
      title: "Drowning in Reports, Starving for Insights",
      description: "Your inbox is full of dashboards and spreadsheets, but finding actionable intelligence takes hours you don't have.",
      icon: "📊"
    },
    {
      title: "Everything is Urgent, Nothing Gets Done",
      description: "Without a team to delegate to, you're constantly switching contexts and dropping balls you can't afford to miss.",
      icon: "🔥"
    },
    {
      title: "Working Nights and Weekends Isn't Sustainable",
      description: "You know this pace will break you, but what choice do you have when the buck stops with you?",
      icon: "😴"
    }
  ];

  const features = [
    {
      title: "Strategic Analysis Assistant",
      headline: "Market Intelligence at Your Fingertips",
      items: [
        "Competitive landscape monitoring",
        "Market trend analysis",
        "Strategic opportunity identification",
        "Executive-ready reports in minutes"
      ]
    },
    {
      title: "Operations Excellence Assistant",
      headline: "Run a Tight Ship Without the Crew",
      items: [
        "Process optimization recommendations",
        "Project status tracking across teams",
        "Risk identification and mitigation",
        "Automated reporting and dashboards"
      ]
    },
    {
      title: "Data & Analytics Assistant",
      headline: "From Raw Data to Board-Ready Insights",
      items: [
        "Complex data synthesis",
        "Predictive analytics and forecasting",
        "Visual storytelling with data",
        "Real-time KPI monitoring"
      ]
    },
    {
      title: "Communication & Coordination Assistant",
      headline: "Be Everywhere Without Burning Out",
      items: [
        "Executive communication drafting",
        "Meeting preparation and follow-up",
        "Stakeholder update automation",
        "Calendar and priority optimization"
      ]
    }
  ];

  const benefits = [
    {
      title: "Reclaim Your Time",
      metric: "Save 15+ hours per week",
      description: "Stop doing work beneath your pay grade. Focus on strategy while AI handles the execution."
    },
    {
      title: "Make Better Decisions",
      metric: "3x faster insights",
      description: "Get comprehensive analysis in minutes, not days. Make confident decisions backed by data."
    },
    {
      title: "Impress Stakeholders",
      metric: "90% reduction in prep time",
      description: "Walk into every meeting fully prepared with insights your peers wish they had."
    },
    {
      title: "Sustainable Performance",
      metric: "Work-life balance restored",
      description: "Deliver exceptional results without sacrificing your health or relationships."
    }
  ];

  const testimonials = [
    {
      quote: "I went from working 70-hour weeks to 45, while actually increasing my impact. My CEO thinks I hired a secret team.",
      author: "Sarah Chen",
      role: "VP of Operations, TechCo",
      result: "Promoted to SVP within 6 months"
    },
    {
      quote: "The strategic insights I get are better than what I used to get from $50K consulting engagements.",
      author: "Michael Rodriguez",
      role: "VP of Strategy, FinanceScale",
      result: "Identified $2.3M in cost savings"
    },
    {
      quote: "I finally have time to think strategically instead of just fighting fires. Game changer.",
      author: "Jennifer Park",
      role: "VP of Product, StartupGrowth",
      result: "Launched 3 new products in record time"
    }
  ];

  const stats = [
    { value: "2,500+", label: "VPs Supported" },
    { value: "15M+", label: "Hours Saved" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "3.2x", label: "Productivity Gain" }
  ];

  const faqs = [
    {
      question: "How is this different from ChatGPT or other AI tools?",
      answer: "VP of One is purpose-built for executive needs. Our AI assistants understand business context, can access and analyze your actual data, and produce executive-ready outputs. Think of it as the difference between a Swiss Army knife and a full professional toolkit."
    },
    {
      question: "How long does it take to see results?",
      answer: "Most VPs report significant time savings within the first week. By week two, you'll wonder how you ever managed without it. Full transformation typically happens within 30 days."
    },
    {
      question: "Is my company data secure?",
      answer: "Absolutely. We maintain SOC 2 Type II compliance, use enterprise-grade encryption, and never train our models on your data. Your information is more secure with us than in most email systems."
    },
    {
      question: "What if I need help with industry-specific tasks?",
      answer: "Your AI assistants are custom-trained on your industry, company, and role. During onboarding, we ensure they understand your specific context and challenges."
    },
    {
      question: "Can this really replace human assistants?",
      answer: "VP of One complements human talent rather than replacing it. For VPs without any support, it provides essential leverage. For those with limited support, it amplifies your team's impact."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="text-2xl font-bold text-gray-900">VP of One</div>
            <Button onClick={() => setIsModalOpen(true)}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-[#4169E1]/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Punch Above Your Weight –<br />Lead Big with a Small Team
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Suite of AI executive assistants that give you the strategic leverage of a full support staff, without the overhead.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" onClick={() => setIsModalOpen(true)}>
                Get Your Executive Strategy Session
              </Button>
              <Button size="lg" variant="secondary">
                See How It Works
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-gray-600">
              <span className="flex items-center gap-2">
                <span className="text-green-500">✓</span> 360° Executive Support
              </span>
              <span className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Strategic Analysis On-Demand
              </span>
              <span className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Operational Excellence at Scale
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              We Know Your Reality
            </h2>
            <p className="text-xl text-gray-600">
              You've earned the title, but not the team. Sound familiar?
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {painPoints.map((pain, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8">
                <div className="text-4xl mb-4">{pain.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {pain.title}
                </h3>
                <p className="text-gray-600">
                  {pain.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#4169E1]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your AI-Powered Executive Suite
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform from overwhelmed to unstoppable with AI assistants that think, analyze, and execute at your level.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-lg text-[#4169E1] font-medium mb-6">
                  {feature.headline}
                </p>
                <ul className="space-y-3">
                  {feature.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-[#4169E1] mr-3 flex-shrink-0">✓</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Lead Like You Have a Team of 10
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-[#4169E1] mb-2">
                  {benefit.metric}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Executives Who Punch Above Their Weight
          </h2>
          
          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm">
                <p className="text-lg mb-6 italic">"{testimonial.quote}"</p>
                <div className="mb-4">
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
                <p className="text-sm text-[#4169E1] font-medium">{testimonial.result}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-[#4169E1] mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Questions from Fellow VPs
          </h2>
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#4169E1]/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Stop Working Like It's Still 2010
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Modern VPs need modern leverage. Get the AI-powered support you deserve.
          </p>
          <Button size="lg" onClick={() => setIsModalOpen(true)} className="mb-4">
            Get Your Executive Strategy Session
          </Button>
          <p className="text-gray-600 mb-8">
            45-minute session. No sales pressure. Just solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <span>✓ No credit card required</span>
            <span>✓ 2,500+ VPs already supported</span>
            <span>✓ 30-day money back guarantee</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">VP of One</h3>
            <p className="text-gray-400">
              Part of the Utlyze "Of One" suite – empowering solo professionals to achieve extraordinary results.
            </p>
          </div>
        </div>
      </footer>

      {/* Consultation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Get Your Executive Strategy Session"
      >
        <ConsultationForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}