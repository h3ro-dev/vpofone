#!/usr/bin/env node

/**
 * VP of One - Phase 2 Agent Orchestrator
 * 
 * Next wave of parallel development streams after initial setup
 */

const fs = require('fs');
const path = require('path');

// Import base configuration from phase 1
const { SITE_CONFIG } = require('./agent-orchestrator');

// Phase 2 Task Registry - Next optimal parallel streams
const PHASE2_TASKS = {
  // Stream 1: Complete Landing Page Implementation
  'landing-page-hero': {
    id: 'landing-page-hero',
    name: 'Implement Hero Section',
    dependencies: [],
    estimatedHours: 2,
    priority: 'CRITICAL',
    prompt: `Implement the hero section for VP of One landing page. Use content from content/copy/homepage.md. Include: "Punch Above Your Weight" headline, subheadline, dual CTAs (primary: "Get Your Executive Strategy Session", secondary: "See How It Works"), and 3 supporting points. Use design system colors and Button component. Make it compelling and conversion-focused.`,
    completionCheck: () => {
      const pagePath = 'frontend/src/app/page.tsx';
      if (!fs.existsSync(pagePath)) return false;
      const content = fs.readFileSync(pagePath, 'utf-8');
      return content.includes('Punch Above Your Weight') && content.includes('Get Your Executive Strategy Session');
    }
  },

  'landing-page-sections': {
    id: 'landing-page-sections',
    name: 'Implement Main Page Sections',
    dependencies: [],
    estimatedHours: 3,
    priority: 'CRITICAL',
    prompt: `Implement main sections for VP of One landing page: Pain Points (4 pain points with icons), Solution (4 AI assistants), Benefits (metrics and outcomes), How It Works (4 steps). Use content from content/copy/homepage.md. Create reusable section components. Professional, clean design.`,
    completionCheck: () => fs.existsSync('frontend/src/components/sections/PainPoints.tsx')
  },

  // Stream 2: Expand Component Library
  'ui-components-forms': {
    id: 'ui-components-forms',
    name: 'Build Form Components',
    dependencies: [],
    estimatedHours: 3,
    priority: 'HIGH',
    prompt: `Create form components for VP of One: Input, Textarea, Select, Checkbox, Radio, FormField (with label/error), and ConsultationForm component. Use design system. Include proper TypeScript types, accessibility, and validation states.`,
    completionCheck: () => fs.existsSync('frontend/src/components/ui/Input.tsx')
  },

  'ui-components-layout': {
    id: 'ui-components-layout',
    name: 'Build Layout Components',
    dependencies: [],
    estimatedHours: 2,
    priority: 'HIGH',
    prompt: `Create layout components: Container, Section, Grid, Card, Badge, and Divider. Follow design system spacing and responsive breakpoints. Include TypeScript interfaces and proper className handling.`,
    completionCheck: () => fs.existsSync('frontend/src/components/ui/Container.tsx')
  },

  // Stream 3: Database & Authentication
  'database-setup': {
    id: 'database-setup',
    name: 'Set Up Database Schema',
    dependencies: [],
    estimatedHours: 3,
    priority: 'HIGH',
    prompt: `Design and implement PostgreSQL database schema for VP of One. Tables: consultations, contacts, newsletter_subscribers, analytics_events, conversions. Create Prisma schema file with proper relations and indexes. Include migration files.`,
    completionCheck: () => fs.existsSync('backend/prisma/schema.prisma')
  },

  'auth-implementation': {
    id: 'auth-implementation',
    name: 'Implement Authentication',
    dependencies: [],
    estimatedHours: 3,
    priority: 'MEDIUM',
    prompt: `Implement JWT-based authentication for VP of One admin panel. Create auth middleware, login/logout endpoints, and session management. Use bcrypt for passwords, include refresh tokens. Secure but simple.`,
    completionCheck: () => fs.existsSync('backend/src/api/middleware/auth.ts')
  },

  // Stream 4: Additional Pages
  'features-page': {
    id: 'features-page',
    name: 'Create Features Page',
    dependencies: [],
    estimatedHours: 2,
    priority: 'MEDIUM',
    prompt: `Create detailed features page for VP of One. Showcase each AI assistant (Strategic Analysis, Operations Excellence, Data & Analytics, Communication) with detailed capabilities, use cases, and benefits. Use existing components and design system.`,
    completionCheck: () => fs.existsSync('frontend/src/app/features/page.tsx')
  },

  'pricing-page': {
    id: 'pricing-page',
    name: 'Create Pricing Page',
    dependencies: [],
    estimatedHours: 2,
    priority: 'MEDIUM',
    prompt: `Create pricing page with custom pricing approach for VP of One. Include pricing philosophy, what's included, ROI calculator component, and consultation CTA. Emphasize value over cost.`,
    completionCheck: () => fs.existsSync('frontend/src/app/pricing/page.tsx')
  },

  // Stream 5: Integrations & Analytics
  'analytics-integration': {
    id: 'analytics-integration',
    name: 'Integrate Analytics Tracking',
    dependencies: [],
    estimatedHours: 2,
    priority: 'HIGH',
    prompt: `Implement analytics tracking throughout VP of One site. Create useAnalytics hook, track pageviews, CTA clicks, form submissions, scroll depth. Set up Google Analytics 4 and custom event tracking. Privacy-compliant with cookie consent.`,
    completionCheck: () => fs.existsSync('frontend/src/hooks/useAnalytics.ts')
  },

  'email-integration': {
    id: 'email-integration',
    name: 'Set Up Email Service',
    dependencies: [],
    estimatedHours: 2,
    priority: 'HIGH',
    prompt: `Integrate email service for VP of One. Set up SendGrid or similar, create email templates (welcome, consultation confirmation, newsletter), implement send functions. Beautiful, responsive email designs matching brand.`,
    completionCheck: () => fs.existsSync('backend/src/services/email.ts')
  },

  // Stream 6: Performance & SEO
  'seo-optimization': {
    id: 'seo-optimization',
    name: 'Implement SEO Best Practices',
    dependencies: [],
    estimatedHours: 2,
    priority: 'HIGH',
    prompt: `Optimize VP of One for SEO. Implement proper meta tags, Open Graph, structured data for local business, XML sitemap, robots.txt. Create SEO component for easy page-level customization. Target keywords around "VP AI assistant" and "executive support".`,
    completionCheck: () => fs.existsSync('frontend/src/components/SEO.tsx')
  },

  'performance-optimization': {
    id: 'performance-optimization',
    name: 'Optimize Performance',
    dependencies: [],
    estimatedHours: 2,
    priority: 'MEDIUM',
    prompt: `Optimize VP of One performance. Implement image optimization, lazy loading, code splitting, font optimization. Set up proper caching headers, compress assets. Target 95+ Lighthouse score.`,
    completionCheck: () => fs.existsSync('frontend/next.config.js') && fs.readFileSync('frontend/next.config.js', 'utf-8').includes('images')
  },

  // Stream 7: Testing & Documentation
  'testing-setup': {
    id: 'testing-setup',
    name: 'Set Up Testing Framework',
    dependencies: [],
    estimatedHours: 2,
    priority: 'MEDIUM',
    prompt: `Set up testing for VP of One. Configure Jest and React Testing Library for frontend, Jest for backend. Write initial tests for critical paths: consultation booking, form validation, API endpoints. Include test utilities and mocks.`,
    completionCheck: () => fs.existsSync('frontend/jest.config.js')
  },

  'deployment-config': {
    id: 'deployment-config',
    name: 'Configure Deployment',
    dependencies: [],
    estimatedHours: 2,
    priority: 'HIGH',
    prompt: `Set up deployment configuration for VP of One. Create Vercel configuration for frontend, backend deployment setup. Include environment variable management, preview deployments, and production build optimization.`,
    completionCheck: () => fs.existsSync('vercel.json') || fs.existsSync('frontend/vercel.json')
  }
};

