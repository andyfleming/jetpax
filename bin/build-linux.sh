#!/usr/bin/env bash

# NOTE: Should be run from top-level directory of project

set -euo pipefail


#docker run --rm --user "$(id -u)":"$(id -g)" -v "$PWD":/usr/src/myapp -w /usr/src/myapp rust:1.33-slim which rustup
#docker run --rm --user "$(id -u)":"$(id -g)" -v "$PWD":/usr/src/myapp -w /usr/src/myapp rust:1.33-slim rustup override set nightly && cargo build --release --target x86_64-unknown-linux-gnu
#docker run --rm --user "$(id -u)":"$(id -g)" -v "$PWD":/usr/src/myapp -w /usr/src/myapp rustlang/rust:nightly-slim cargo build --release --target x86_64-unknown-linux-gnu

cd bin
docker build -t jetpax-builder:latest .
cd ..
#docker run --rm --user "$(id -u)":"$(id -g)" -v "$PWD":/usr/src/myapp jetpax-builder:latest cargo build --release --target x86_64-unknown-linux-musl
docker run --rm --user "$(id -u)":"$(id -g)" -v "$PWD":/usr/src/myapp jetpax-builder:latest cargo build --release --target x86_64-unknown-linux-gnu
