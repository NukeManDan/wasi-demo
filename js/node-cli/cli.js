// See the README for details on *generation* of the required import
// import { base64 } from "../target/js/composed.js";
import { base64 } from "./composed.js";
var utf8Encode = new TextEncoder();
var bytes = utf8Encode.encode("Wazzzzup from");
var enc = base64.encodeB64(bytes);
var dec = base64.decodeStr(enc);
console.log("Encode:" + enc);
console.log("Decode:" + dec);
