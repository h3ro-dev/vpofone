describe('Authentication', () => {
  beforeEach(() => {
    cy.cleanDatabase();
    cy.seed('users');
  });

  describe('Login', () => {
    it('should login with valid credentials', () => {
      cy.visit('/login');
      
      // Fill in login form
      cy.get('input[name="email"]').type('user@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      
      // Should redirect to dashboard
      cy.url().should('include', '/dashboard');
      cy.contains('Welcome back').should('be.visible');
      
      // Should store auth token
      cy.window().its('localStorage.token').should('exist');
    });

    it('should show error with invalid credentials', () => {
      cy.visit('/login');
      
      cy.get('input[name="email"]').type('wrong@example.com');
      cy.get('input[name="password"]').type('wrongpassword');
      cy.get('button[type="submit"]').click();
      
      // Should show error message
      cy.contains('Invalid credentials').should('be.visible');
      
      // Should stay on login page
      cy.url().should('include', '/login');
    });

    it('should validate required fields', () => {
      cy.visit('/login');
      
      // Try to submit without filling fields
      cy.get('button[type="submit"]').click();
      
      // Should show validation errors
      cy.contains('Email is required').should('be.visible');
      cy.contains('Password is required').should('be.visible');
    });
  });

  describe('Registration', () => {
    it('should register a new user', () => {
      cy.visit('/register');
      
      // Fill registration form
      cy.get('input[name="name"]').type('New User');
      cy.get('input[name="email"]').type('newuser@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmPassword"]').type('password123');
      cy.get('button[type="submit"]').click();
      
      // Should redirect to dashboard after registration
      cy.url().should('include', '/dashboard');
      cy.contains('Welcome, New User').should('be.visible');
    });

    it('should validate password confirmation', () => {
      cy.visit('/register');
      
      cy.get('input[name="name"]').type('Test User');
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmPassword"]').type('password456');
      cy.get('button[type="submit"]').click();
      
      // Should show password mismatch error
      cy.contains('Passwords do not match').should('be.visible');
    });
  });

  describe('Logout', () => {
    beforeEach(() => {
      cy.login('user@example.com', 'password123');
    });

    it('should logout successfully', () => {
      cy.get('button[data-testid="logout-button"]').click();
      
      // Should redirect to home page
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      
      // Should remove auth token
      cy.window().its('localStorage.token').should('not.exist');
    });
  });

  describe('Protected Routes', () => {
    it('should redirect to login when accessing protected route without auth', () => {
      cy.visit('/dashboard');
      
      // Should redirect to login
      cy.url().should('include', '/login');
      cy.contains('Please login to continue').should('be.visible');
    });

    it('should allow access to protected route with auth', () => {
      cy.login('user@example.com', 'password123');
      cy.visit('/dashboard');
      
      // Should stay on dashboard
      cy.url().should('include', '/dashboard');
    });
  });
});