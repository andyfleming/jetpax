#!/usr/bin/env bash

set -euo pipefail

# Clean up build artifacts
rm -rf build
rm -rf ui/build

# Test and build root project
npm test
npm run build

# Test and build react project
cd ui
npm run test:ci
npm run build:ci

cd ..

# Run np (publish workflow tool)
./node_modules/.bin/np
