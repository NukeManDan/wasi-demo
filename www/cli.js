// See the README for details on *generation* of the required import
import { base64 } from "./composed.js";

let utf8Encode = new TextEncoder();
let bytes = utf8Encode.encode("Wazzzzup from");

let enc = base64.encodeB64(bytes);
let dec = base64.decodeStr(enc);
console.log( "Encode:" + enc);
console.log( "Decode:" + dec);
