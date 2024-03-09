# Use with https://github.com/casey/just
# https://just.systems/man/en/chapter_42.html#safer-bash-shebang-recipes

alias b := build
alias w := web
alias f := fmt
alias c := clean
alias i := install
alias t := test

# Build all components (workspace unsupported at this time)
check:
    # Build the whole workspace
    cargo component c --all

# Build all components (workspace unsupported at this time)
build:
    #!/usr/bin/env bash
    set -euxo pipefail

    # Build the whole workspace
    cargo component b -r --all

    # Compose base components into higher-order packages 
    # FIXME: remove need to rename the artifacts 🤦
    ln -fs ckcompat_dr_kdf.wasm target/wasm32-wasi/release/ckcompat-dr-kdf.wasm
    # Compose CLI tool
    wasm-tools compose target/wasm32-wasi/release/cli.wasm -d target/wasm32-wasi/release/base64.wasm -d target/wasm32-wasi/release/ckcompat-dr-kdf.wasm -o target/wasm32-wasi/release/responder-cli.wasm
    # FIXME: remove need to chmod artifacts 🤦
    chmod +x target/wasm32-wasi/release/responder-cli.wasm

# Format .rs (with cargo) and .ts, .md,... (config in .dprint)
fmt:
    cargo fmt
    dprint fmt
    just --unstable --fmt

# Cleanup build artifacts
clean:
    cargo clean
    # Wipeout wasm component bindings
    find . -name "bindings.rs" -type f -delete
    find . -name "*.wasm" -type f -delete

# Install/update required tools (node, jco, dprint, cargo-component, wasm-tools, wasmtime...)
install:
    #!/usr/bin/env bash
    set -euxo pipefail
    if ! $(echo "type node" | sh > /dev/null ); then
    	echo -e "\n Manually install node, suggested: https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating\n" & exit 1
    fi
    npm install --global @bytecodealliance/jco
    cargo install dprint
    cargo install cargo-multi
    cargo install cargo-component
    cargo install wasm-tools
    curl https://wasmtime.dev/install.sh -sSf | bash

# Basic sanity test(s)
test: build
    wasmtime run --wasm component-model target/wasm32-wasi/release/responder-cli.wasm "hello base64 frenz"

# Transpile for web
web: build
    # Generate wasm base to further compose
    # wasm-tools component wit wit/responder.wit -w > target/wasm32-wasi/release/responder.wasm
    # Compose JS target wasm
    wasm-tools compose target/wasm32-wasi/release/responder.wasm -d target/wasm32-wasi/release/base64.wasm -d target/wasm32-wasi/release/ckcompat-dr-kdf.wasm -o target/wasm32-wasi/release/composed.wasm
    # # FIXME: remove need to chmod artifacts 🤦
    # chmod +x target/wasm32-wasi/release/composed.wasm

    # jco transpile target/wasm32-wasi/release/responder-js.wasm -o www
    jco transpile target/wasm32-wasi/release/composed.wasm -o www
    # Serve required files (index.html & jco genereated files minimally)
    # npx live-server www/

    # Run CLI example
    node www/cli.js
