import { base64 } from "./composed.js";

export function run(element: HTMLButtonElement) {
  let word = "click me";

  const setWord = (word: string) => {
    let utf8Encode = new TextEncoder();
    let bytes = utf8Encode.encode(word);
    let enc = base64.encodeB64(bytes);
    let dec = base64.decodeStr(enc);
    console.log("Encode:" + enc);
    console.log("Decode:" + dec);
    element.innerHTML = `Enc = ${enc} // Dec = ${dec}`;
  };
  element.addEventListener("click", () => setWord("Clicked!"));
  setWord(word);
}
