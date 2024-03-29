//! Low-level primative functions.
//! The goal is to cause **no side-effects**, but be pure functions for use in other components.
use hkdf::Hkdf;
use hmac::{Hmac, Mac};
use sha2::Sha512;

// Module is generated by `cargo component`
// See the TLD for a script and instructions
mod bindings;
use crate::bindings::exports::ss::responder::ckcompact_dr_kdf::Guest;
bindings::export!(CkcompatDRKdf with_types_in bindings);

struct CkcompatDRKdf;

/// The interface required for binding to WASI
///
impl Guest for CkcompatDRKdf {
    fn kdf_rk(rk: Vec<u8>, dh_out: Vec<u8>, info: Vec<u8>) -> (Vec<u8>, Vec<u8>) {
        let (rk, ck) = CkcompatDRKdf::kdf_rk(rk.as_slice(), dh_out.as_slice(), info.as_slice());
        (rk.into(), ck.into())
    }

    fn kdf_ck(ck: Vec<u8>) -> (Vec<u8>, Vec<u8>) {
        let (ck, mk) = CkcompatDRKdf::kdf_ck(ck.as_slice());
        (ck.into(), mk.into())
    }
}

impl CkcompatDRKdf {
    fn kdf_rk(rk: &[u8], dh_out: &[u8], info: &[u8]) -> ([u8; 32], [u8; 32]) {
        let key = rk;
        let h = Hkdf::<Sha512>::new(Some(key), dh_out);
        let mut okm = [0u8; 64];
        h.expand(info, &mut okm).unwrap();
        let (a, b) = okm.split_at(32);
        let rk: [u8; 32] = a.try_into().expect("Incorrect length");
        let ck: [u8; 32] = b.try_into().expect("Incorrect length");
        (rk, ck)
    }

    fn kdf_ck(ck: &[u8]) -> ([u8; 32], [u8; 32]) {
        let key = ck;

        let mut mac = Hmac::<Sha512>::new_from_slice(key).expect("Invalid Key Length");
        mac.update(&[0x01]);
        let result = mac.finalize().into_bytes();
        let mut mac = Hmac::<Sha512>::new_from_slice(key).expect("Invalid Key Length");
        mac.update(&[0x02]);
        let result2 = mac.finalize().into_bytes();
        let (b, _) = result.split_at(32);
        let (a, _) = result2.split_at(32);
        let ck: [u8; 32] = a.try_into().expect("Incorrect Length");
        let mk: [u8; 32] = b.try_into().expect("Incorrect Length");
        (ck, mk)
    }
}

#[test]
fn test_kdf_ck() {
    let input_chain_key = vec![
        5u8, 219, 73, 34, 75, 198, 93, 31, 133, 177, 36, 11, 96, 135, 71, 44, 2, 28, 143, 15, 44,
        81, 97, 52, 1, 54, 216, 115, 59, 166, 124, 65,
    ];
    let expected_mk = vec![
        229u8, 167, 124, 190, 57, 135, 182, 154, 228, 175, 159, 229, 96, 200, 166, 222, 96, 203,
        27, 32, 94, 198, 255, 203, 70, 221, 209, 204, 85, 167, 247, 92,
    ];
    let expected_ck = vec![
        37u8, 21, 254, 158, 111, 196, 5, 182, 51, 248, 122, 233, 143, 62, 41, 243, 212, 179, 172,
        229, 125, 195, 198, 59, 158, 224, 61, 88, 27, 95, 177, 228,
    ];

    let (ck, mk) = CkcompatDRKdf::kdf_ck(&input_chain_key);

    assert_eq!(expected_ck.as_slice(), &ck);
    assert_eq!(expected_mk.as_slice(), &mk);
}

#[test]
fn test_kdf_rk() {
    let expected_rk = vec![
        27u8, 251, 253, 156, 127, 21, 44, 57, 63, 167, 77, 242, 158, 185, 125, 121, 104, 222, 55,
        238, 238, 77, 255, 57, 236, 44, 239, 191, 141, 199, 128, 69,
    ];
    let expected_ck = vec![
        87u8, 163, 80, 86, 167, 242, 133, 103, 148, 97, 30, 40, 36, 95, 8, 59, 221, 154, 237, 120,
        135, 53, 200, 142, 52, 11, 223, 185, 161, 88, 121, 250,
    ];

    let rk_bytes: [u8; 32] = [0; 32];
    let dh_out: [u8; 32] = [0; 32];

    let (rk, ck) = CkcompatDRKdf::kdf_rk(&rk_bytes, &dh_out, b"RVapp");

    assert_eq!(expected_ck.as_slice(), &ck);
    assert_eq!(expected_rk.as_slice(), &rk);
}
