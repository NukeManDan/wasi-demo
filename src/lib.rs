// // Dummy file, needed for generation of wasm from ../wit/responder.wit
// mod bindings;
// use bindings::*;

mod bindings;
use bindings::exports::ss::responder::base64::Guest;

struct App;

impl Guest for App {
    fn decode_str(b64_str: String) -> String {
        bindings::ss::responder::base64::decode_str(b64_str.as_str())
    }

    fn encode_b64(bytes: Vec<u8>) -> String {
        bindings::ss::responder::base64::encode_b64(&bytes)
    }
}
