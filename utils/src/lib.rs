use base64::{alphabet, engine, read, write};
use std::io::{Cursor, Read, Write};
use std::str;

mod bindings;
use crate::bindings::exports::ss::utils::base64::Guest;

struct Component;

impl Guest for Component {
    /// decode a base64 string. This will percent decode the string
    /// then process it with a standard base64 alphabet set
    /// - parameter b64_str - is the reference str to be decoded
    /// - returns a utf8 string or an empty string
    fn decode_str(b64_str: wit_bindgen::rt::string::String) -> wit_bindgen::rt::string::String {
        let bytes = Component::decode_b64(b64_str.as_str());
        let str = str::from_utf8(&bytes).unwrap_or("");
        str.to_string()
    }

    /// base64 encode an array of u8 using a standards alphabet set
    /// and using padding
    /// - parameter input the &[u8] to encode
    /// - returns the base64 encoded String
    fn encode_b64(bytes: wit_bindgen::rt::vec::Vec<u8>) -> wit_bindgen::rt::string::String {
        let engine = engine::GeneralPurpose::new(&alphabet::STANDARD, engine::general_purpose::PAD);

        let mut enc = write::EncoderStringWriter::new(&engine);
        enc.write_all(bytes.as_slice()).unwrap();
        // get the resulting String
        enc.into_inner()
    }
}

impl Component {
    /// decode a base64 string. This will percent decode the string
    /// then process it with a standard base64 alphabet set
    /// - parameter b64_str - is the reference str to be decoded
    /// - returns a Vector of the decoded data as bytes (u8)
    fn decode_b64(b64_str: &str) -> Vec<u8> {
        let pd = percent_encoding::percent_decode_str(b64_str);
        let b64_str = pd.decode_utf8().unwrap();
        let mut wrapped_reader = Cursor::new(b64_str.as_bytes());
        let mut decoder =
            read::DecoderReader::new(&mut wrapped_reader, &engine::general_purpose::STANDARD);
        // handle errors as you normally would
        let mut result = Vec::new();
        // FIXME: panic if passed anything but correct base64 data!
        decoder.read_to_end(&mut result).unwrap();
        result
        // let array_result = to_array32::<u8, 32>(result);
    }

    // /// A helper function to convert a Vec to an array of a known size
    // /// WARNING this will panic if it fails
    // /// # Example usage
    // /// ```rust
    // /// let v: Vec<u8> = vec![1,3,67,145];
    // /// let array: [u8; 4] = to_array32::<u8, 4>(v);
    // /// ```
    // fn to_array32<T, const N: usize>(v: Vec<T>) -> [T; N] {
    //     v.try_into().unwrap_or_else(|v: Vec<T>| {
    //         panic!("Expected a Vec of length {} but it was {}", N, v.len())
    //     })
    // }
}

// #[cfg(test)]
// mod tests {
//     use super::*;
// }
