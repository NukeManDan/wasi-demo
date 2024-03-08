use clap::Parser;

mod bindings;
use bindings::ss::responder::base64::decode_str;

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
