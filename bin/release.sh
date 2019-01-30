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
npm test
npm run build

cd ..

# Run np (publish workflow tool)
./node_modules/.bin/np
