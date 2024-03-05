# Use with https://github.com/casey/just
# https://just.systems/man/en/chapter_42.html#safer-bash-shebang-recipes

alias b := build
alias f := fmt
alias c := clean
alias i := install

# Build all components (workspace unsupported at this time) 
build:
	#!/usr/bin/env bash
	set -euxo pipefail

	(cd utils && cargo component b -r)
	(cd cli   && cargo component b -r)

	# Compose base components into higher-order packages 
	wasm-tools compose cli/target/wasm32-wasi/release/ss-cli.wasm -d utils/target/wasm32-wasi/release/ss-utils.wasm -o ss-responder.wasm

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
	cargo multi fmt
	dprint fmt
	
# Cleanup build artifacts 
clean:
	cargo multi clean
	# Wipeout wasm component bindings
	rm -f **/**/bindings.rs
	rm -f **/**/*.wasm

# Install/update required tools (node, jco, dprint, cargo-component, wasm-tools,...)  
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
