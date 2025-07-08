#!/bin/bash
set -e

echo "Current directory: $(pwd)"
echo "Files in current directory:"
ls -la | head -10

echo "Building frontend..."
npx vite build

echo "Creating uploads directory..."
mkdir -p dist/public/uploads

echo "Copying uploads..."
if [ -d "uploads" ]; then
    cp -r uploads/* dist/public/uploads/
    echo "Uploads copied successfully"
else
    echo "Warning: uploads directory not found"
fi

echo "Build complete!"