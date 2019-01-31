#!/usr/bin/env bash

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NO_COLOR='\033[0m' # No Color

echo -e "${BLUE}-----------------------------------------------------------------------------${NO_COLOR}"
echo -e "${BLUE} Removing existing build artifacts... ${NO_COLOR}"
echo -e "${BLUE}-----------------------------------------------------------------------------${NO_COLOR}"

rm -rf build
rm -rf ui/build

echo ""
echo -e "${GREEN} Removed. ${NO_COLOR}"

echo ""

echo -e "${BLUE}-----------------------------------------------------------------------------${NO_COLOR}"
echo -e "${BLUE} Testing and building root project... ${NO_COLOR}"
echo -e "${BLUE}-----------------------------------------------------------------------------${NO_COLOR}"


npm test
npm run build

echo -e "${BLUE}-----------------------------------------------------------------------------${NO_COLOR}"
echo -e "${BLUE} Testing and building UI ${NO_COLOR}"
echo -e "${BLUE}-----------------------------------------------------------------------------${NO_COLOR}"

cd ui
npm run test:ci
npm run build:ci

cd ..

echo -e "${BLUE}-----------------------------------------------------------------------------${NO_COLOR}"
echo -e "${BLUE} Running np for publishing... ${NO_COLOR}"
echo -e "${BLUE}-----------------------------------------------------------------------------${NO_COLOR}"

./node_modules/.bin/np
