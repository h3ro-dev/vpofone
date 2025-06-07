#!/bin/bash

# VP of One - Phase 2 Stream Launcher
# This script helps launch parallel development streams efficiently

echo "🚀 VP of One - Phase 2 Stream Launcher"
echo "=====================================\n"

# Color codes for better visibility
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Base directory
BASE_DIR=$(pwd)

# Function to launch a stream
launch_stream() {
    local STREAM_NAME=$1
    local COLOR=$2
    shift 2
    
    echo -e "${COLOR}🌊 Launching ${STREAM_NAME} Stream${NC}"
    echo "----------------------------------------"
    
    for AGENT in "$@"; do
        echo -e "${COLOR}→ ${AGENT}${NC}"
    done
    echo ""
}

# Display all streams
echo "📊 Phase 2 Development Streams:"
echo ""

launch_stream "Frontend Development" "$BLUE" \
    "Hero Section (CRITICAL)" \
    "Main Page Sections (CRITICAL)" \
    "Features Page" \
    "Pricing Page"

launch_stream "Component Library" "$GREEN" \
    "Form Components" \
    "Layout Components"

launch_stream "Backend Infrastructure" "$YELLOW" \
    "Database Schema" \
    "Email Service" \
    "Authentication"

launch_stream "Optimization & Quality" "$PURPLE" \
    "Analytics Tracking" \
    "SEO Implementation" \
    "Performance Optimization"

launch_stream "DevOps & Testing" "$RED" \
    "Deployment Configuration" \
    "Testing Framework"

echo "📋 Quick Launch Commands:"
echo ""
echo "1. CRITICAL Tasks First (Recommended):"
echo "   - Open 2 terminals for Hero & Main Sections"
echo ""
echo "2. Full Parallel Launch:"
echo "   - Open 14 terminals (or use tmux/screen)"
echo "   - Run the commands from orchestrator output"
echo ""
echo "3. Stream-by-Stream:"
echo "   - Launch one stream at a time"
echo "   - Frontend + Component Library first"
echo "   - Then Backend + Optimization"
echo "   - Finally DevOps"
echo ""

# Check if tmux is available
if command -v tmux &> /dev/null; then
    echo "💡 Tip: You have tmux installed!"
    echo "   Run: ./scripts/launch-phase2-tmux.sh"
    echo "   To auto-launch all agents in tmux panes"
fi

echo ""
echo "To see detailed commands, run:"
echo "  node scripts/agent-orchestrator-phase2.js"
echo ""

# Make this script executable
chmod +x "$0" 