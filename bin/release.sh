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
CI=true SKIP_PREFLIGHT_CHECK=true npm test  -- --ci # similar to https://stackoverflow.com/questions/53089122/issue-with-babel-jest-dependency-when-running-npm-start-in-a-react-app
npm run build

cd ..

# Run np (publish workflow tool)
./node_modules/.bin/np
