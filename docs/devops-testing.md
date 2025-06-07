# DevOps & Testing Documentation

## Overview

This document provides comprehensive documentation for the VPOfOne DevOps deployment configuration and testing framework.

## Table of Contents

1. [Deployment Configuration](#deployment-configuration)
2. [Testing Framework](#testing-framework)
3. [CI/CD Pipeline](#cicd-pipeline)
4. [Scripts & Commands](#scripts--commands)
5. [Environment Configuration](#environment-configuration)

## Deployment Configuration

### Docker Setup

The project uses Docker for containerization with separate Dockerfiles for frontend and backend:

- **Frontend (`Dockerfile.frontend`)**: Multi-stage build with Node.js for building and nginx for serving
- **Backend (`Dockerfile.backend`)**: Node.js with production optimizations and proper signal handling

### Docker Compose Environments

1. **Production** (`docker-compose.yml`): Full production stack with PostgreSQL and Redis
2. **Development** (`docker-compose.dev.yml`): Hot-reloading enabled with volume mounts
3. **Testing** (`docker-compose.test.yml`): Isolated test environment with temporary databases

### Deployment Methods

The project supports multiple deployment targets:

#### 1. Kubernetes
```bash
# Deploy to Kubernetes
./scripts/deploy.sh production all

# Files needed:
- kubernetes/deployment.yaml
- kubernetes/namespace.yaml
- kubernetes/configmap-[environment].yaml
- kubernetes/secrets-[environment].yaml
```

#### 2. AWS ECS
```bash
# Deploy to AWS ECS
DEPLOY_METHOD=ecs ./scripts/deploy.sh production all

# Configure AWS credentials first:
aws configure
```

#### 3. Docker Swarm
```bash
# Deploy to Docker Swarm
DEPLOY_METHOD=swarm ./scripts/deploy.sh production all
```

### Health Checks

All services include health check endpoints:
- Frontend: `/` (HTTP 200)
- Backend: `/health` (HTTP 200)

## Testing Framework

### Test Types

1. **Unit Tests**: Jest for both frontend and backend
2. **Integration Tests**: Backend API testing with test database
3. **E2E Tests**: Cypress for full user flow testing

### Jest Configuration

- **Root Config** (`jest.config.js`): Manages both frontend and backend tests
- **Frontend** (`frontend/jest.config.js`): Configured for React/TypeScript with jsdom
- **Backend** (`backend/jest.config.js`): Node.js environment with TypeScript

### Coverage Requirements

Global coverage thresholds:
- Branches: 80%
- Functions: 80%
- Lines: 80%
- Statements: 80%

### Cypress E2E Testing

Configuration includes:
- Custom commands for authentication and database operations
- Support for both E2E and component testing
- Automatic retries in CI environment

## CI/CD Pipeline

### GitHub Actions Workflows

#### 1. CI Workflow (`.github/workflows/ci.yml`)
Runs on every push and pull request:
- Linting
- Unit tests
- Integration tests
- Docker image builds
- E2E tests

#### 2. Deploy Workflow (`.github/workflows/deploy.yml`)
Triggered on main branch pushes:
- Build and push Docker images to registry
- Deploy to production/staging based on branch
- Support for AWS ECS and Kubernetes deployments

### Running CI/CD Locally

```bash
# Run all tests locally
npm run test:all

# Run specific test types
npm run test:unit
npm run test:integration
npm run test:e2e
```

## Scripts & Commands

### Development Commands

```bash
# Start development environment
npm run docker:dev

# Run development server
npm run dev

# Build production assets
npm run build
```

### Testing Commands

```bash
# Run all tests
npm run test:all

# Run unit tests with coverage
npm run test:coverage

# Run E2E tests with UI
npm run cy:open

# Run E2E tests headless
npm run cy:run

# Run linting
npm run lint

# Run type checking
npm run type-check
```

### Deployment Commands

```bash
# Deploy to production
npm run deploy:production

# Deploy to staging
npm run deploy:staging

# Deploy only frontend
npm run deploy:frontend

# Deploy only backend
npm run deploy:backend
```

### Database Commands

```bash
# Run development migrations
npm run migrate:dev

# Run production migrations
npm run migrate:deploy
```

## Environment Configuration

### Environment Variables

Create `.env.[environment]` files for each environment:

```bash
# .env.production
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db
REDIS_URL=redis://host:6379
JWT_SECRET=your-secret-key
FRONTEND_URL=https://vpofone.com
BACKEND_URL=https://api.vpofone.com

# .env.staging
NODE_ENV=staging
DATABASE_URL=postgresql://user:pass@host:5432/db_staging
# ... etc
```

### Required Secrets for CI/CD

Configure these secrets in GitHub repository settings:

- `AWS_ACCESS_KEY_ID`: AWS credentials for ECS deployment
- `AWS_SECRET_ACCESS_KEY`: AWS secret key
- `KUBE_CONFIG`: Base64 encoded kubeconfig for Kubernetes
- `DOCKER_USERNAME`: Docker Hub username (if using Docker Hub)
- `DOCKER_PASSWORD`: Docker Hub password

### Test Environment

The test environment uses separate ports and databases:
- Frontend: http://localhost:3001
- Backend: http://localhost:3000
- PostgreSQL: localhost:5433
- Redis: localhost:6380

## Best Practices

### Security
- All production images run as non-root users
- Secrets are managed through environment variables and secret management systems
- Security headers are configured in nginx
- Regular dependency audits with `npm audit`

### Performance
- Multi-stage Docker builds for smaller images
- Build caching in CI/CD pipelines
- Health checks for all services
- Proper resource limits in Kubernetes deployments

### Monitoring
- Health check endpoints for all services
- Structured logging in backend services
- Error tracking integration ready

### Backup & Recovery
- Database backup scripts can be added to `scripts/` directory
- Consider implementing automated backup solutions
- Document recovery procedures

## Troubleshooting

### Common Issues

1. **Docker build fails**
   - Check Docker daemon is running
   - Ensure sufficient disk space
   - Clear Docker cache: `docker system prune -a`

2. **Tests fail in CI but pass locally**
   - Check environment variables
   - Ensure test database is properly seeded
   - Look for timing issues in E2E tests

3. **Deployment fails**
   - Verify credentials and permissions
   - Check service health endpoints
   - Review deployment logs

### Debug Commands

```bash
# View Docker logs
docker-compose logs -f [service-name]

# Check Kubernetes pods
kubectl get pods -n vpofone
kubectl describe pod [pod-name] -n vpofone

# Test database connection
docker exec -it [postgres-container] psql -U postgres
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Jest Documentation](https://jestjs.io/docs/)
- [Cypress Documentation](https://docs.cypress.io/)