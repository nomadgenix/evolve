#!/bin/bash

# Safe, portable deployment script for Evolve frontend to Vercel

# Resolve the absolute path of this script and set working directory to the script's folder
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR" || exit 1

echo "📦 Preparing Evolve frontend for deployment..."

# Check for package.json to validate we're in the frontend directory
if [[ ! -f "package.json" ]]; then
  echo "❌ Error: No package.json found in $SCRIPT_DIR"
  echo "Make sure you're in the frontend project folder."
  exit 1
fi

# Install Vercel CLI if not already installed
if ! command -v vercel &> /dev/null; then
  echo "⬇️ Installing Vercel CLI..."
  npm install -g vercel
fi

# Build the frontend
echo "🔧 Building frontend..."
npm install
npm run build

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel deploy --prod --confirm

echo "✅ Frontend deployment completed!"
echo "Visit the URL above to view your site."
