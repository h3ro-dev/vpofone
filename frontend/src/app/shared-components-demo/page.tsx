'use client';

import React from 'react';
import { HeroButton, HeroCard, HeroHeader, HeroAvatar, HeroStat } from '@h3ro-dev/ofone-ui';

export default function SharedComponentsDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <HeroHeader 
          title="VP of One"
          subtitle="Shared Components Showcase"
          variant="center"
        />
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Hero Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <HeroButton variant="primary">Primary Action</HeroButton>
            <HeroButton variant="secondary">Secondary Action</HeroButton>
            <HeroButton variant="outline">Outline Style</HeroButton>
            <HeroButton variant="ghost">Ghost Button</HeroButton>
            <HeroButton variant="destructive">Destructive</HeroButton>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Hero Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <HeroCard 
              title="Department Leadership"
              description="Lead your department with data-driven insights and strategic planning tools"
              ctaText="Lead Now"
            />
            <HeroCard 
              title="Budget Management"
              description="Control departmental budgets with advanced forecasting and allocation features"
              ctaText="Manage Budget"
            />
            <HeroCard 
              title="Team Performance"
              description="Track and optimize team performance with comprehensive analytics dashboards"
              ctaText="View Performance"
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Hero Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <HeroStat 
              label="Team Productivity"
              value="87%"
              trend={{ value: 12, isPositive: true }}
            />
            <HeroStat 
              label="Budget Variance"
              value="-2.3%"
              trend={{ value: 1.2, isPositive: true }}
            />
            <HeroStat 
              label="Projects On Track"
              value="19/21"
              trend={{ value: 2, isPositive: true }}
            />
            <HeroStat 
              label="Team Satisfaction"
              value="4.6/5"
              trend={{ value: 0.4, isPositive: true }}
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Hero Avatars</h2>
          <div className="flex items-center gap-6">
            <HeroAvatar 
              name="VP User"
              imageUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=VP"
              size="sm"
            />
            <HeroAvatar 
              name="VP User"
              imageUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=VP"
              size="md"
            />
            <HeroAvatar 
              name="VP User"
              imageUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=VP"
              size="lg"
            />
            <HeroAvatar 
              name="VP"
              size="lg"
            />
          </div>
        </section>

        <section className="text-center py-12">
          <HeroHeader 
            title="Ready to Excel as VP of One?"
            subtitle="Leverage the power of unified components across your entire department"
            variant="center"
          />
          <div className="mt-8">
            <HeroButton variant="primary" size="lg">
              Start Your VP Journey
            </HeroButton>
          </div>
        </section>
      </div>
    </div>
  );
}