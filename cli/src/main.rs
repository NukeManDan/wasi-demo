use clap::Parser;

mod bindings;
use bindings::ss::responder::{base64, ckcompact_dr_kdf};

#[derive(Parser)]
#[clap(version = env!("CARGO_PKG_VERSION"))]
struct Command {
    x: String,
}

impl Command {
    fn run(self) {
        let enc = base64::encode_b64(&self.x.as_bytes());
        let dec = base64::decode_str(&enc);
        println!("\"{}\"\nbase64: {}\ndecode: {}", self.x, enc, dec);

        let input_chain_key = [
            5u8, 219, 73, 34, 75, 198, 93, 31, 133, 177, 36, 11, 96, 135, 71, 44, 2, 28, 143, 15,
            44, 81, 97, 52, 1, 54, 216, 115, 59, 166, 124, 65,
        ];
        let (ck, mk) = ckcompact_dr_kdf::kdf_ck(&input_chain_key);
        println!("ck: {:?}\nmk: {:?}", ck, mk);
    }
}

fn main() {
    Command::parse().run()
}
