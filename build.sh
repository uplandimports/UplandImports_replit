#!/bin/bash
# Vercel build script

echo "Building frontend..."
export NODE_OPTIONS="--max-old-space-size=4096"
npx vite build --logLevel=error

echo "Building server..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

echo "Copying images to dist directory..."
# Copy uploads directory to dist for Vercel deployment
mkdir -p dist/public/uploads
cp -r uploads/* dist/public/uploads/

# Also copy to root level for static serving
mkdir -p dist/uploads
cp -r uploads/* dist/uploads/

echo "Build complete!"