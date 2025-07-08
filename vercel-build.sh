#!/bin/bash
set -e

echo "Building frontend..."
vite build

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