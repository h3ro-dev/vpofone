// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = '3001';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
process.env.REDIS_URL = 'redis://localhost:6379';
process.env.JWT_SECRET = 'test-secret-key';

// Mock external services
jest.mock('ioredis', () => {
  const Redis = jest.requireActual('ioredis-mock');
  return Redis;
});

// Increase test timeout for integration tests
jest.setTimeout(30000);

// Clean up after tests
afterAll(async () => {
  // Close database connections
  const { prisma } = await import('./lib/prisma');
  await prisma.$disconnect();
  
  // Close Redis connections
  const { redis } = await import('./lib/redis');
  redis.disconnect();
});