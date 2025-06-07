// ***********************************************************
// This file is processed and loaded automatically before your test files.
// You can change the location of this file or turn off processing
// with the 'supportFile' configuration option.
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Add global type declarations
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      logout(): Chainable<void>;
      seed(fixture: string): Chainable<void>;
      cleanDatabase(): Chainable<void>;
    }
  }
}

// Prevent TypeScript from reading file as legacy script
export {};

// Configure uncaught exception handling
Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false here prevents Cypress from failing the test
  if (err.message.includes('ResizeObserver')) {
    return false;
  }
  // Let other errors fail the test
  return true;
});