// Stream categorization for optimal parallelization
const STREAMS = {
  'Frontend Development': ['landing-page-hero', 'landing-page-sections', 'features-page', 'pricing-page'],
  'Component Library': ['ui-components-forms', 'ui-components-layout'],
  'Backend Infrastructure': ['database-setup', 'auth-implementation', 'email-integration'],
  'Optimization & Quality': ['seo-optimization', 'performance-optimization', 'analytics-integration'],
  'DevOps & Testing': ['testing-setup', 'deployment-config']
};

function findReadyTasks() {
  const readyTasks = [];
  const completedTasks = new Set();
  
  for (const [taskId, task] of Object.entries(PHASE2_TASKS)) {
    if (task.completionCheck && task.completionCheck()) {
      completedTasks.add(taskId);
    }
  }
  
  for (const [taskId, task] of Object.entries(PHASE2_TASKS)) {
    if (completedTasks.has(taskId)) continue;
    
    const dependenciesMet = task.dependencies.every(dep => completedTasks.has(dep));
    if (dependenciesMet) {
      readyTasks.push(task);
    }
  }
  
  const priorityOrder = { 'CRITICAL': 0, 'HIGH': 1, 'MEDIUM': 2, 'LOW': 3 };
  readyTasks.sort((a, b) => {
    return (priorityOrder[a.priority] || 3) - (priorityOrder[b.priority] || 3);
  });
  
  return { readyTasks, completedTasks };
}

