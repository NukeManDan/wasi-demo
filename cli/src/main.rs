use clap::Parser;

mod bindings;
use bindings::ss::utils::base64::*;

/// A CLI for executing mathematical expressions
/// using WebAssembly
#[derive(Parser)]
#[clap(name = "ss-responder", version = env!("CARGO_PKG_VERSION"))]
struct Command {
    x: wit_bindgen::rt::string::String,
}

impl Command {
    fn run(self) {
        let res = decode_str(&self.x);
        println!("{} -> {}", self.x, res);
    }
}

fn main() {
    Command::parse().run()
}
