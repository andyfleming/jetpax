#!/usr/bin/env bash

#docker run --rm --user "$(id -u)":"$(id -g)" -v "$PWD":/usr/src/myapp -w /usr/src/myapp rust:1.33-slim which rustup
#docker run --rm --user "$(id -u)":"$(id -g)" -v "$PWD":/usr/src/myapp -w /usr/src/myapp rust:1.33-slim rustup override set nightly && cargo build --release --target x86_64-unknown-linux-gnu
#docker run --rm --user "$(id -u)":"$(id -g)" -v "$PWD":/usr/src/myapp -w /usr/src/myapp rustlang/rust:nightly-slim cargo build --release --target x86_64-unknown-linux-gnu
#docker run --rm --user "$(id -u)":"$(id -g)" -v "$PWD":/usr/src/myapp -w /usr/src/myapp rustlang/rust:nightly-slim cargo build --release --target x86_64-unknown-linux-musl
