#!/usr/bin/env node

/**
 * VP of One - Dynamic Agent Orchestrator
 * 
 * Template for creating orchestrators for other "Of One" sites.
 * Replace VP of One, VPs and executives without adequate support staff, and customize TASK_REGISTRY.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Site-specific configuration
const SITE_CONFIG = {
  name: 'VP of One',  // e.g., 'Director of One'
  domain: 'vpofone.ai',   // e.g., 'directorofone.ai'
  targetAudience: 'VPs and executives without adequate support staff', // e.g., 'one-person department managers'
  primaryColor: '#4169E1',  // Utlyze blue (keep consistent)
  accentColor: '#9B59B6',  // Customize per site type
};

// Task Registry with Dependencies
const TASK_REGISTRY = {
  // Design & Branding Tasks
  'design-system': {
    id: 'design-system',
    name: `Create ${SITE_CONFIG.name} Design System`,
    path: 'frontend/src/styles/design-system.ts',
    dependencies: [],
    estimatedHours: 3,
    priority: 'CRITICAL',
    prompt: `Create design system for ${SITE_CONFIG.name}. Use Utlyze blue (#4169E1) as primary, ${SITE_CONFIG.accentColor} as accent. Target audience: ${SITE_CONFIG.targetAudience}. Clean, professional, trustworthy design.`,
    completionCheck: () => fs.existsSync('frontend/src/styles/design-system.ts')
  },

  // Content Creation Tasks
  'content-strategy': {
    id: 'content-strategy',
    name: `Develop ${SITE_CONFIG.name} Content`,
    dependencies: [],
    estimatedHours: 4,
    priority: 'CRITICAL',
    prompt: `Create content for ${SITE_CONFIG.name}. Target: ${SITE_CONFIG.targetAudience}. Pain points: Title responsibility without team support, Overloaded with data and reports, Competing priorities, Risk of burnout. Solution: Suite of AI executive assistants for strategy, analytics, and operations. Focus on 360° executive support, Market analysis and insights, Project management automation, Strategic opportunity alerts.`,
    completionCheck: () => fs.existsSync('content/copy/homepage.md')
  },

  // Frontend Development Tasks
  'nextjs-setup': {
    id: 'nextjs-setup',
    name: 'Initialize Next.js Project',
    dependencies: [],
    estimatedHours: 2,
    priority: 'CRITICAL',
    prompt: 'Initialize Next.js 14 with TypeScript, Tailwind CSS, App Router. Standard Utlyze setup.',
    completionCheck: () => fs.existsSync('frontend/package.json')
  },

  'component-library': {
    id: 'component-library',
    name: 'Build Component Library',
    dependencies: ['nextjs-setup', 'design-system'],
    estimatedHours: 4,
    priority: 'HIGH',
    prompt: 'Create reusable components using design system. Standard Utlyze component set.',
    completionCheck: () => fs.existsSync('frontend/src/components/ui/Button.tsx')
  },

  'landing-page': {
    id: 'landing-page',
    name: `Build ${SITE_CONFIG.name} Landing Page`,
    dependencies: ['component-library', 'content-strategy'],
    estimatedHours: 4,
    priority: 'CRITICAL',
    prompt: `Build landing page for ${SITE_CONFIG.name}. Hero, pain points, solution, features, testimonials, CTAs. Multiple consultation CTAs.`,
    completionCheck: () => fs.existsSync('frontend/src/app/page.tsx')
  },

  // Backend Tasks
  'api-setup': {
    id: 'api-setup',
    name: 'Setup API Infrastructure',
    dependencies: [],
    estimatedHours: 3,
    priority: 'HIGH',
    prompt: 'Standard Express.js API setup with TypeScript. Vercel-ready.',
    completionCheck: () => fs.existsSync('backend/src/api/server.ts')
  },

  // Add more tasks as needed...
};

// Standard orchestrator functions (same as CEO of One)
function findReadyTasks() {
  const readyTasks = [];
  const completedTasks = new Set();
  
  for (const [taskId, task] of Object.entries(TASK_REGISTRY)) {
    if (task.completionCheck && task.completionCheck()) {
      completedTasks.add(taskId);
    }
  }
  
  for (const [taskId, task] of Object.entries(TASK_REGISTRY)) {
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

function generateAgentCommands(tasks) {
  const commands = [];
  
  tasks.forEach((task, index) => {
    const command = {
      terminal: index + 1,
      name: task.name,
      command: `cd "${process.cwd()}" && CURSOR_BACKGROUND_AGENT_PROMPT="${task.prompt}" npm run background`,
      estimatedHours: task.estimatedHours,
      priority: task.priority
    };
    commands.push(command);
  });
  
  return commands;
}

function main() {
  console.log(`🚀 ${SITE_CONFIG.name} - Dynamic Agent Orchestrator\n`);
  console.log('Analyzing project state...\n');
  
  const { readyTasks, completedTasks } = findReadyTasks();
  const totalTasks = Object.keys(TASK_REGISTRY).length;
  const blockedTasks = totalTasks - completedTasks.size - readyTasks.length;
  
  console.log(`📊 Task Status:`);
  console.log(`   - Total tasks: ${totalTasks}`);
  console.log(`   - Completed: ${completedTasks.size}`);
  console.log(`   - Ready to start: ${readyTasks.length}`);
  console.log(`   - Blocked: ${blockedTasks}\n`);
  
  if (completedTasks.size > 0) {
    console.log('✅ Completed Tasks:');
    for (const taskId of completedTasks) {
      console.log(`   - ${TASK_REGISTRY[taskId].name}`);
    }
    console.log('');
  }
  
  if (readyTasks.length === 0) {
    if (completedTasks.size === totalTasks) {
      console.log(`🎉 All tasks completed! ${SITE_CONFIG.name} is ready for launch.`);
    } else {
      console.log('⏸️  No tasks are currently ready. Some tasks may be blocked by dependencies.');
    }
    return;
  }
  
  console.log(`🤖 Deploy ${readyTasks.length} Agents Right Now!\n`);
  
  const commands = generateAgentCommands(readyTasks);
  const totalHours = commands.reduce((sum, cmd) => sum + cmd.estimatedHours, 0);
  const maxHours = Math.max(...commands.map(c => c.estimatedHours));
  
  console.log(`⏱️  Estimated time: ${maxHours} hours (running in parallel)`);
  console.log(`📈 Total work: ${totalHours} hours compressed into parallel execution\n`);
  
  console.log('─'.repeat(80));
  commands.forEach(cmd => {
    console.log(`\n### Agent ${cmd.terminal}: ${cmd.name}`);
    console.log(`Priority: ${cmd.priority} | Estimated: ${cmd.estimatedHours} hours`);
    console.log('```bash');
    console.log(cmd.command);
    console.log('```');
  });
  console.log('\n' + '─'.repeat(80));
  
  console.log('\n📋 Instructions:');
  console.log('1. Open ' + commands.length + ' terminal windows or Cursor background agents');
  console.log('2. Copy and run each command above');
  console.log('3. Agents will work autonomously in parallel');
  console.log('4. Run this orchestrator again to see newly available tasks');
  
  const stateFile = path.join(process.cwd(), '.agent-orchestrator-state.json');
  const state = {
    timestamp: new Date().toISOString(),
    projectName: SITE_CONFIG.name,
    completedTasks: Array.from(completedTasks),
    readyTasks: readyTasks.map(t => t.id),
    blockedTasks,
    totalTasks,
    estimatedCompletion: `${maxHours} hours`
  };
  
  fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));
  console.log(`\n💾 State saved to ${stateFile}`);
}

if (require.main === module) {
  main();
}

module.exports = { findReadyTasks, generateAgentCommands, TASK_REGISTRY, SITE_CONFIG };