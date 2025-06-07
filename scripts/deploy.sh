#!/bin/bash

# Deploy script for VPOfOne
# Usage: ./scripts/deploy.sh [environment] [service]
# Example: ./scripts/deploy.sh production all

set -e

ENVIRONMENT=${1:-production}
SERVICE=${2:-all}

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[DEPLOY]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Validate environment
if [[ "$ENVIRONMENT" != "production" && "$ENVIRONMENT" != "staging" && "$ENVIRONMENT" != "development" ]]; then
    print_error "Invalid environment: $ENVIRONMENT"
    echo "Usage: $0 [production|staging|development] [all|frontend|backend]"
    exit 1
fi

# Load environment variables
if [ -f ".env.$ENVIRONMENT" ]; then
    export $(cat .env.$ENVIRONMENT | grep -v '^#' | xargs)
fi

print_status "Starting deployment to $ENVIRONMENT environment"

# Build Docker images
build_images() {
    print_status "Building Docker images..."
    
    if [[ "$SERVICE" == "all" || "$SERVICE" == "frontend" ]]; then
        print_status "Building frontend image..."
        docker build -f Dockerfile.frontend -t vpofone/frontend:$ENVIRONMENT .
    fi
    
    if [[ "$SERVICE" == "all" || "$SERVICE" == "backend" ]]; then
        print_status "Building backend image..."
        docker build -f Dockerfile.backend -t vpofone/backend:$ENVIRONMENT .
    fi
}

# Push images to registry
push_images() {
    print_status "Pushing images to registry..."
    
    if [[ "$SERVICE" == "all" || "$SERVICE" == "frontend" ]]; then
        docker push vpofone/frontend:$ENVIRONMENT
    fi
    
    if [[ "$SERVICE" == "all" || "$SERVICE" == "backend" ]]; then
        docker push vpofone/backend:$ENVIRONMENT
    fi
}

# Deploy to Kubernetes
deploy_kubernetes() {
    print_status "Deploying to Kubernetes..."
    
    # Apply configurations
    kubectl apply -f kubernetes/namespace.yaml
    kubectl apply -f kubernetes/configmap-$ENVIRONMENT.yaml
    kubectl apply -f kubernetes/secrets-$ENVIRONMENT.yaml
    
    # Update deployments
    if [[ "$SERVICE" == "all" || "$SERVICE" == "frontend" ]]; then
        kubectl set image deployment/frontend frontend=vpofone/frontend:$ENVIRONMENT -n vpofone
    fi
    
    if [[ "$SERVICE" == "all" || "$SERVICE" == "backend" ]]; then
        kubectl set image deployment/backend backend=vpofone/backend:$ENVIRONMENT -n vpofone
    fi
    
    # Wait for rollout
    if [[ "$SERVICE" == "all" || "$SERVICE" == "frontend" ]]; then
        kubectl rollout status deployment/frontend -n vpofone
    fi
    
    if [[ "$SERVICE" == "all" || "$SERVICE" == "backend" ]]; then
        kubectl rollout status deployment/backend -n vpofone
    fi
}

# Deploy to Docker Swarm
deploy_swarm() {
    print_status "Deploying to Docker Swarm..."
    
    # Update stack
    docker stack deploy -c docker-compose.$ENVIRONMENT.yml vpofone
    
    # Wait for services to be ready
    print_status "Waiting for services to be ready..."
    sleep 30
    
    # Check service status
    docker stack services vpofone
}

# Deploy to AWS ECS
deploy_ecs() {
    print_status "Deploying to AWS ECS..."
    
    # Update task definitions
    aws ecs register-task-definition --cli-input-json file://ecs/task-definition-$ENVIRONMENT.json
    
    # Update services
    if [[ "$SERVICE" == "all" || "$SERVICE" == "frontend" ]]; then
        aws ecs update-service --cluster vpofone-$ENVIRONMENT --service frontend --force-new-deployment
    fi
    
    if [[ "$SERVICE" == "all" || "$SERVICE" == "backend" ]]; then
        aws ecs update-service --cluster vpofone-$ENVIRONMENT --service backend --force-new-deployment
    fi
}

# Run database migrations
run_migrations() {
    print_status "Running database migrations..."
    
    if [[ "$ENVIRONMENT" == "production" ]]; then
        print_warning "Running production migrations - please confirm (y/n):"
        read -r confirmation
        if [[ "$confirmation" != "y" ]]; then
            print_status "Migrations cancelled"
            return
        fi
    fi
    
    # Run migrations in backend container
    docker run --rm \
        -e DATABASE_URL="$DATABASE_URL" \
        vpofone/backend:$ENVIRONMENT \
        npm run migrate:deploy
}

# Health check
health_check() {
    print_status "Performing health checks..."
    
    # Check frontend
    if [[ "$SERVICE" == "all" || "$SERVICE" == "frontend" ]]; then
        FRONTEND_URL=${FRONTEND_URL:-"https://vpofone.com"}
        if curl -f -s "$FRONTEND_URL" > /dev/null; then
            print_status "Frontend health check passed"
        else
            print_error "Frontend health check failed"
            exit 1
        fi
    fi
    
    # Check backend
    if [[ "$SERVICE" == "all" || "$SERVICE" == "backend" ]]; then
        BACKEND_URL=${BACKEND_URL:-"https://api.vpofone.com"}
        if curl -f -s "$BACKEND_URL/health" > /dev/null; then
            print_status "Backend health check passed"
        else
            print_error "Backend health check failed"
            exit 1
        fi
    fi
}

# Main deployment flow
main() {
    print_status "Deployment configuration:"
    echo "  Environment: $ENVIRONMENT"
    echo "  Service: $SERVICE"
    echo "  Deployment method: ${DEPLOY_METHOD:-kubernetes}"
    
    # Build and push images
    build_images
    push_images
    
    # Run migrations if deploying backend
    if [[ "$SERVICE" == "all" || "$SERVICE" == "backend" ]]; then
        run_migrations
    fi
    
    # Deploy based on method
    case "${DEPLOY_METHOD:-kubernetes}" in
        kubernetes)
            deploy_kubernetes
            ;;
        swarm)
            deploy_swarm
            ;;
        ecs)
            deploy_ecs
            ;;
        *)
            print_error "Unknown deployment method: $DEPLOY_METHOD"
            exit 1
            ;;
    esac
    
    # Perform health checks
    health_check
    
    print_status "Deployment completed successfully!"
}

# Run main function
main