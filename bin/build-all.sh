#!/usr/bin/env bash

set -euo pipefail

echo "Note: This should be run from the root directory of the project"
# TODO: consider enforcing programmatically

if [[ "$(uname)" != "Darwin" ]]; then
    echo "This script must be run on a mac."
    exit 1;
fi;

# Install UI dependencies from scratch
cd ui
npm ci

# Test UI code
npm run test:ci

# Build UI code (for "production")
npm run build

# Test rust (CLI/Server) project
cd ..
cargo test

# Build mac binary

cargo build --release

# Build linux binary
./bin/build-linux.sh
