# Responder with Wasm Components

## Install

We use [`just`](https://github.com/casey/just) as an alternative to `make` to make development of this app easy.

### Prerequisites

- [Install rust](https://www.rust-lang.org/tools/install)
- [Install `just`](https://github.com/casey/just?tab=readme-ov-file#installation)

```sh
# Suggested to install both:
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
cargo install just
```

### Dependencies

```sh
# Use `just` to install
just i
```

## Test

```sh
just t # build & test composed wasm with wasmtime
just j # transpile & test js for *both* `node` and mvp Vite app
```

## TODO:

- [ ] Report wasm-tools need chmod for compose correctly
- [ ] Report cargo component bindings LSP auto implements with `_rt::<type>` and you must manually remove it...
- [ ] Report jco transpiles but needs some hint at the package.json must dep on "@bytecodealliance/preview2-shim" IFF you use wasi

- [ ] How to compose wasm components into common packaged interact with ONLY wit file? So no need for dummy crate to target that wit... issues with wasm-tools needing existing wasm file AFAIK. Could you target a dummy "(component)" wat file? ... NO as you must set the imports and exports explicitly... How to make that simple?
  - MAYBE you use `wasm-tools component wit` to generate the interface in wasm THEN compose from that and deps?
    - Report need `wasm-tools component wit` to accept multiple wit files to look for interfaces etc.
  - Workspace issue? example calculator does NOT use one, and not top level crate.
- [ ] How can you get _safe_ rust by calling into Wasm components? IIUC this is impossible to guarantee, must be unsafe FFI (and why use have CABI bindings)... so need best practices. Maybe one could "decompile" rust from wasm?
- [ ] Fix needing to have node_modules AND transpile artifacts in-place for js demo

## Notes:

- See examples:
  - [Composing interdependent parts (server,client, & common middleware)](https://github.com/bytecodealliance/wasm-tools/tree/main/crates/wasm-compose/example/)
  - [Cargo Compose multiple _complete and independent_ components](https://github.com/bytecodealliance/cargo-component/issues/120)
  - [MVP compose and transpile for JS](https://github.com/bytecodealliance/component-docs/pull/100)
  - [MVP compose and transpile for JS](https://github.com/bytecodealliance/cargo-component/tree/main/example)
