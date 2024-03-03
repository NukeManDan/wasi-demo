# Build wasm components

# Following workflow in https://github.com/NukeManDan/component-docs/blob/main/component-model/examples/tutorial/README.md

(cd utils && cargo component b -r)
(cd cli   && cargo component b -r)

# Compose base components into higher-order packages 
wasm-tools compose cli/target/wasm32-wasi/release/cli.wasm -d utils/target/wasm32-wasi/release/utils.wasm -o cli.wasm

# # We need to transpile to extract/generate bindings for JS
# # We do want to *ommit* anything related to syscalls, that wasi wants
# # Thus use the composed, not the command output.
# jco transpile ss-responder.wasm -o www
# # Serve required files (index.html & jco genereated files minimally)
# npx live-server www/

# # Run CLI example
# node www/cli-calc.js
