# Use with https://github.com/casey/just
# https://just.systems/man/en/chapter_42.html#safer-bash-shebang-recipes

alias b := build
alias f := fmt
alias c := check
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
    wasm-tools compose target/wasm32-wasi/release/cli.wasm -d target/wasm32-wasi/release/utils.wasm -o responder.wasm

    # # We need to transpile to extract/generate bindings for JS
    # # We do want to *ommit* anything related to syscalls, that wasi wants
    # # Thus use the composed, not the command output.
    # jco transpile ss-responder.wasm -o www
    # # Serve required files (index.html & jco genereated files minimally)
    # npx live-server www/

    # # Run CLI example
    # node www/cli-calc.js

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
test:
    wasmtime run --wasm component-model responder.wasm SGVsbG8gYmFzZTY0IGZyZW56