function generateStreamCommands(tasks) {
  const commands = [];
  const streamGroups = {};
  
  // Group tasks by stream
  for (const [streamName, taskIds] of Object.entries(STREAMS)) {
    streamGroups[streamName] = tasks.filter(task => taskIds.includes(task.id));
  }
  
  // Generate commands organized by stream
  let index = 1;
  for (const [streamName, streamTasks] of Object.entries(streamGroups)) {
    if (streamTasks.length === 0) continue;
    
    commands.push({
      streamName,
      tasks: streamTasks.map(task => ({
        terminal: index++,
        name: task.name,
        command: `cd "${process.cwd()}" && CURSOR_BACKGROUND_AGENT_PROMPT="${task.prompt}" npm run background`,
        estimatedHours: task.estimatedHours,
        priority: task.priority
      }))
    });
  }
  
  return commands;
}

function main() {
  console.log(`🚀 ${SITE_CONFIG.name} - Phase 2 Orchestrator\n`);
  console.log('📈 Next wave of optimal parallel development streams\n');
  
  const { readyTasks, completedTasks } = findReadyTasks();
  const totalTasks = Object.keys(PHASE2_TASKS).length;
  const blockedTasks = totalTasks - completedTasks.size - readyTasks.length;
  
  console.log(`📊 Phase 2 Status:`);
  console.log(`   - Total tasks: ${totalTasks}`);
  console.log(`   - Completed: ${completedTasks.size}`);
  console.log(`   - Ready to start: ${readyTasks.length}`);
  console.log(`   - Blocked: ${blockedTasks}\n`);
  
  if (completedTasks.size > 0) {
    console.log('✅ Completed Phase 2 Tasks:');
    for (const taskId of completedTasks) {
      console.log(`   - ${PHASE2_TASKS[taskId].name}`);
    }
    console.log('');
  }
  
  if (readyTasks.length === 0) {
    if (completedTasks.size === totalTasks) {
      console.log(`🎉 Phase 2 complete! ${SITE_CONFIG.name} is production-ready.`);
    } else {
      console.log('⏸️  No tasks are currently ready. Some tasks may be blocked by dependencies.');
    }
    return;
  }
  
  const streamCommands = generateStreamCommands(readyTasks);
  const totalAgents = readyTasks.length;
  const totalHours = readyTasks.reduce((sum, task) => sum + task.estimatedHours, 0);
  const maxHours = Math.max(...readyTasks.map(t => t.estimatedHours));
  
  console.log(`🤖 Deploy ${totalAgents} Agents Across ${streamCommands.length} Streams!\n`);
  console.log(`⏱️  Estimated time: ${maxHours} hours (parallel execution)`);
  console.log(`📈 Total work: ${totalHours} hours parallelized\n`);
  
  console.log('─'.repeat(80));
  
  streamCommands.forEach(({ streamName, tasks }) => {
    console.log(`\n## 🌊 ${streamName} Stream (${tasks.length} agents)\n`);
    tasks.forEach(task => {
      console.log(`### Agent ${task.terminal}: ${task.name}`);
      console.log(`Priority: ${task.priority} | Estimated: ${task.estimatedHours} hours`);
      console.log('```bash');
      console.log(task.command);
      console.log('```\n');
    });
  });
  
  console.log('─'.repeat(80));
  
  console.log('\n📋 Optimal Execution Strategy:');
  console.log('1. Open ' + totalAgents + ' terminal windows');
  console.log('2. Start with CRITICAL priority tasks first');
  console.log('3. Launch streams in parallel for maximum efficiency');
  console.log('4. Each stream can work independently');
  console.log('5. Re-run this orchestrator to check progress and get next tasks');
  
  console.log('\n💡 Pro Tips:');
  console.log('- Frontend and Backend streams can run simultaneously');
  console.log('- Component Library stream enables other UI work');
  console.log('- Start optimization streams after core features');
  
  // Save state
  const stateFile = path.join(process.cwd(), '.agent-orchestrator-phase2-state.json');
  const state = {
    phase: 2,
    timestamp: new Date().toISOString(),
    projectName: SITE_CONFIG.name,
    completedTasks: Array.from(completedTasks),
    readyTasks: readyTasks.map(t => t.id),
    streams: streamCommands.map(s => ({
      name: s.streamName,
      taskCount: s.tasks.length,
      tasks: s.tasks.map(t => t.name)
    })),
    estimatedCompletion: `${maxHours} hours`
  };
  
  fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));
  console.log(`\n💾 State saved to ${stateFile}`);
}

if (require.main === module) {
  main();
}

module.exports = { PHASE2_TASKS, STREAMS }; 