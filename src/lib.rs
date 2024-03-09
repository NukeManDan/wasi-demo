// // Dummy file, needed for generation of wasm from ../wit/responder.wit
mod bindings;
use bindings::exports::ss::responder::base64::Guest as BaseG;
use bindings::exports::ss::responder::ckcompact_dr_kdf::Guest as BaseC;
bindings::export!(App with_types_in bindings);

struct App;

impl BaseG for App {
    fn decode_str(b64_str: String) -> String {
        bindings::ss::responder::base64::decode_str(b64_str.as_str())
    }

    fn encode_b64(bytes: Vec<u8>) -> String {
        bindings::ss::responder::base64::encode_b64(&bytes)
    }
}

impl BaseC for App {
    fn kdf_rk(rk: Vec<u8>, dh_out: Vec<u8>, info: Vec<u8>) -> (Vec<u8>, Vec<u8>) {
        bindings::ss::responder::ckcompact_dr_kdf::kdf_rk(&rk, &dh_out, &info)
    }

    fn kdf_ck(ck: Vec<u8>) -> (Vec<u8>, Vec<u8>) {
        bindings::ss::responder::ckcompact_dr_kdf::kdf_ck(&ck)
    }
}
