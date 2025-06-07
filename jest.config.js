module.exports = {
  projects: [
    '<rootDir>/frontend/jest.config.js',
    '<rootDir>/backend/jest.config.js'
  ],
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/*.config.js',
    '!**/coverage/**',
    '!**/dist/**',
    '!**/build/**'
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};