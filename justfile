# Use with https://github.com/casey/just
# https://just.systems/man/en/chapter_42.html#safer-bash-shebang-recipes

alias b := build
alias j := js
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
    # find . -name "*.wasm" -type f -delete

    # JS bindings
    # find js -name "*.wasm" -type f -delete -v
    find js -name "*.wasm" | xargs rm -vf
    rm -frv js/**/interfaces
    rm -rfv js/**/composed* -v

# Install required tools (node, jco, dprint, cargo-component, wasm-tools, wasmtime...)
install:
    #!/usr/bin/env bash
    set -euxo pipefail
    if ! $(echo "type node" | sh > /dev/null ); then
    	echo -e "\n Manually install node, suggested: https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating\n" & exit 1
    fi
    if ! $(echo "type jco" | sh > /dev/null ); then
        npm install -g @bytecodealliance/jco
    fi
    if ! $(echo "type tsc" | sh > /dev/null ); then
        npm install -g typescript typescript-language-server
    fi
    if ! $(echo "type dprint" | sh > /dev/null ); then
    cargo install dprint
    fi
    if ! $(echo "type cargo-component" | sh > /dev/null ); then
        cargo install cargo-component
    fi
    if ! $(echo "type wasm-tools" | sh > /dev/null ); then
        cargo install wasm-tools
    fi
    if ! $(echo "type wasmtime" | sh > /dev/null ); then
        curl https://wasmtime.dev/install.sh -sSf | bash
    fi
    # install deps for web
    npm i

# Force updates and manual rebuilds of all installs (you likely want `just install`).
update:
    #!/usr/bin/env bash
    set -euxo pipefail
    if ! $(echo "type node" | sh > /dev/null ); then
    	echo -e "\n Manually install node, suggested: https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating\n" & exit 1
    fi
    npm install -g @bytecodealliance/jco
    npm install -g typescript typescript-language-server
    cargo install --force dprint
    cargo install --force cargo-component
    cargo install --force wasm-tools
    curl https://wasmtime.dev/install.sh -sSf | bash
    # install deps for web
    npm i

# Basic sanity test(s)
test: build
    wasmtime run --wasm component-model target/wasm32-wasi/release/responder-cli.wasm "hello base64 frenz"

# Transpile for web
js: build
    # Compose JS target wasm
    wasm-tools compose target/wasm32-wasi/release/responder.wasm -d target/wasm32-wasi/release/base64.wasm -d target/wasm32-wasi/release/ckcompat-dr-kdf.wasm -o target/wasm32-wasi/release/composed.wasm
    # # FIXME: remove need to chmod artifacts 🤦
    # chmod +x target/wasm32-wasi/release/composed.wasm

    jco transpile target/wasm32-wasi/release/composed.wasm -o js/wasm

    # Run CLI example
    tsc  js/node-cli/cli.ts -m es6
    node js/node-cli/cli.js

    ######################
    # Vite demo 
    # Serve required files (index.html & jco genereated files minimally)
    npm run open --prefix js/vite
