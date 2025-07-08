#!/bin/bash
# Vercel build script

echo "Building frontend..."
npm run build

echo "Copying images to dist directory..."
# Copy uploads directory to dist for Vercel deployment
mkdir -p dist/public/uploads
cp -r uploads/* dist/public/uploads/

# Also copy to root level for static serving
mkdir -p dist/uploads
cp -r uploads/* dist/uploads/

echo "Build complete!"