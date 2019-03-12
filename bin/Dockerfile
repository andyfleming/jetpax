# Container for building linux version of jetpax
FROM rustlang/rust:nightly

RUN apt-get update && apt-get install -y libsqlite3-dev libpq-dev clang
# RUN rustup target add x86_64-unknown-linux-musl

WORKDIR /usr/src/myapp

ENV TARGET_CC=clang

# RUN cargo fetch
