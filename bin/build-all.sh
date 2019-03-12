#!/usr/bin/env bash

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NO_COLOR='\033[0m' # No Color

echo "Note: This should be run from the root directory of the project"
# TODO: consider enforcing programmatically

if [[ "$(uname)" != "Darwin" ]]; then
    echo "This script must be run on a mac."
    exit 1;
fi;

echo -e "${BLUE}-----------------------------------------------------------------------------${NO_COLOR}"
echo -e "${BLUE} Removing existing UI build artifacts... ${NO_COLOR}"
echo -e "${BLUE}-----------------------------------------------------------------------------${NO_COLOR}"

cd ui

rm -rf build

# Install UI dependencies from scratch
echo -e "${BLUE}-----------------------------------------------------------------------------${NO_COLOR}"
echo -e "${BLUE} Installing UI dependencies (from scratch)... ${NO_COLOR}"
echo -e "${BLUE}-----------------------------------------------------------------------------${NO_COLOR}"

npm ci

# Test UI code
echo -e "${BLUE}-----------------------------------------------------------------------------${NO_COLOR}"
echo -e "${BLUE} Testing UI... ${NO_COLOR}"
echo -e "${BLUE}-----------------------------------------------------------------------------${NO_COLOR}"

npm run test:ci

# Build UI code (for "production")
echo -e "${BLUE}-----------------------------------------------------------------------------${NO_COLOR}"
echo -e "${BLUE} Building UI... ${NO_COLOR}"
echo -e "${BLUE}-----------------------------------------------------------------------------${NO_COLOR}"

npm run build:ci

echo -e "${BLUE}-----------------------------------------------------------------------------${NO_COLOR}"
echo -e "${BLUE} Testing root project (CLI/Server)... ${NO_COLOR}"
echo -e "${BLUE}-----------------------------------------------------------------------------${NO_COLOR}"

cd ..
cargo test

# Build mac binary
echo -e "${BLUE}-----------------------------------------------------------------------------${NO_COLOR}"
echo -e "${BLUE} Building mac binary... ${NO_COLOR}"
echo -e "${BLUE}-----------------------------------------------------------------------------${NO_COLOR}"


cargo build --release

echo -e "${BLUE}-----------------------------------------------------------------------------${NO_COLOR}"
echo -e "${BLUE} Building linux binary (in Docker)... ${NO_COLOR}"
echo -e "${BLUE}-----------------------------------------------------------------------------${NO_COLOR}"


# Build linux binary
./bin/build-linux.sh
