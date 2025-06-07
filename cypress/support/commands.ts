// Custom command to login
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  
  // Wait for redirect after successful login
  cy.url().should('not.include', '/login');
  
  // Verify auth token is stored
  cy.window().its('localStorage.token').should('exist');
});

// Custom command to logout
Cypress.Commands.add('logout', () => {
  cy.window().then((window) => {
    window.localStorage.removeItem('token');
  });
  cy.visit('/');
});

// Custom command to seed database with fixture data
Cypress.Commands.add('seed', (fixture: string) => {
  cy.fixture(fixture).then((data) => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/test/seed`,
      body: data,
      headers: {
        'x-test-key': Cypress.env('testKey')
      }
    });
  });
});

// Custom command to clean database
Cypress.Commands.add('cleanDatabase', () => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/test/clean`,
    headers: {
      'x-test-key': Cypress.env('testKey')
    }
  });
});

// Custom command to intercept and wait for API calls
Cypress.Commands.add('interceptApi', (method: string, path: string, alias: string) => {
  cy.intercept(method, `${Cypress.env('apiUrl')}${path}`).as(alias);
});