#!/bin/bash
echo "Starting Upland Imports development server..."
export NODE_ENV=development
exec npx tsx server/index.ts