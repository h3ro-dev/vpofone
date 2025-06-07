#!/bin/bash

# Test runner script for VPOfOne
# Usage: ./scripts/test.sh [type] [options]
# Example: ./scripts/test.sh unit --coverage

set -e

TEST_TYPE=${1:-all}
shift

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[TEST]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

# Run unit tests
run_unit_tests() {
    print_status "Running unit tests..."
    
    # Frontend unit tests
    print_info "Running frontend unit tests..."
    cd frontend && npm test -- --watchAll=false $@
    cd ..
    
    # Backend unit tests
    print_info "Running backend unit tests..."
    cd backend && npm test -- --watchAll=false $@
    cd ..
}

# Run integration tests
run_integration_tests() {
    print_status "Running integration tests..."
    
    # Start test database
    print_info "Starting test database..."
    docker-compose -f docker-compose.test.yml up -d postgres redis
    
    # Wait for database
    sleep 5
    
    # Run backend integration tests
    cd backend && npm run test:integration $@
    cd ..
    
    # Stop test database
    docker-compose -f docker-compose.test.yml down
}

# Run E2E tests
run_e2e_tests() {
    print_status "Running E2E tests..."
    
    # Start services
    print_info "Starting services for E2E tests..."
    docker-compose -f docker-compose.test.yml up -d
    
    # Wait for services to be ready
    print_info "Waiting for services to be ready..."
    timeout 60 bash -c 'until curl -f http://localhost:3001 2>/dev/null; do sleep 2; done'
    timeout 60 bash -c 'until curl -f http://localhost:3000/health 2>/dev/null; do sleep 2; done'
    
    # Run Cypress tests
    if [[ "$1" == "--headed" ]]; then
        npm run cy:open
    else
        npm run cy:run
    fi
    
    # Stop services
    docker-compose -f docker-compose.test.yml down
}

# Run linting
run_lint() {
    print_status "Running linters..."
    
    # Frontend linting
    print_info "Linting frontend code..."
    cd frontend && npm run lint
    cd ..
    
    # Backend linting
    print_info "Linting backend code..."
    cd backend && npm run lint
    cd ..
}

# Run type checking
run_type_check() {
    print_status "Running type checks..."
    
    # Frontend type checking
    print_info "Type checking frontend..."
    cd frontend && npm run type-check
    cd ..
    
    # Backend type checking
    print_info "Type checking backend..."
    cd backend && npm run type-check
    cd ..
}

# Run security audit
run_security_audit() {
    print_status "Running security audit..."
    
    # Frontend audit
    print_info "Auditing frontend dependencies..."
    cd frontend && npm audit
    cd ..
    
    # Backend audit
    print_info "Auditing backend dependencies..."
    cd backend && npm audit
    cd ..
}

# Generate test report
generate_report() {
    print_status "Generating test report..."
    
    # Merge coverage reports
    npx nyc merge coverage coverage/merged
    npx nyc report --reporter=html --reporter=text --report-dir=coverage/final
    
    print_info "Test report generated at: coverage/final/index.html"
}

# Main function
main() {
    case "$TEST_TYPE" in
        unit)
            run_unit_tests $@
            ;;
        integration)
            run_integration_tests $@
            ;;
        e2e)
            run_e2e_tests $@
            ;;
        lint)
            run_lint
            ;;
        type)
            run_type_check
            ;;
        security)
            run_security_audit
            ;;
        all)
            run_lint
            run_type_check
            run_unit_tests --coverage
            run_integration_tests
            run_e2e_tests
            generate_report
            ;;
        *)
            print_error "Unknown test type: $TEST_TYPE"
            echo "Usage: $0 [unit|integration|e2e|lint|type|security|all] [options]"
            exit 1
            ;;
    esac
    
    print_status "Tests completed!"
}

# Run main function
main