use clap::Parser;

mod bindings;
// FIXME how to use bindings?
use bindings::exports::ss::utils::base64::_export_decode_str_cabi;

#[derive(Parser)]
#[clap(version = env!("CARGO_PKG_VERSION"))]
struct Command {
    x: String,
}

impl Command {
    fn run(self) {
        let res = decode_str(&self.x);
        println!("\"{}\" ->decode-> {}", self.x, res);
    }
}

fn main() {
    Command::parse().run()
}
