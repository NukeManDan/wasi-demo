export namespace SsResponderCkcompactDrKdf {
  export function kdfRk(rk: Uint8Array, dhOut: Uint8Array, info: Uint8Array): [Uint8Array, Uint8Array];
  export function kdfCk(ck: Uint8Array): [Uint8Array, Uint8Array];
}
