#!/bin/bash
set -e

echo "Building frontend with optimizations..."

# Set Node.js memory limit to handle large builds
export NODE_OPTIONS="--max-old-space-size=4096"

# Build with reduced logging to avoid timeouts
npx vite build --logLevel=warn

echo "Building server..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

echo "Copying uploads to dist directory..."
mkdir -p dist/public/uploads
if [ -d "uploads" ]; then
  cp -r uploads/* dist/public/uploads/
  echo "Uploads copied successfully"
else
  echo "Warning: uploads directory not found"
fi

echo "Build complete!"