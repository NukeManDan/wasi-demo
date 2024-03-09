import { environment, exit as exit$1, stderr, stdin, stdout } from '@bytecodealliance/preview2-shim/cli';
import { preopens, types } from '@bytecodealliance/preview2-shim/filesystem';
import { error, streams } from '@bytecodealliance/preview2-shim/io';
const { getEnvironment } = environment;
const { exit } = exit$1;
const { getStderr } = stderr;
const { getStdin } = stdin;
const { getStdout } = stdout;
const { getDirectories } = preopens;
const { Descriptor,
  filesystemErrorCode } = types;
const { Error: Error$1 } = error;
const { InputStream,
  OutputStream } = streams;

const base64Compile = str => WebAssembly.compile(typeof Buffer !== 'undefined' ? Buffer.from(str, 'base64') : Uint8Array.from(atob(str), b => b.charCodeAt(0)));

let dv = new DataView(new ArrayBuffer());
const dataView = mem => dv.buffer === mem.buffer ? dv : dv = new DataView(mem.buffer);

const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
let _fs;
async function fetchCompile (url) {
  if (isNode) {
    _fs = _fs || await import('fs/promises');
    return WebAssembly.compile(await _fs.readFile(url));
  }
  return fetch(url).then(WebAssembly.compileStreaming);
}

function getErrorPayload(e) {
  if (e && hasOwnProperty.call(e, 'payload')) return e.payload;
  return e;
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

const instantiateCore = WebAssembly.instantiate;

const resourceHandleSymbol = Symbol('resource');

const symbolDispose = Symbol.dispose || Symbol.for('dispose');

const toUint64 = val => BigInt.asUintN(64, BigInt(val));

function toUint32(val) {
  return val >>> 0;
}

const utf8Decoder = new TextDecoder();

const utf8Encoder = new TextEncoder();

let utf8EncodedLen = 0;
function utf8Encode(s, realloc, memory) {
  if (typeof s !== 'string') throw new TypeError('expected a string');
  if (s.length === 0) {
    utf8EncodedLen = 0;
    return 1;
  }
  let allocLen = 0;
  let ptr = 0;
  let writtenTotal = 0;
  while (s.length > 0) {
    ptr = realloc(ptr, allocLen, 1, allocLen += s.length * 2);
    const { read, written } = utf8Encoder.encodeInto(
    s,
    new Uint8Array(memory.buffer, ptr + writtenTotal, allocLen - writtenTotal),
    );
    writtenTotal += written;
    s = s.slice(read);
  }
  utf8EncodedLen = writtenTotal;
  return ptr;
}

let exports0;
let exports1;

function trampoline4() {
  const ret = getStderr();
  if (!(ret instanceof OutputStream)) {
    throw new Error('Resource error: Not a valid "OutputStream" resource.');
  }
  var handle0 = handleCnt1++;
  handleTable1.set(handle0, { rep: ret, own: true });
  return handle0;
}

function trampoline5(arg0) {
  let variant0;
  switch (arg0) {
    case 0: {
      variant0= {
        tag: 'ok',
        val: undefined
      };
      break;
    }
    case 1: {
      variant0= {
        tag: 'err',
        val: undefined
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  exit(variant0);
}

function trampoline6() {
  const ret = getStdin();
  if (!(ret instanceof InputStream)) {
    throw new Error('Resource error: Not a valid "InputStream" resource.');
  }
  var handle0 = handleCnt2++;
  handleTable2.set(handle0, { rep: ret, own: true });
  return handle0;
}

function trampoline7() {
  const ret = getStdout();
  if (!(ret instanceof OutputStream)) {
    throw new Error('Resource error: Not a valid "OutputStream" resource.');
  }
  var handle0 = handleCnt1++;
  handleTable1.set(handle0, { rep: ret, own: true });
  return handle0;
}
let exports2;

function trampoline8(arg0) {
  const ret = getDirectories();
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc0(0, 0, 4, len3 * 12);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 12;var [tuple0_0, tuple0_1] = e;
    if (!(tuple0_0 instanceof Descriptor)) {
      throw new Error('Resource error: Not a valid "Descriptor" resource.');
    }
    var handle1 = handleCnt3++;
    handleTable3.set(handle1, { rep: tuple0_0, own: true });
    dataView(memory0).setInt32(base + 0, handle1, true);
    var ptr2 = utf8Encode(tuple0_1, realloc0, memory0);
    var len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 8, len2, true);
    dataView(memory0).setInt32(base + 4, ptr2, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len3, true);
  dataView(memory0).setInt32(arg0 + 0, result3, true);
}
let memory0;
let realloc0;

function trampoline9(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rsc0 = handleTable3.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: Descriptor.prototype.writeViaStream.call(rsc0, BigInt.asUintN(64, arg1)) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      if (!(e instanceof OutputStream)) {
        throw new Error('Resource error: Not a valid "OutputStream" resource.');
      }
      var handle2 = handleCnt1++;
      handleTable1.set(handle2, { rep: e, own: true });
      dataView(memory0).setInt32(arg2 + 4, handle2, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'access': {
          enum3 = 0;
          break;
        }
        case 'would-block': {
          enum3 = 1;
          break;
        }
        case 'already': {
          enum3 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum3 = 3;
          break;
        }
        case 'busy': {
          enum3 = 4;
          break;
        }
        case 'deadlock': {
          enum3 = 5;
          break;
        }
        case 'quota': {
          enum3 = 6;
          break;
        }
        case 'exist': {
          enum3 = 7;
          break;
        }
        case 'file-too-large': {
          enum3 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum3 = 9;
          break;
        }
        case 'in-progress': {
          enum3 = 10;
          break;
        }
        case 'interrupted': {
          enum3 = 11;
          break;
        }
        case 'invalid': {
          enum3 = 12;
          break;
        }
        case 'io': {
          enum3 = 13;
          break;
        }
        case 'is-directory': {
          enum3 = 14;
          break;
        }
        case 'loop': {
          enum3 = 15;
          break;
        }
        case 'too-many-links': {
          enum3 = 16;
          break;
        }
        case 'message-size': {
          enum3 = 17;
          break;
        }
        case 'name-too-long': {
          enum3 = 18;
          break;
        }
        case 'no-device': {
          enum3 = 19;
          break;
        }
        case 'no-entry': {
          enum3 = 20;
          break;
        }
        case 'no-lock': {
          enum3 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum3 = 22;
          break;
        }
        case 'insufficient-space': {
          enum3 = 23;
          break;
        }
        case 'not-directory': {
          enum3 = 24;
          break;
        }
        case 'not-empty': {
          enum3 = 25;
          break;
        }
        case 'not-recoverable': {
          enum3 = 26;
          break;
        }
        case 'unsupported': {
          enum3 = 27;
          break;
        }
        case 'no-tty': {
          enum3 = 28;
          break;
        }
        case 'no-such-device': {
          enum3 = 29;
          break;
        }
        case 'overflow': {
          enum3 = 30;
          break;
        }
        case 'not-permitted': {
          enum3 = 31;
          break;
        }
        case 'pipe': {
          enum3 = 32;
          break;
        }
        case 'read-only': {
          enum3 = 33;
          break;
        }
        case 'invalid-seek': {
          enum3 = 34;
          break;
        }
        case 'text-file-busy': {
          enum3 = 35;
          break;
        }
        case 'cross-device': {
          enum3 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 4, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline10(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable3.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: Descriptor.prototype.appendViaStream.call(rsc0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      if (!(e instanceof OutputStream)) {
        throw new Error('Resource error: Not a valid "OutputStream" resource.');
      }
      var handle2 = handleCnt1++;
      handleTable1.set(handle2, { rep: e, own: true });
      dataView(memory0).setInt32(arg1 + 4, handle2, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'access': {
          enum3 = 0;
          break;
        }
        case 'would-block': {
          enum3 = 1;
          break;
        }
        case 'already': {
          enum3 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum3 = 3;
          break;
        }
        case 'busy': {
          enum3 = 4;
          break;
        }
        case 'deadlock': {
          enum3 = 5;
          break;
        }
        case 'quota': {
          enum3 = 6;
          break;
        }
        case 'exist': {
          enum3 = 7;
          break;
        }
        case 'file-too-large': {
          enum3 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum3 = 9;
          break;
        }
        case 'in-progress': {
          enum3 = 10;
          break;
        }
        case 'interrupted': {
          enum3 = 11;
          break;
        }
        case 'invalid': {
          enum3 = 12;
          break;
        }
        case 'io': {
          enum3 = 13;
          break;
        }
        case 'is-directory': {
          enum3 = 14;
          break;
        }
        case 'loop': {
          enum3 = 15;
          break;
        }
        case 'too-many-links': {
          enum3 = 16;
          break;
        }
        case 'message-size': {
          enum3 = 17;
          break;
        }
        case 'name-too-long': {
          enum3 = 18;
          break;
        }
        case 'no-device': {
          enum3 = 19;
          break;
        }
        case 'no-entry': {
          enum3 = 20;
          break;
        }
        case 'no-lock': {
          enum3 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum3 = 22;
          break;
        }
        case 'insufficient-space': {
          enum3 = 23;
          break;
        }
        case 'not-directory': {
          enum3 = 24;
          break;
        }
        case 'not-empty': {
          enum3 = 25;
          break;
        }
        case 'not-recoverable': {
          enum3 = 26;
          break;
        }
        case 'unsupported': {
          enum3 = 27;
          break;
        }
        case 'no-tty': {
          enum3 = 28;
          break;
        }
        case 'no-such-device': {
          enum3 = 29;
          break;
        }
        case 'overflow': {
          enum3 = 30;
          break;
        }
        case 'not-permitted': {
          enum3 = 31;
          break;
        }
        case 'pipe': {
          enum3 = 32;
          break;
        }
        case 'read-only': {
          enum3 = 33;
          break;
        }
        case 'invalid-seek': {
          enum3 = 34;
          break;
        }
        case 'text-file-busy': {
          enum3 = 35;
          break;
        }
        case 'cross-device': {
          enum3 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 4, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline11(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable3.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: Descriptor.prototype.getType.call(rsc0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var val2 = e;
      let enum2;
      switch (val2) {
        case 'unknown': {
          enum2 = 0;
          break;
        }
        case 'block-device': {
          enum2 = 1;
          break;
        }
        case 'character-device': {
          enum2 = 2;
          break;
        }
        case 'directory': {
          enum2 = 3;
          break;
        }
        case 'fifo': {
          enum2 = 4;
          break;
        }
        case 'symbolic-link': {
          enum2 = 5;
          break;
        }
        case 'regular-file': {
          enum2 = 6;
          break;
        }
        case 'socket': {
          enum2 = 7;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val2}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum2, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'access': {
          enum3 = 0;
          break;
        }
        case 'would-block': {
          enum3 = 1;
          break;
        }
        case 'already': {
          enum3 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum3 = 3;
          break;
        }
        case 'busy': {
          enum3 = 4;
          break;
        }
        case 'deadlock': {
          enum3 = 5;
          break;
        }
        case 'quota': {
          enum3 = 6;
          break;
        }
        case 'exist': {
          enum3 = 7;
          break;
        }
        case 'file-too-large': {
          enum3 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum3 = 9;
          break;
        }
        case 'in-progress': {
          enum3 = 10;
          break;
        }
        case 'interrupted': {
          enum3 = 11;
          break;
        }
        case 'invalid': {
          enum3 = 12;
          break;
        }
        case 'io': {
          enum3 = 13;
          break;
        }
        case 'is-directory': {
          enum3 = 14;
          break;
        }
        case 'loop': {
          enum3 = 15;
          break;
        }
        case 'too-many-links': {
          enum3 = 16;
          break;
        }
        case 'message-size': {
          enum3 = 17;
          break;
        }
        case 'name-too-long': {
          enum3 = 18;
          break;
        }
        case 'no-device': {
          enum3 = 19;
          break;
        }
        case 'no-entry': {
          enum3 = 20;
          break;
        }
        case 'no-lock': {
          enum3 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum3 = 22;
          break;
        }
        case 'insufficient-space': {
          enum3 = 23;
          break;
        }
        case 'not-directory': {
          enum3 = 24;
          break;
        }
        case 'not-empty': {
          enum3 = 25;
          break;
        }
        case 'not-recoverable': {
          enum3 = 26;
          break;
        }
        case 'unsupported': {
          enum3 = 27;
          break;
        }
        case 'no-tty': {
          enum3 = 28;
          break;
        }
        case 'no-such-device': {
          enum3 = 29;
          break;
        }
        case 'overflow': {
          enum3 = 30;
          break;
        }
        case 'not-permitted': {
          enum3 = 31;
          break;
        }
        case 'pipe': {
          enum3 = 32;
          break;
        }
        case 'read-only': {
          enum3 = 33;
          break;
        }
        case 'invalid-seek': {
          enum3 = 34;
          break;
        }
        case 'text-file-busy': {
          enum3 = 35;
          break;
        }
        case 'cross-device': {
          enum3 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline12(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable3.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: Descriptor.prototype.stat.call(rsc0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant11 = ret;
  switch (variant11.tag) {
    case 'ok': {
      const e = variant11.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var {type: v2_0, linkCount: v2_1, size: v2_2, dataAccessTimestamp: v2_3, dataModificationTimestamp: v2_4, statusChangeTimestamp: v2_5 } = e;
      var val3 = v2_0;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'block-device': {
          enum3 = 1;
          break;
        }
        case 'character-device': {
          enum3 = 2;
          break;
        }
        case 'directory': {
          enum3 = 3;
          break;
        }
        case 'fifo': {
          enum3 = 4;
          break;
        }
        case 'symbolic-link': {
          enum3 = 5;
          break;
        }
        case 'regular-file': {
          enum3 = 6;
          break;
        }
        case 'socket': {
          enum3 = 7;
          break;
        }
        default: {
          if ((v2_0) instanceof Error) {
            console.error(v2_0);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum3, true);
      dataView(memory0).setBigInt64(arg1 + 16, toUint64(v2_1), true);
      dataView(memory0).setBigInt64(arg1 + 24, toUint64(v2_2), true);
      var variant5 = v2_3;
      if (variant5 === null || variant5=== undefined) {
        dataView(memory0).setInt8(arg1 + 32, 0, true);
      } else {
        const e = variant5;
        dataView(memory0).setInt8(arg1 + 32, 1, true);
        var {seconds: v4_0, nanoseconds: v4_1 } = e;
        dataView(memory0).setBigInt64(arg1 + 40, toUint64(v4_0), true);
        dataView(memory0).setInt32(arg1 + 48, toUint32(v4_1), true);
      }
      var variant7 = v2_4;
      if (variant7 === null || variant7=== undefined) {
        dataView(memory0).setInt8(arg1 + 56, 0, true);
      } else {
        const e = variant7;
        dataView(memory0).setInt8(arg1 + 56, 1, true);
        var {seconds: v6_0, nanoseconds: v6_1 } = e;
        dataView(memory0).setBigInt64(arg1 + 64, toUint64(v6_0), true);
        dataView(memory0).setInt32(arg1 + 72, toUint32(v6_1), true);
      }
      var variant9 = v2_5;
      if (variant9 === null || variant9=== undefined) {
        dataView(memory0).setInt8(arg1 + 80, 0, true);
      } else {
        const e = variant9;
        dataView(memory0).setInt8(arg1 + 80, 1, true);
        var {seconds: v8_0, nanoseconds: v8_1 } = e;
        dataView(memory0).setBigInt64(arg1 + 88, toUint64(v8_0), true);
        dataView(memory0).setInt32(arg1 + 96, toUint32(v8_1), true);
      }
      break;
    }
    case 'err': {
      const e = variant11.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val10 = e;
      let enum10;
      switch (val10) {
        case 'access': {
          enum10 = 0;
          break;
        }
        case 'would-block': {
          enum10 = 1;
          break;
        }
        case 'already': {
          enum10 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum10 = 3;
          break;
        }
        case 'busy': {
          enum10 = 4;
          break;
        }
        case 'deadlock': {
          enum10 = 5;
          break;
        }
        case 'quota': {
          enum10 = 6;
          break;
        }
        case 'exist': {
          enum10 = 7;
          break;
        }
        case 'file-too-large': {
          enum10 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum10 = 9;
          break;
        }
        case 'in-progress': {
          enum10 = 10;
          break;
        }
        case 'interrupted': {
          enum10 = 11;
          break;
        }
        case 'invalid': {
          enum10 = 12;
          break;
        }
        case 'io': {
          enum10 = 13;
          break;
        }
        case 'is-directory': {
          enum10 = 14;
          break;
        }
        case 'loop': {
          enum10 = 15;
          break;
        }
        case 'too-many-links': {
          enum10 = 16;
          break;
        }
        case 'message-size': {
          enum10 = 17;
          break;
        }
        case 'name-too-long': {
          enum10 = 18;
          break;
        }
        case 'no-device': {
          enum10 = 19;
          break;
        }
        case 'no-entry': {
          enum10 = 20;
          break;
        }
        case 'no-lock': {
          enum10 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum10 = 22;
          break;
        }
        case 'insufficient-space': {
          enum10 = 23;
          break;
        }
        case 'not-directory': {
          enum10 = 24;
          break;
        }
        case 'not-empty': {
          enum10 = 25;
          break;
        }
        case 'not-recoverable': {
          enum10 = 26;
          break;
        }
        case 'unsupported': {
          enum10 = 27;
          break;
        }
        case 'no-tty': {
          enum10 = 28;
          break;
        }
        case 'no-such-device': {
          enum10 = 29;
          break;
        }
        case 'overflow': {
          enum10 = 30;
          break;
        }
        case 'not-permitted': {
          enum10 = 31;
          break;
        }
        case 'pipe': {
          enum10 = 32;
          break;
        }
        case 'read-only': {
          enum10 = 33;
          break;
        }
        case 'invalid-seek': {
          enum10 = 34;
          break;
        }
        case 'text-file-busy': {
          enum10 = 35;
          break;
        }
        case 'cross-device': {
          enum10 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val10}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum10, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline13(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable0.get(handle1).rep;
  const ret = filesystemErrorCode(rsc0);
  var variant3 = ret;
  if (variant3 === null || variant3=== undefined) {
    dataView(memory0).setInt8(arg1 + 0, 0, true);
  } else {
    const e = variant3;
    dataView(memory0).setInt8(arg1 + 0, 1, true);
    var val2 = e;
    let enum2;
    switch (val2) {
      case 'access': {
        enum2 = 0;
        break;
      }
      case 'would-block': {
        enum2 = 1;
        break;
      }
      case 'already': {
        enum2 = 2;
        break;
      }
      case 'bad-descriptor': {
        enum2 = 3;
        break;
      }
      case 'busy': {
        enum2 = 4;
        break;
      }
      case 'deadlock': {
        enum2 = 5;
        break;
      }
      case 'quota': {
        enum2 = 6;
        break;
      }
      case 'exist': {
        enum2 = 7;
        break;
      }
      case 'file-too-large': {
        enum2 = 8;
        break;
      }
      case 'illegal-byte-sequence': {
        enum2 = 9;
        break;
      }
      case 'in-progress': {
        enum2 = 10;
        break;
      }
      case 'interrupted': {
        enum2 = 11;
        break;
      }
      case 'invalid': {
        enum2 = 12;
        break;
      }
      case 'io': {
        enum2 = 13;
        break;
      }
      case 'is-directory': {
        enum2 = 14;
        break;
      }
      case 'loop': {
        enum2 = 15;
        break;
      }
      case 'too-many-links': {
        enum2 = 16;
        break;
      }
      case 'message-size': {
        enum2 = 17;
        break;
      }
      case 'name-too-long': {
        enum2 = 18;
        break;
      }
      case 'no-device': {
        enum2 = 19;
        break;
      }
      case 'no-entry': {
        enum2 = 20;
        break;
      }
      case 'no-lock': {
        enum2 = 21;
        break;
      }
      case 'insufficient-memory': {
        enum2 = 22;
        break;
      }
      case 'insufficient-space': {
        enum2 = 23;
        break;
      }
      case 'not-directory': {
        enum2 = 24;
        break;
      }
      case 'not-empty': {
        enum2 = 25;
        break;
      }
      case 'not-recoverable': {
        enum2 = 26;
        break;
      }
      case 'unsupported': {
        enum2 = 27;
        break;
      }
      case 'no-tty': {
        enum2 = 28;
        break;
      }
      case 'no-such-device': {
        enum2 = 29;
        break;
      }
      case 'overflow': {
        enum2 = 30;
        break;
      }
      case 'not-permitted': {
        enum2 = 31;
        break;
      }
      case 'pipe': {
        enum2 = 32;
        break;
      }
      case 'read-only': {
        enum2 = 33;
        break;
      }
      case 'invalid-seek': {
        enum2 = 34;
        break;
      }
      case 'text-file-busy': {
        enum2 = 35;
        break;
      }
      case 'cross-device': {
        enum2 = 36;
        break;
      }
      default: {
        if ((e) instanceof Error) {
          console.error(e);
        }
        
        throw new TypeError(`"${val2}" is not one of the cases of error-code`);
      }
    }
    dataView(memory0).setInt8(arg1 + 1, enum2, true);
  }
}

function trampoline14(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable1.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: OutputStream.prototype.checkWrite.call(rsc0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      dataView(memory0).setBigInt64(arg1 + 8, toUint64(e), true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var variant3 = e;
      switch (variant3.tag) {
        case 'last-operation-failed': {
          const e = variant3.val;
          dataView(memory0).setInt8(arg1 + 8, 0, true);
          if (!(e instanceof Error$1)) {
            throw new Error('Resource error: Not a valid "Error" resource.');
          }
          var handle2 = handleCnt0++;
          handleTable0.set(handle2, { rep: e, own: true });
          dataView(memory0).setInt32(arg1 + 12, handle2, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg1 + 8, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant3.tag)}\` (received \`${variant3}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline15(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rsc0 = handleTable1.get(handle1).rep;
  var ptr2 = arg1;
  var len2 = arg2;
  var result2 = new Uint8Array(memory0.buffer.slice(ptr2, ptr2 + len2 * 1));
  let ret;
  try {
    ret = { tag: 'ok', val: OutputStream.prototype.write.call(rsc0, result2) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory0).setInt8(arg3 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new Error('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = handleCnt0++;
          handleTable0.set(handle3, { rep: e, own: true });
          dataView(memory0).setInt32(arg3 + 8, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg3 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline16(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rsc0 = handleTable1.get(handle1).rep;
  var ptr2 = arg1;
  var len2 = arg2;
  var result2 = new Uint8Array(memory0.buffer.slice(ptr2, ptr2 + len2 * 1));
  let ret;
  try {
    ret = { tag: 'ok', val: OutputStream.prototype.blockingWriteAndFlush.call(rsc0, result2) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory0).setInt8(arg3 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new Error('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = handleCnt0++;
          handleTable0.set(handle3, { rep: e, own: true });
          dataView(memory0).setInt32(arg3 + 8, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg3 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline17(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable1.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: OutputStream.prototype.blockingFlush.call(rsc0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var variant3 = e;
      switch (variant3.tag) {
        case 'last-operation-failed': {
          const e = variant3.val;
          dataView(memory0).setInt8(arg1 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new Error('Resource error: Not a valid "Error" resource.');
          }
          var handle2 = handleCnt0++;
          handleTable0.set(handle2, { rep: e, own: true });
          dataView(memory0).setInt32(arg1 + 8, handle2, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg1 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant3.tag)}\` (received \`${variant3}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline18(arg0) {
  const ret = getEnvironment();
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc0(0, 0, 4, len3 * 16);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 16;var [tuple0_0, tuple0_1] = e;
    var ptr1 = utf8Encode(tuple0_0, realloc0, memory0);
    var len1 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len1, true);
    dataView(memory0).setInt32(base + 0, ptr1, true);
    var ptr2 = utf8Encode(tuple0_1, realloc0, memory0);
    var len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 12, len2, true);
    dataView(memory0).setInt32(base + 8, ptr2, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len3, true);
  dataView(memory0).setInt32(arg0 + 0, result3, true);
}
let exports3;
let exports4;
let exports5;

function trampoline23() {
  const ret = getStderr();
  if (!(ret instanceof OutputStream)) {
    throw new Error('Resource error: Not a valid "OutputStream" resource.');
  }
  var handle0 = handleCnt1++;
  handleTable1.set(handle0, { rep: ret, own: true });
  return handle0;
}

function trampoline24(arg0) {
  let variant0;
  switch (arg0) {
    case 0: {
      variant0= {
        tag: 'ok',
        val: undefined
      };
      break;
    }
    case 1: {
      variant0= {
        tag: 'err',
        val: undefined
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  exit(variant0);
}

function trampoline25() {
  const ret = getStdin();
  if (!(ret instanceof InputStream)) {
    throw new Error('Resource error: Not a valid "InputStream" resource.');
  }
  var handle0 = handleCnt2++;
  handleTable2.set(handle0, { rep: ret, own: true });
  return handle0;
}

function trampoline26() {
  const ret = getStdout();
  if (!(ret instanceof OutputStream)) {
    throw new Error('Resource error: Not a valid "OutputStream" resource.');
  }
  var handle0 = handleCnt1++;
  handleTable1.set(handle0, { rep: ret, own: true });
  return handle0;
}
let exports6;

function trampoline27(arg0) {
  const ret = getDirectories();
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc1(0, 0, 4, len3 * 12);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 12;var [tuple0_0, tuple0_1] = e;
    if (!(tuple0_0 instanceof Descriptor)) {
      throw new Error('Resource error: Not a valid "Descriptor" resource.');
    }
    var handle1 = handleCnt3++;
    handleTable3.set(handle1, { rep: tuple0_0, own: true });
    dataView(memory1).setInt32(base + 0, handle1, true);
    var ptr2 = utf8Encode(tuple0_1, realloc1, memory1);
    var len2 = utf8EncodedLen;
    dataView(memory1).setInt32(base + 8, len2, true);
    dataView(memory1).setInt32(base + 4, ptr2, true);
  }
  dataView(memory1).setInt32(arg0 + 4, len3, true);
  dataView(memory1).setInt32(arg0 + 0, result3, true);
}
let memory1;
let realloc1;

function trampoline28(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rsc0 = handleTable3.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: Descriptor.prototype.writeViaStream.call(rsc0, BigInt.asUintN(64, arg1)) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory1).setInt8(arg2 + 0, 0, true);
      if (!(e instanceof OutputStream)) {
        throw new Error('Resource error: Not a valid "OutputStream" resource.');
      }
      var handle2 = handleCnt1++;
      handleTable1.set(handle2, { rep: e, own: true });
      dataView(memory1).setInt32(arg2 + 4, handle2, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory1).setInt8(arg2 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'access': {
          enum3 = 0;
          break;
        }
        case 'would-block': {
          enum3 = 1;
          break;
        }
        case 'already': {
          enum3 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum3 = 3;
          break;
        }
        case 'busy': {
          enum3 = 4;
          break;
        }
        case 'deadlock': {
          enum3 = 5;
          break;
        }
        case 'quota': {
          enum3 = 6;
          break;
        }
        case 'exist': {
          enum3 = 7;
          break;
        }
        case 'file-too-large': {
          enum3 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum3 = 9;
          break;
        }
        case 'in-progress': {
          enum3 = 10;
          break;
        }
        case 'interrupted': {
          enum3 = 11;
          break;
        }
        case 'invalid': {
          enum3 = 12;
          break;
        }
        case 'io': {
          enum3 = 13;
          break;
        }
        case 'is-directory': {
          enum3 = 14;
          break;
        }
        case 'loop': {
          enum3 = 15;
          break;
        }
        case 'too-many-links': {
          enum3 = 16;
          break;
        }
        case 'message-size': {
          enum3 = 17;
          break;
        }
        case 'name-too-long': {
          enum3 = 18;
          break;
        }
        case 'no-device': {
          enum3 = 19;
          break;
        }
        case 'no-entry': {
          enum3 = 20;
          break;
        }
        case 'no-lock': {
          enum3 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum3 = 22;
          break;
        }
        case 'insufficient-space': {
          enum3 = 23;
          break;
        }
        case 'not-directory': {
          enum3 = 24;
          break;
        }
        case 'not-empty': {
          enum3 = 25;
          break;
        }
        case 'not-recoverable': {
          enum3 = 26;
          break;
        }
        case 'unsupported': {
          enum3 = 27;
          break;
        }
        case 'no-tty': {
          enum3 = 28;
          break;
        }
        case 'no-such-device': {
          enum3 = 29;
          break;
        }
        case 'overflow': {
          enum3 = 30;
          break;
        }
        case 'not-permitted': {
          enum3 = 31;
          break;
        }
        case 'pipe': {
          enum3 = 32;
          break;
        }
        case 'read-only': {
          enum3 = 33;
          break;
        }
        case 'invalid-seek': {
          enum3 = 34;
          break;
        }
        case 'text-file-busy': {
          enum3 = 35;
          break;
        }
        case 'cross-device': {
          enum3 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory1).setInt8(arg2 + 4, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline29(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable3.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: Descriptor.prototype.appendViaStream.call(rsc0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory1).setInt8(arg1 + 0, 0, true);
      if (!(e instanceof OutputStream)) {
        throw new Error('Resource error: Not a valid "OutputStream" resource.');
      }
      var handle2 = handleCnt1++;
      handleTable1.set(handle2, { rep: e, own: true });
      dataView(memory1).setInt32(arg1 + 4, handle2, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory1).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'access': {
          enum3 = 0;
          break;
        }
        case 'would-block': {
          enum3 = 1;
          break;
        }
        case 'already': {
          enum3 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum3 = 3;
          break;
        }
        case 'busy': {
          enum3 = 4;
          break;
        }
        case 'deadlock': {
          enum3 = 5;
          break;
        }
        case 'quota': {
          enum3 = 6;
          break;
        }
        case 'exist': {
          enum3 = 7;
          break;
        }
        case 'file-too-large': {
          enum3 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum3 = 9;
          break;
        }
        case 'in-progress': {
          enum3 = 10;
          break;
        }
        case 'interrupted': {
          enum3 = 11;
          break;
        }
        case 'invalid': {
          enum3 = 12;
          break;
        }
        case 'io': {
          enum3 = 13;
          break;
        }
        case 'is-directory': {
          enum3 = 14;
          break;
        }
        case 'loop': {
          enum3 = 15;
          break;
        }
        case 'too-many-links': {
          enum3 = 16;
          break;
        }
        case 'message-size': {
          enum3 = 17;
          break;
        }
        case 'name-too-long': {
          enum3 = 18;
          break;
        }
        case 'no-device': {
          enum3 = 19;
          break;
        }
        case 'no-entry': {
          enum3 = 20;
          break;
        }
        case 'no-lock': {
          enum3 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum3 = 22;
          break;
        }
        case 'insufficient-space': {
          enum3 = 23;
          break;
        }
        case 'not-directory': {
          enum3 = 24;
          break;
        }
        case 'not-empty': {
          enum3 = 25;
          break;
        }
        case 'not-recoverable': {
          enum3 = 26;
          break;
        }
        case 'unsupported': {
          enum3 = 27;
          break;
        }
        case 'no-tty': {
          enum3 = 28;
          break;
        }
        case 'no-such-device': {
          enum3 = 29;
          break;
        }
        case 'overflow': {
          enum3 = 30;
          break;
        }
        case 'not-permitted': {
          enum3 = 31;
          break;
        }
        case 'pipe': {
          enum3 = 32;
          break;
        }
        case 'read-only': {
          enum3 = 33;
          break;
        }
        case 'invalid-seek': {
          enum3 = 34;
          break;
        }
        case 'text-file-busy': {
          enum3 = 35;
          break;
        }
        case 'cross-device': {
          enum3 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory1).setInt8(arg1 + 4, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline30(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable3.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: Descriptor.prototype.getType.call(rsc0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory1).setInt8(arg1 + 0, 0, true);
      var val2 = e;
      let enum2;
      switch (val2) {
        case 'unknown': {
          enum2 = 0;
          break;
        }
        case 'block-device': {
          enum2 = 1;
          break;
        }
        case 'character-device': {
          enum2 = 2;
          break;
        }
        case 'directory': {
          enum2 = 3;
          break;
        }
        case 'fifo': {
          enum2 = 4;
          break;
        }
        case 'symbolic-link': {
          enum2 = 5;
          break;
        }
        case 'regular-file': {
          enum2 = 6;
          break;
        }
        case 'socket': {
          enum2 = 7;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val2}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory1).setInt8(arg1 + 1, enum2, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory1).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'access': {
          enum3 = 0;
          break;
        }
        case 'would-block': {
          enum3 = 1;
          break;
        }
        case 'already': {
          enum3 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum3 = 3;
          break;
        }
        case 'busy': {
          enum3 = 4;
          break;
        }
        case 'deadlock': {
          enum3 = 5;
          break;
        }
        case 'quota': {
          enum3 = 6;
          break;
        }
        case 'exist': {
          enum3 = 7;
          break;
        }
        case 'file-too-large': {
          enum3 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum3 = 9;
          break;
        }
        case 'in-progress': {
          enum3 = 10;
          break;
        }
        case 'interrupted': {
          enum3 = 11;
          break;
        }
        case 'invalid': {
          enum3 = 12;
          break;
        }
        case 'io': {
          enum3 = 13;
          break;
        }
        case 'is-directory': {
          enum3 = 14;
          break;
        }
        case 'loop': {
          enum3 = 15;
          break;
        }
        case 'too-many-links': {
          enum3 = 16;
          break;
        }
        case 'message-size': {
          enum3 = 17;
          break;
        }
        case 'name-too-long': {
          enum3 = 18;
          break;
        }
        case 'no-device': {
          enum3 = 19;
          break;
        }
        case 'no-entry': {
          enum3 = 20;
          break;
        }
        case 'no-lock': {
          enum3 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum3 = 22;
          break;
        }
        case 'insufficient-space': {
          enum3 = 23;
          break;
        }
        case 'not-directory': {
          enum3 = 24;
          break;
        }
        case 'not-empty': {
          enum3 = 25;
          break;
        }
        case 'not-recoverable': {
          enum3 = 26;
          break;
        }
        case 'unsupported': {
          enum3 = 27;
          break;
        }
        case 'no-tty': {
          enum3 = 28;
          break;
        }
        case 'no-such-device': {
          enum3 = 29;
          break;
        }
        case 'overflow': {
          enum3 = 30;
          break;
        }
        case 'not-permitted': {
          enum3 = 31;
          break;
        }
        case 'pipe': {
          enum3 = 32;
          break;
        }
        case 'read-only': {
          enum3 = 33;
          break;
        }
        case 'invalid-seek': {
          enum3 = 34;
          break;
        }
        case 'text-file-busy': {
          enum3 = 35;
          break;
        }
        case 'cross-device': {
          enum3 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory1).setInt8(arg1 + 1, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline31(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable3.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: Descriptor.prototype.stat.call(rsc0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant11 = ret;
  switch (variant11.tag) {
    case 'ok': {
      const e = variant11.val;
      dataView(memory1).setInt8(arg1 + 0, 0, true);
      var {type: v2_0, linkCount: v2_1, size: v2_2, dataAccessTimestamp: v2_3, dataModificationTimestamp: v2_4, statusChangeTimestamp: v2_5 } = e;
      var val3 = v2_0;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'block-device': {
          enum3 = 1;
          break;
        }
        case 'character-device': {
          enum3 = 2;
          break;
        }
        case 'directory': {
          enum3 = 3;
          break;
        }
        case 'fifo': {
          enum3 = 4;
          break;
        }
        case 'symbolic-link': {
          enum3 = 5;
          break;
        }
        case 'regular-file': {
          enum3 = 6;
          break;
        }
        case 'socket': {
          enum3 = 7;
          break;
        }
        default: {
          if ((v2_0) instanceof Error) {
            console.error(v2_0);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory1).setInt8(arg1 + 8, enum3, true);
      dataView(memory1).setBigInt64(arg1 + 16, toUint64(v2_1), true);
      dataView(memory1).setBigInt64(arg1 + 24, toUint64(v2_2), true);
      var variant5 = v2_3;
      if (variant5 === null || variant5=== undefined) {
        dataView(memory1).setInt8(arg1 + 32, 0, true);
      } else {
        const e = variant5;
        dataView(memory1).setInt8(arg1 + 32, 1, true);
        var {seconds: v4_0, nanoseconds: v4_1 } = e;
        dataView(memory1).setBigInt64(arg1 + 40, toUint64(v4_0), true);
        dataView(memory1).setInt32(arg1 + 48, toUint32(v4_1), true);
      }
      var variant7 = v2_4;
      if (variant7 === null || variant7=== undefined) {
        dataView(memory1).setInt8(arg1 + 56, 0, true);
      } else {
        const e = variant7;
        dataView(memory1).setInt8(arg1 + 56, 1, true);
        var {seconds: v6_0, nanoseconds: v6_1 } = e;
        dataView(memory1).setBigInt64(arg1 + 64, toUint64(v6_0), true);
        dataView(memory1).setInt32(arg1 + 72, toUint32(v6_1), true);
      }
      var variant9 = v2_5;
      if (variant9 === null || variant9=== undefined) {
        dataView(memory1).setInt8(arg1 + 80, 0, true);
      } else {
        const e = variant9;
        dataView(memory1).setInt8(arg1 + 80, 1, true);
        var {seconds: v8_0, nanoseconds: v8_1 } = e;
        dataView(memory1).setBigInt64(arg1 + 88, toUint64(v8_0), true);
        dataView(memory1).setInt32(arg1 + 96, toUint32(v8_1), true);
      }
      break;
    }
    case 'err': {
      const e = variant11.val;
      dataView(memory1).setInt8(arg1 + 0, 1, true);
      var val10 = e;
      let enum10;
      switch (val10) {
        case 'access': {
          enum10 = 0;
          break;
        }
        case 'would-block': {
          enum10 = 1;
          break;
        }
        case 'already': {
          enum10 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum10 = 3;
          break;
        }
        case 'busy': {
          enum10 = 4;
          break;
        }
        case 'deadlock': {
          enum10 = 5;
          break;
        }
        case 'quota': {
          enum10 = 6;
          break;
        }
        case 'exist': {
          enum10 = 7;
          break;
        }
        case 'file-too-large': {
          enum10 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum10 = 9;
          break;
        }
        case 'in-progress': {
          enum10 = 10;
          break;
        }
        case 'interrupted': {
          enum10 = 11;
          break;
        }
        case 'invalid': {
          enum10 = 12;
          break;
        }
        case 'io': {
          enum10 = 13;
          break;
        }
        case 'is-directory': {
          enum10 = 14;
          break;
        }
        case 'loop': {
          enum10 = 15;
          break;
        }
        case 'too-many-links': {
          enum10 = 16;
          break;
        }
        case 'message-size': {
          enum10 = 17;
          break;
        }
        case 'name-too-long': {
          enum10 = 18;
          break;
        }
        case 'no-device': {
          enum10 = 19;
          break;
        }
        case 'no-entry': {
          enum10 = 20;
          break;
        }
        case 'no-lock': {
          enum10 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum10 = 22;
          break;
        }
        case 'insufficient-space': {
          enum10 = 23;
          break;
        }
        case 'not-directory': {
          enum10 = 24;
          break;
        }
        case 'not-empty': {
          enum10 = 25;
          break;
        }
        case 'not-recoverable': {
          enum10 = 26;
          break;
        }
        case 'unsupported': {
          enum10 = 27;
          break;
        }
        case 'no-tty': {
          enum10 = 28;
          break;
        }
        case 'no-such-device': {
          enum10 = 29;
          break;
        }
        case 'overflow': {
          enum10 = 30;
          break;
        }
        case 'not-permitted': {
          enum10 = 31;
          break;
        }
        case 'pipe': {
          enum10 = 32;
          break;
        }
        case 'read-only': {
          enum10 = 33;
          break;
        }
        case 'invalid-seek': {
          enum10 = 34;
          break;
        }
        case 'text-file-busy': {
          enum10 = 35;
          break;
        }
        case 'cross-device': {
          enum10 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val10}" is not one of the cases of error-code`);
        }
      }
      dataView(memory1).setInt8(arg1 + 8, enum10, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline32(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable0.get(handle1).rep;
  const ret = filesystemErrorCode(rsc0);
  var variant3 = ret;
  if (variant3 === null || variant3=== undefined) {
    dataView(memory1).setInt8(arg1 + 0, 0, true);
  } else {
    const e = variant3;
    dataView(memory1).setInt8(arg1 + 0, 1, true);
    var val2 = e;
    let enum2;
    switch (val2) {
      case 'access': {
        enum2 = 0;
        break;
      }
      case 'would-block': {
        enum2 = 1;
        break;
      }
      case 'already': {
        enum2 = 2;
        break;
      }
      case 'bad-descriptor': {
        enum2 = 3;
        break;
      }
      case 'busy': {
        enum2 = 4;
        break;
      }
      case 'deadlock': {
        enum2 = 5;
        break;
      }
      case 'quota': {
        enum2 = 6;
        break;
      }
      case 'exist': {
        enum2 = 7;
        break;
      }
      case 'file-too-large': {
        enum2 = 8;
        break;
      }
      case 'illegal-byte-sequence': {
        enum2 = 9;
        break;
      }
      case 'in-progress': {
        enum2 = 10;
        break;
      }
      case 'interrupted': {
        enum2 = 11;
        break;
      }
      case 'invalid': {
        enum2 = 12;
        break;
      }
      case 'io': {
        enum2 = 13;
        break;
      }
      case 'is-directory': {
        enum2 = 14;
        break;
      }
      case 'loop': {
        enum2 = 15;
        break;
      }
      case 'too-many-links': {
        enum2 = 16;
        break;
      }
      case 'message-size': {
        enum2 = 17;
        break;
      }
      case 'name-too-long': {
        enum2 = 18;
        break;
      }
      case 'no-device': {
        enum2 = 19;
        break;
      }
      case 'no-entry': {
        enum2 = 20;
        break;
      }
      case 'no-lock': {
        enum2 = 21;
        break;
      }
      case 'insufficient-memory': {
        enum2 = 22;
        break;
      }
      case 'insufficient-space': {
        enum2 = 23;
        break;
      }
      case 'not-directory': {
        enum2 = 24;
        break;
      }
      case 'not-empty': {
        enum2 = 25;
        break;
      }
      case 'not-recoverable': {
        enum2 = 26;
        break;
      }
      case 'unsupported': {
        enum2 = 27;
        break;
      }
      case 'no-tty': {
        enum2 = 28;
        break;
      }
      case 'no-such-device': {
        enum2 = 29;
        break;
      }
      case 'overflow': {
        enum2 = 30;
        break;
      }
      case 'not-permitted': {
        enum2 = 31;
        break;
      }
      case 'pipe': {
        enum2 = 32;
        break;
      }
      case 'read-only': {
        enum2 = 33;
        break;
      }
      case 'invalid-seek': {
        enum2 = 34;
        break;
      }
      case 'text-file-busy': {
        enum2 = 35;
        break;
      }
      case 'cross-device': {
        enum2 = 36;
        break;
      }
      default: {
        if ((e) instanceof Error) {
          console.error(e);
        }
        
        throw new TypeError(`"${val2}" is not one of the cases of error-code`);
      }
    }
    dataView(memory1).setInt8(arg1 + 1, enum2, true);
  }
}

function trampoline33(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable1.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: OutputStream.prototype.checkWrite.call(rsc0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory1).setInt8(arg1 + 0, 0, true);
      dataView(memory1).setBigInt64(arg1 + 8, toUint64(e), true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory1).setInt8(arg1 + 0, 1, true);
      var variant3 = e;
      switch (variant3.tag) {
        case 'last-operation-failed': {
          const e = variant3.val;
          dataView(memory1).setInt8(arg1 + 8, 0, true);
          if (!(e instanceof Error$1)) {
            throw new Error('Resource error: Not a valid "Error" resource.');
          }
          var handle2 = handleCnt0++;
          handleTable0.set(handle2, { rep: e, own: true });
          dataView(memory1).setInt32(arg1 + 12, handle2, true);
          break;
        }
        case 'closed': {
          dataView(memory1).setInt8(arg1 + 8, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant3.tag)}\` (received \`${variant3}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline34(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rsc0 = handleTable1.get(handle1).rep;
  var ptr2 = arg1;
  var len2 = arg2;
  var result2 = new Uint8Array(memory1.buffer.slice(ptr2, ptr2 + len2 * 1));
  let ret;
  try {
    ret = { tag: 'ok', val: OutputStream.prototype.write.call(rsc0, result2) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory1).setInt8(arg3 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory1).setInt8(arg3 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory1).setInt8(arg3 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new Error('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = handleCnt0++;
          handleTable0.set(handle3, { rep: e, own: true });
          dataView(memory1).setInt32(arg3 + 8, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory1).setInt8(arg3 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline35(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rsc0 = handleTable1.get(handle1).rep;
  var ptr2 = arg1;
  var len2 = arg2;
  var result2 = new Uint8Array(memory1.buffer.slice(ptr2, ptr2 + len2 * 1));
  let ret;
  try {
    ret = { tag: 'ok', val: OutputStream.prototype.blockingWriteAndFlush.call(rsc0, result2) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory1).setInt8(arg3 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory1).setInt8(arg3 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory1).setInt8(arg3 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new Error('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = handleCnt0++;
          handleTable0.set(handle3, { rep: e, own: true });
          dataView(memory1).setInt32(arg3 + 8, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory1).setInt8(arg3 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline36(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable1.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: OutputStream.prototype.blockingFlush.call(rsc0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory1).setInt8(arg1 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory1).setInt8(arg1 + 0, 1, true);
      var variant3 = e;
      switch (variant3.tag) {
        case 'last-operation-failed': {
          const e = variant3.val;
          dataView(memory1).setInt8(arg1 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new Error('Resource error: Not a valid "Error" resource.');
          }
          var handle2 = handleCnt0++;
          handleTable0.set(handle2, { rep: e, own: true });
          dataView(memory1).setInt32(arg1 + 8, handle2, true);
          break;
        }
        case 'closed': {
          dataView(memory1).setInt8(arg1 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant3.tag)}\` (received \`${variant3}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline37(arg0) {
  const ret = getEnvironment();
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc1(0, 0, 4, len3 * 16);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 16;var [tuple0_0, tuple0_1] = e;
    var ptr1 = utf8Encode(tuple0_0, realloc1, memory1);
    var len1 = utf8EncodedLen;
    dataView(memory1).setInt32(base + 4, len1, true);
    dataView(memory1).setInt32(base + 0, ptr1, true);
    var ptr2 = utf8Encode(tuple0_1, realloc1, memory1);
    var len2 = utf8EncodedLen;
    dataView(memory1).setInt32(base + 12, len2, true);
    dataView(memory1).setInt32(base + 8, ptr2, true);
  }
  dataView(memory1).setInt32(arg0 + 4, len3, true);
  dataView(memory1).setInt32(arg0 + 0, result3, true);
}
let exports7;
let exports8;
let exports9;
let memory2;
let exports10;
let exports11;
let realloc2;
let postReturn0;
let postReturn1;
let postReturn2;
let postReturn3;
function trampoline0(handle) {
  const handleEntry = handleTable5.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable5.delete(handle);
  if (handleEntry.own && handleEntry.rep[symbolDispose]) {
    handleEntry.rep[symbolDispose]();
  }
}
function trampoline1(handle) {
  const handleEntry = handleTable6.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable6.delete(handle);
  if (handleEntry.own && handleEntry.rep[symbolDispose]) {
    handleEntry.rep[symbolDispose]();
  }
}
function trampoline2(handle) {
  const handleEntry = handleTable7.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable7.delete(handle);
  if (handleEntry.own && handleEntry.rep[symbolDispose]) {
    handleEntry.rep[symbolDispose]();
  }
}
function trampoline3(handle) {
  const handleEntry = handleTable4.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable4.delete(handle);
  if (handleEntry.own && handleEntry.rep[symbolDispose]) {
    handleEntry.rep[symbolDispose]();
  }
}
function trampoline19(handle) {
  const handleEntry = handleTable9.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable9.delete(handle);
  if (handleEntry.own && handleEntry.rep[symbolDispose]) {
    handleEntry.rep[symbolDispose]();
  }
}
function trampoline20(handle) {
  const handleEntry = handleTable10.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable10.delete(handle);
  if (handleEntry.own && handleEntry.rep[symbolDispose]) {
    handleEntry.rep[symbolDispose]();
  }
}
function trampoline21(handle) {
  const handleEntry = handleTable11.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable11.delete(handle);
  if (handleEntry.own && handleEntry.rep[symbolDispose]) {
    handleEntry.rep[symbolDispose]();
  }
}
function trampoline22(handle) {
  const handleEntry = handleTable8.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable8.delete(handle);
  if (handleEntry.own && handleEntry.rep[symbolDispose]) {
    handleEntry.rep[symbolDispose]();
  }
}
function trampoline38(from_ptr, len, to_ptr) {
  new Uint8Array(memory1.buffer, to_ptr, len).set(new Uint8Array(memory2.buffer, from_ptr, len));
}

function trampoline39(from_ptr, len, to_ptr) {
  new Uint8Array(memory2.buffer, to_ptr, len).set(new Uint8Array(memory1.buffer, from_ptr, len));
}


function decodeStr(arg0) {
  var ptr0 = utf8Encode(arg0, realloc2, memory2);
  var len0 = utf8EncodedLen;
  const ret = exports9['ss:responder/base64@0.1.0#decode-str'](ptr0, len0);
  var ptr1 = dataView(memory2).getInt32(ret + 0, true);
  var len1 = dataView(memory2).getInt32(ret + 4, true);
  var result1 = utf8Decoder.decode(new Uint8Array(memory2.buffer, ptr1, len1));
  postReturn0(ret);
  return result1;
}

function encodeB64(arg0) {
  var val0 = arg0;
  var len0 = val0.byteLength;
  var ptr0 = realloc2(0, 0, 1, len0 * 1);
  var src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
  (new Uint8Array(memory2.buffer, ptr0, len0 * 1)).set(src0);
  const ret = exports9['ss:responder/base64@0.1.0#encode-b64'](ptr0, len0);
  var ptr1 = dataView(memory2).getInt32(ret + 0, true);
  var len1 = dataView(memory2).getInt32(ret + 4, true);
  var result1 = utf8Decoder.decode(new Uint8Array(memory2.buffer, ptr1, len1));
  postReturn1(ret);
  return result1;
}

function kdfRk(arg0, arg1, arg2) {
  var val0 = arg0;
  var len0 = val0.byteLength;
  var ptr0 = realloc2(0, 0, 1, len0 * 1);
  var src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
  (new Uint8Array(memory2.buffer, ptr0, len0 * 1)).set(src0);
  var val1 = arg1;
  var len1 = val1.byteLength;
  var ptr1 = realloc2(0, 0, 1, len1 * 1);
  var src1 = new Uint8Array(val1.buffer || val1, val1.byteOffset, len1 * 1);
  (new Uint8Array(memory2.buffer, ptr1, len1 * 1)).set(src1);
  var val2 = arg2;
  var len2 = val2.byteLength;
  var ptr2 = realloc2(0, 0, 1, len2 * 1);
  var src2 = new Uint8Array(val2.buffer || val2, val2.byteOffset, len2 * 1);
  (new Uint8Array(memory2.buffer, ptr2, len2 * 1)).set(src2);
  const ret = exports9['ss:responder/ckcompact-dr-kdf@0.1.0#kdf-rk'](ptr0, len0, ptr1, len1, ptr2, len2);
  var ptr3 = dataView(memory2).getInt32(ret + 0, true);
  var len3 = dataView(memory2).getInt32(ret + 4, true);
  var result3 = new Uint8Array(memory2.buffer.slice(ptr3, ptr3 + len3 * 1));
  var ptr4 = dataView(memory2).getInt32(ret + 8, true);
  var len4 = dataView(memory2).getInt32(ret + 12, true);
  var result4 = new Uint8Array(memory2.buffer.slice(ptr4, ptr4 + len4 * 1));
  postReturn2(ret);
  return [result3, result4];
}

function kdfCk(arg0) {
  var val0 = arg0;
  var len0 = val0.byteLength;
  var ptr0 = realloc2(0, 0, 1, len0 * 1);
  var src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
  (new Uint8Array(memory2.buffer, ptr0, len0 * 1)).set(src0);
  const ret = exports9['ss:responder/ckcompact-dr-kdf@0.1.0#kdf-ck'](ptr0, len0);
  var ptr1 = dataView(memory2).getInt32(ret + 0, true);
  var len1 = dataView(memory2).getInt32(ret + 4, true);
  var result1 = new Uint8Array(memory2.buffer.slice(ptr1, ptr1 + len1 * 1));
  var ptr2 = dataView(memory2).getInt32(ret + 8, true);
  var len2 = dataView(memory2).getInt32(ret + 12, true);
  var result2 = new Uint8Array(memory2.buffer.slice(ptr2, ptr2 + len2 * 1));
  postReturn3(ret);
  return [result1, result2];
}
const handleTable0= new Map();
let handleCnt0 = 0;
const handleTable1= new Map();
let handleCnt1 = 0;
const handleTable2= new Map();
let handleCnt2 = 0;
const handleTable3= new Map();
let handleCnt3 = 0;

const $init = (async() => {
  const module0 = fetchCompile(new URL('./composed.core.wasm', import.meta.url));
  const module1 = base64Compile('AGFzbQEAAAABEQJgA39/fwBgB39/f39/f38AAwUEAAABAAQFAXABBAQHHAUBMAAAATEAAQEyAAIBMwADCCRpbXBvcnRzAQAKQQQNACAAIAEgAkEAEQAACw0AIAAgASACQQERAAALFQAgACABIAIgAyAEIAUgBkECEQEACw0AIAAgASACQQMRAAALAC8JcHJvZHVjZXJzAQxwcm9jZXNzZWQtYnkBDXdpdC1jb21wb25lbnQHMC4yMDEuMADmAQRuYW1lABMSd2l0LWNvbXBvbmVudDpzaGltAckBBAAtaW5kaXJlY3Qtc3M6cmVzcG9uZGVyL2Jhc2U2NEAwLjEuMC1kZWNvZGUtc3RyAS1pbmRpcmVjdC1zczpyZXNwb25kZXIvYmFzZTY0QDAuMS4wLWVuY29kZS1iNjQCM2luZGlyZWN0LXNzOnJlc3BvbmRlci9ja2NvbXBhY3QtZHIta2RmQDAuMS4wLWtkZi1yawMzaW5kaXJlY3Qtc3M6cmVzcG9uZGVyL2NrY29tcGFjdC1kci1rZGZAMC4xLjAta2RmLWNr');
  const module2 = base64Compile('AGFzbQEAAAABEQJgA39/fwBgB39/f39/f38AAiQFAAEwAAAAATEAAAABMgABAAEzAAAACCRpbXBvcnRzAXABBAQJCgEAQQALBAABAgMALwlwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQENd2l0LWNvbXBvbmVudAcwLjIwMS4wABwEbmFtZQAVFHdpdC1jb21wb25lbnQ6Zml4dXBz');
  const module3 = fetchCompile(new URL('./composed.core2.wasm', import.meta.url));
  const module4 = fetchCompile(new URL('./composed.core3.wasm', import.meta.url));
  const module5 = base64Compile('AGFzbQEAAAABKQdgAX8AYAN/fn8AYAJ/fwBgBH9/f38AYAR/f39/AX9gAn9/AX9gAX8AAxAPAAECAgICAgMDAgAEBQUGBAUBcAEPDwdNEAEwAAABMQABATIAAgEzAAMBNAAEATUABQE2AAYBNwAHATgACAE5AAkCMTAACgIxMQALAjEyAAwCMTMADQIxNAAOCCRpbXBvcnRzAQAKvQEPCQAgAEEAEQAACw0AIAAgASACQQERAQALCwAgACABQQIRAgALCwAgACABQQMRAgALCwAgACABQQQRAgALCwAgACABQQURAgALCwAgACABQQYRAgALDwAgACABIAIgA0EHEQMACw8AIAAgASACIANBCBEDAAsLACAAIAFBCRECAAsJACAAQQoRAAALDwAgACABIAIgA0ELEQQACwsAIAAgAUEMEQUACwsAIAAgAUENEQUACwkAIABBDhEGAAsALwlwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQENd2l0LWNvbXBvbmVudAcwLjIwMS4wAJgHBG5hbWUAExJ3aXQtY29tcG9uZW50OnNoaW0B+wYPADdpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vcHJlb3BlbnNAMC4yLjAtZ2V0LWRpcmVjdG9yaWVzAUhpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjAtW21ldGhvZF1kZXNjcmlwdG9yLndyaXRlLXZpYS1zdHJlYW0CSWluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMC1bbWV0aG9kXWRlc2NyaXB0b3IuYXBwZW5kLXZpYS1zdHJlYW0DQGluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMC1bbWV0aG9kXWRlc2NyaXB0b3IuZ2V0LXR5cGUEPGluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMC1bbWV0aG9kXWRlc2NyaXB0b3Iuc3RhdAU6aW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4wLWZpbGVzeXN0ZW0tZXJyb3ItY29kZQZAaW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zQDAuMi4wLVttZXRob2Rdb3V0cHV0LXN0cmVhbS5jaGVjay13cml0ZQc6aW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zQDAuMi4wLVttZXRob2Rdb3V0cHV0LXN0cmVhbS53cml0ZQhNaW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zQDAuMi4wLVttZXRob2Rdb3V0cHV0LXN0cmVhbS5ibG9ja2luZy13cml0ZS1hbmQtZmx1c2gJQ2luZGlyZWN0LXdhc2k6aW8vc3RyZWFtc0AwLjIuMC1bbWV0aG9kXW91dHB1dC1zdHJlYW0uYmxvY2tpbmctZmx1c2gKM2luZGlyZWN0LXdhc2k6Y2xpL2Vudmlyb25tZW50QDAuMi4wLWdldC1lbnZpcm9ubWVudAslYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1mZF93cml0ZQwoYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1lbnZpcm9uX2dldA0uYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1lbnZpcm9uX3NpemVzX2dldA4mYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1wcm9jX2V4aXQ');
  const module6 = base64Compile('AGFzbQEAAAABKQdgAX8AYAN/fn8AYAJ/fwBgBH9/f38AYAR/f39/AX9gAn9/AX9gAX8AAmAQAAEwAAAAATEAAQABMgACAAEzAAIAATQAAgABNQACAAE2AAIAATcAAwABOAADAAE5AAIAAjEwAAAAAjExAAQAAjEyAAUAAjEzAAUAAjE0AAYACCRpbXBvcnRzAXABDw8JFQEAQQALDwABAgMEBQYHCAkKCwwNDgAvCXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AQ13aXQtY29tcG9uZW50BzAuMjAxLjAAHARuYW1lABUUd2l0LWNvbXBvbmVudDpmaXh1cHM');
  const module7 = fetchCompile(new URL('./composed.core4.wasm', import.meta.url));
  const module8 = fetchCompile(new URL('./composed.core5.wasm', import.meta.url));
  const module9 = base64Compile('AGFzbQEAAAABKQdgAX8AYAN/fn8AYAJ/fwBgBH9/f38AYAR/f39/AX9gAn9/AX9gAX8AAxAPAAECAgICAgMDAgAEBQUGBAUBcAEPDwdNEAEwAAABMQABATIAAgEzAAMBNAAEATUABQE2AAYBNwAHATgACAE5AAkCMTAACgIxMQALAjEyAAwCMTMADQIxNAAOCCRpbXBvcnRzAQAKvQEPCQAgAEEAEQAACw0AIAAgASACQQERAQALCwAgACABQQIRAgALCwAgACABQQMRAgALCwAgACABQQQRAgALCwAgACABQQURAgALCwAgACABQQYRAgALDwAgACABIAIgA0EHEQMACw8AIAAgASACIANBCBEDAAsLACAAIAFBCRECAAsJACAAQQoRAAALDwAgACABIAIgA0ELEQQACwsAIAAgAUEMEQUACwsAIAAgAUENEQUACwkAIABBDhEGAAsALwlwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQENd2l0LWNvbXBvbmVudAcwLjIwMS4wAJgHBG5hbWUAExJ3aXQtY29tcG9uZW50OnNoaW0B+wYPADdpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vcHJlb3BlbnNAMC4yLjAtZ2V0LWRpcmVjdG9yaWVzAUhpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjAtW21ldGhvZF1kZXNjcmlwdG9yLndyaXRlLXZpYS1zdHJlYW0CSWluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMC1bbWV0aG9kXWRlc2NyaXB0b3IuYXBwZW5kLXZpYS1zdHJlYW0DQGluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMC1bbWV0aG9kXWRlc2NyaXB0b3IuZ2V0LXR5cGUEPGluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMC1bbWV0aG9kXWRlc2NyaXB0b3Iuc3RhdAU6aW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4wLWZpbGVzeXN0ZW0tZXJyb3ItY29kZQZAaW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zQDAuMi4wLVttZXRob2Rdb3V0cHV0LXN0cmVhbS5jaGVjay13cml0ZQc6aW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zQDAuMi4wLVttZXRob2Rdb3V0cHV0LXN0cmVhbS53cml0ZQhNaW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zQDAuMi4wLVttZXRob2Rdb3V0cHV0LXN0cmVhbS5ibG9ja2luZy13cml0ZS1hbmQtZmx1c2gJQ2luZGlyZWN0LXdhc2k6aW8vc3RyZWFtc0AwLjIuMC1bbWV0aG9kXW91dHB1dC1zdHJlYW0uYmxvY2tpbmctZmx1c2gKM2luZGlyZWN0LXdhc2k6Y2xpL2Vudmlyb25tZW50QDAuMi4wLWdldC1lbnZpcm9ubWVudAslYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1mZF93cml0ZQwoYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1lbnZpcm9uX2dldA0uYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1lbnZpcm9uX3NpemVzX2dldA4mYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1wcm9jX2V4aXQ');
  const module10 = base64Compile('AGFzbQEAAAABKQdgAX8AYAN/fn8AYAJ/fwBgBH9/f38AYAR/f39/AX9gAn9/AX9gAX8AAmAQAAEwAAAAATEAAQABMgACAAEzAAIAATQAAgABNQACAAE2AAIAATcAAwABOAADAAE5AAIAAjEwAAAAAjExAAQAAjEyAAUAAjEzAAUAAjE0AAYACCRpbXBvcnRzAXABDw8JFQEAQQALDwABAgMEBQYHCAkKCwwNDgAvCXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AQ13aXQtY29tcG9uZW50BzAuMjAxLjAAHARuYW1lABUUd2l0LWNvbXBvbmVudDpmaXh1cHM');
  const module11 = base64Compile('AGFzbQEAAAABWQ5gBH9/f38Bf2ACf38Bf2ABfwBgA39/fwBgBn9/f39/fwF/YAd/f39/f39/AGAAAX9gA39/fwBgAn9/AX9gAAF/YAN/f38AYAJ/fwF/YAJ/fwF/YAN/f38AArEEGQVmbGFncwlpbnN0YW5jZTMDfwEGbWVtb3J5Am0wAgAAB3JlYWxsb2MCZjAAAAVmbGFncwlpbnN0YW5jZTUDfwEHcmVhbGxvYwJmMQAABmNhbGxlZQhhZGFwdGVyMAABC3Bvc3RfcmV0dXJuCGFkYXB0ZXIwAAIJdHJhbnNjb2RlG3V0ZjgtdG8tdXRmOCAobWVtMSA9PiBtZW0wKQADCXRyYW5zY29kZRt1dGY4LXRvLXV0ZjggKG1lbTAgPT4gbWVtMSkAAwZjYWxsZWUIYWRhcHRlcjEAAQtwb3N0X3JldHVybghhZGFwdGVyMQACBWZsYWdzCWluc3RhbmNlMQN/AQdyZWFsbG9jAmY4AAAGY2FsbGVlCGFkYXB0ZXIyAAQLcG9zdF9yZXR1cm4IYWRhcHRlcjIAAgZjYWxsZWUIYWRhcHRlcjMAAQtwb3N0X3JldHVybghhZGFwdGVyMwACCGF1Z21lbnRzD21lbTEgTWVtb3J5U2l6ZQAGCGF1Z21lbnRzDW1lbTEgSTMyU3RvcmUABwhhdWdtZW50cw5tZW0xIEkzMkxvYWQ4VQAICGF1Z21lbnRzD21lbTIgTWVtb3J5U2l6ZQAJCGF1Z21lbnRzDm1lbTIgSTMyU3RvcmU4AAoIYXVnbWVudHMMbWVtMiBJMzJMb2FkAAsIYXVnbWVudHMObWVtMiBJMzJMb2FkOFUADAhhdWdtZW50cw5tZW0xIEkzMlN0b3JlOAANAwUEAwMFAwctBAhhZGFwdGVyMAAVCGFkYXB0ZXIxABYIYWRhcHRlcjIAFwhhZGFwdGVyMwAYCsUPBLACAQZ/IwFBAXFFBEAACyMAQQJxRQRAAAsjAEF9cSQAIwBBfnEkACAAIAEhAyEEIANBgICAgHhPBEAACyADIgUhBkEAQQBBASAGEAAhBwJAAkAQDa1CEIYgBK0gA618Wg0BCwALAkACQD8ArUIQhiAHrSAGrXxaDQELAAsgBCADIAcQBCAHIAUjAEEBciQAEAIhBSMBQX5xJAEgBUEDcQRAAAsgAkEDcQRAAAsgBSgCACAFKAIEIQchAyAHQYCAgIB4TwRAAAsgByIEIQZBAEEAQQEgBhABIQgCQAJAPwCtQhCGIAOtIAetfFoNAQsACwJAAkAQDa1CEIYgCK0gBq18Wg0BCwALIAMgByAIEAUgAiAIQQAQDiACIARBBBAOIwFBAXIkASAFEAMjAEECciQAC9QCAQZ/IwFBAXFFBEAACyMAQQJxRQRAAAsjAEF9cSQAIwBBfnEkACAAIAEhAyEEIAMhBSAFIQZBAEEAQQEgBhAAIQcCQAJAEA2tQhCGIAStIAWtfFoNAQsACwJAAkA/AK1CEIYgB60gBq18Wg0BCwALAkAgAyIGRQ0AIAQhBSAHIQgDQCAIIAVBABAPOgAAIAVBAWohBSAIQQFqIQggBkF/aiIGDQALCyAHIAMjAEEBciQAEAYhByMBQX5xJAEgB0EDcQRAAAsgAkEDcQRAAAsgBygCACAHKAIEIQQhAyAEQYCAgIB4TwRAAAsgBCIGIQVBAEEAQQEgBRABIQgCQAJAPwCtQhCGIAOtIAStfFoNAQsACwJAAkAQDa1CEIYgCK0gBa18Wg0BCwALIAMgBCAIEAUgAiAIQQAQDiACIAZBBBAOIwFBAXIkASAHEAcjAEECciQAC6IGAQd/IwFBAXFFBEAACyMCQQJxRQRAAAsjAkF9cSQCIwJBfnEkAiAAIAEhByEIIAchCSAJIQpBAEEAQQEgChAIIQsCQAJAEA2tQhCGIAitIAmtfFoNAQsACwJAAkAQEK1CEIYgC60gCq18Wg0BCwALAkAgByIKRQ0AIAghCSALIQwDQCAMIAlBABAPQQAQESAJQQFqIQkgDEEBaiEMIApBf2oiCg0ACwsgCyAHIAIgAyELIQggCyEHIAchCkEAQQBBASAKEAghCQJAAkAQDa1CEIYgCK0gB618Wg0BCwALAkACQBAQrUIQhiAJrSAKrXxaDQELAAsCQCALIgpFDQAgCCEHIAkhDANAIAwgB0EAEA9BABARIAdBAWohByAMQQFqIQwgCkF/aiIKDQALCyAJIAsgBCAFIQkhCCAJIQsgCyEKQQBBAEEBIAoQCCEHAkACQBANrUIQhiAIrSALrXxaDQELAAsCQAJAEBCtQhCGIAetIAqtfFoNAQsACwJAIAkiCkUNACAIIQsgByEMA0AgDCALQQAQD0EAEBEgC0EBaiELIAxBAWohDCAKQX9qIgoNAAsLIAcgCSMCQQFyJAIQCSEHIwFBfnEkASAHQQNxBEAACyAGQQNxBEAACyAHQQAQEiAHQQQQEiEIIQkgCCEKIAohC0EAQQBBASALEAEhDAJAAkAQEK1CEIYgCa0gCq18Wg0BCwALAkACQBANrUIQhiAMrSALrXxaDQELAAsCQCAIIgtFDQAgCSEKIAwhDQNAIA0gCkEAEBNBABAUIApBAWohCiANQQFqIQ0gC0F/aiILDQALCyAGIAxBABAOIAYgCEEEEA4gB0EIEBIgB0EMEBIhDCEJIAwhCCAIIQtBAEEAQQEgCxABIQoCQAJAEBCtQhCGIAmtIAitfFoNAQsACwJAAkAQDa1CEIYgCq0gC618Wg0BCwALAkAgDCILRQ0AIAkhCCAKIQ0DQCANIAhBABATQQAQFCAIQQFqIQggDUEBaiENIAtBf2oiCw0ACwsgBiAKQQgQDiAGIAxBDBAOIwFBAXIkASAHEAojAkECciQCC5YEAQd/IwFBAXFFBEAACyMCQQJxRQRAAAsjAkF9cSQCIwJBfnEkAiAAIAEhAyEEIAMhBSAFIQZBAEEAQQEgBhAIIQcCQAJAEA2tQhCGIAStIAWtfFoNAQsACwJAAkAQEK1CEIYgB60gBq18Wg0BCwALAkAgAyIGRQ0AIAQhBSAHIQgDQCAIIAVBABAPQQAQESAFQQFqIQUgCEEBaiEIIAZBf2oiBg0ACwsgByADIwJBAXIkAhALIQcjAUF+cSQBIAdBA3EEQAALIAJBA3EEQAALIAdBABASIAdBBBASIQQhAyAEIQYgBiEFQQBBAEEBIAUQASEIAkACQBAQrUIQhiADrSAGrXxaDQELAAsCQAJAEA2tQhCGIAitIAWtfFoNAQsACwJAIAQiBUUNACADIQYgCCEJA0AgCSAGQQAQE0EAEBQgBkEBaiEGIAlBAWohCSAFQX9qIgUNAAsLIAIgCEEAEA4gAiAEQQQQDiAHQQgQEiAHQQwQEiEIIQMgCCEEIAQhBUEAQQBBASAFEAEhBgJAAkAQEK1CEIYgA60gBK18Wg0BCwALAkACQBANrUIQhiAGrSAFrXxaDQELAAsCQCAIIgVFDQAgAyEEIAYhCQNAIAkgBEEAEBNBABAUIARBAWohBCAJQQFqIQkgBUF/aiIFDQALCyACIAZBCBAOIAIgCEEMEA4jAUEBciQBIAcQDCMCQQJyJAIL');
  const instanceFlags1 = new WebAssembly.Global({ value: "i32", mutable: true }, 3);
  const instanceFlags3 = new WebAssembly.Global({ value: "i32", mutable: true }, 3);
  const instanceFlags5 = new WebAssembly.Global({ value: "i32", mutable: true }, 3);
  ({ exports: exports0 } = await instantiateCore(await module9));
  ({ exports: exports1 } = await instantiateCore(await module7, {
    wasi_snapshot_preview1: {
      environ_get: exports0['12'],
      environ_sizes_get: exports0['13'],
      fd_write: exports0['11'],
      proc_exit: exports0['14'],
    },
  }));
  ({ exports: exports2 } = await instantiateCore(await module8, {
    __main_module__: {
      cabi_realloc: exports1.cabi_realloc,
    },
    env: {
      memory: exports1.memory,
    },
    'wasi:cli/environment@0.2.0': {
      'get-environment': exports0['10'],
    },
    'wasi:cli/exit@0.2.0': {
      exit: trampoline5,
    },
    'wasi:cli/stderr@0.2.0': {
      'get-stderr': trampoline4,
    },
    'wasi:cli/stdin@0.2.0': {
      'get-stdin': trampoline6,
    },
    'wasi:cli/stdout@0.2.0': {
      'get-stdout': trampoline7,
    },
    'wasi:filesystem/preopens@0.2.0': {
      'get-directories': exports0['0'],
    },
    'wasi:filesystem/types@0.2.0': {
      '[method]descriptor.append-via-stream': exports0['2'],
      '[method]descriptor.get-type': exports0['3'],
      '[method]descriptor.stat': exports0['4'],
      '[method]descriptor.write-via-stream': exports0['1'],
      '[resource-drop]descriptor': trampoline3,
      'filesystem-error-code': exports0['5'],
    },
    'wasi:io/error@0.2.0': {
      '[resource-drop]error': trampoline0,
    },
    'wasi:io/streams@0.2.0': {
      '[method]output-stream.blocking-flush': exports0['9'],
      '[method]output-stream.blocking-write-and-flush': exports0['8'],
      '[method]output-stream.check-write': exports0['6'],
      '[method]output-stream.write': exports0['7'],
      '[resource-drop]input-stream': trampoline1,
      '[resource-drop]output-stream': trampoline2,
    },
  }));
  memory0 = exports1.memory;
  realloc0 = exports2.cabi_import_realloc;
  ({ exports: exports3 } = await instantiateCore(await module10, {
    '': {
      $imports: exports0.$imports,
      '0': trampoline8,
      '1': trampoline9,
      '10': trampoline18,
      '11': exports2.fd_write,
      '12': exports2.environ_get,
      '13': exports2.environ_sizes_get,
      '14': exports2.proc_exit,
      '2': trampoline10,
      '3': trampoline11,
      '4': trampoline12,
      '5': trampoline13,
      '6': trampoline14,
      '7': trampoline15,
      '8': trampoline16,
      '9': trampoline17,
    },
  }));
  ({ exports: exports4 } = await instantiateCore(await module5));
  ({ exports: exports5 } = await instantiateCore(await module3, {
    wasi_snapshot_preview1: {
      environ_get: exports4['12'],
      environ_sizes_get: exports4['13'],
      fd_write: exports4['11'],
      proc_exit: exports4['14'],
    },
  }));
  ({ exports: exports6 } = await instantiateCore(await module4, {
    __main_module__: {
      cabi_realloc: exports5.cabi_realloc,
    },
    env: {
      memory: exports5.memory,
    },
    'wasi:cli/environment@0.2.0': {
      'get-environment': exports4['10'],
    },
    'wasi:cli/exit@0.2.0': {
      exit: trampoline24,
    },
    'wasi:cli/stderr@0.2.0': {
      'get-stderr': trampoline23,
    },
    'wasi:cli/stdin@0.2.0': {
      'get-stdin': trampoline25,
    },
    'wasi:cli/stdout@0.2.0': {
      'get-stdout': trampoline26,
    },
    'wasi:filesystem/preopens@0.2.0': {
      'get-directories': exports4['0'],
    },
    'wasi:filesystem/types@0.2.0': {
      '[method]descriptor.append-via-stream': exports4['2'],
      '[method]descriptor.get-type': exports4['3'],
      '[method]descriptor.stat': exports4['4'],
      '[method]descriptor.write-via-stream': exports4['1'],
      '[resource-drop]descriptor': trampoline22,
      'filesystem-error-code': exports4['5'],
    },
    'wasi:io/error@0.2.0': {
      '[resource-drop]error': trampoline19,
    },
    'wasi:io/streams@0.2.0': {
      '[method]output-stream.blocking-flush': exports4['9'],
      '[method]output-stream.blocking-write-and-flush': exports4['8'],
      '[method]output-stream.check-write': exports4['6'],
      '[method]output-stream.write': exports4['7'],
      '[resource-drop]input-stream': trampoline20,
      '[resource-drop]output-stream': trampoline21,
    },
  }));
  memory1 = exports5.memory;
  realloc1 = exports6.cabi_import_realloc;
  ({ exports: exports7 } = await instantiateCore(await module6, {
    '': {
      $imports: exports4.$imports,
      '0': trampoline27,
      '1': trampoline28,
      '10': trampoline37,
      '11': exports6.fd_write,
      '12': exports6.environ_get,
      '13': exports6.environ_sizes_get,
      '14': exports6.proc_exit,
      '2': trampoline29,
      '3': trampoline30,
      '4': trampoline31,
      '5': trampoline32,
      '6': trampoline33,
      '7': trampoline34,
      '8': trampoline35,
      '9': trampoline36,
    },
  }));
  ({ exports: exports8 } = await instantiateCore(await module1));
  ({ exports: exports9 } = await instantiateCore(await module0, {
    'ss:responder/base64@0.1.0': {
      'decode-str': exports8['0'],
      'encode-b64': exports8['1'],
    },
    'ss:responder/ckcompact-dr-kdf@0.1.0': {
      'kdf-ck': exports8['3'],
      'kdf-rk': exports8['2'],
    },
  }));
  memory2 = exports9.memory;
  ({ exports: exports10 } = await instantiateCore(await module11, {
    augments: {
      'mem1 I32Load8U': (ptr, off) => new DataView(exports9.memory.buffer).getUint8(ptr + off, true),
      'mem1 I32Store': (ptr, val, offset) => {
        new DataView(exports9.memory.buffer).setInt32(ptr + offset, val, true);
      },
      'mem1 I32Store8': (ptr, val, offset) => {
        new DataView(exports9.memory.buffer).setInt8(ptr + offset, val, true);
      },
      'mem1 MemorySize': ptr => exports9.memory.buffer.byteLength / 65536,
      'mem2 I32Load': (ptr, off) => new DataView(exports1.memory.buffer).getInt32(ptr + off, true),
      'mem2 I32Load8U': (ptr, off) => new DataView(exports1.memory.buffer).getUint8(ptr + off, true),
      'mem2 I32Store8': (ptr, val, offset) => {
        new DataView(exports1.memory.buffer).setInt8(ptr + offset, val, true);
      },
      'mem2 MemorySize': ptr => exports1.memory.buffer.byteLength / 65536,
    },
    callee: {
      adapter0: exports5['ss:responder/base64@0.1.0#decode-str'],
      adapter1: exports5['ss:responder/base64@0.1.0#encode-b64'],
      adapter2: exports1['ss:responder/ckcompact-dr-kdf@0.1.0#kdf-rk'],
      adapter3: exports1['ss:responder/ckcompact-dr-kdf@0.1.0#kdf-ck'],
    },
    flags: {
      instance1: instanceFlags1,
      instance3: instanceFlags3,
      instance5: instanceFlags5,
    },
    memory: {
      m0: exports5.memory,
    },
    post_return: {
      adapter0: exports5['cabi_post_ss:responder/base64@0.1.0#decode-str'],
      adapter1: exports5['cabi_post_ss:responder/base64@0.1.0#encode-b64'],
      adapter2: exports1['cabi_post_ss:responder/ckcompact-dr-kdf@0.1.0#kdf-rk'],
      adapter3: exports1['cabi_post_ss:responder/ckcompact-dr-kdf@0.1.0#kdf-ck'],
    },
    realloc: {
      f0: exports5.cabi_realloc,
      f1: exports9.cabi_realloc,
      f8: exports1.cabi_realloc,
    },
    transcode: {
      'utf8-to-utf8 (mem0 => mem1)': trampoline39,
      'utf8-to-utf8 (mem1 => mem0)': trampoline38,
    },
  }));
  ({ exports: exports11 } = await instantiateCore(await module2, {
    '': {
      $imports: exports8.$imports,
      '0': exports10.adapter0,
      '1': exports10.adapter1,
      '2': exports10.adapter2,
      '3': exports10.adapter3,
    },
  }));
  realloc2 = exports9.cabi_realloc;
  postReturn0 = exports9['cabi_post_ss:responder/base64@0.1.0#decode-str'];
  postReturn1 = exports9['cabi_post_ss:responder/base64@0.1.0#encode-b64'];
  postReturn2 = exports9['cabi_post_ss:responder/ckcompact-dr-kdf@0.1.0#kdf-rk'];
  postReturn3 = exports9['cabi_post_ss:responder/ckcompact-dr-kdf@0.1.0#kdf-ck'];
})();

await $init;
const base640_1_0 = {
  decodeStr: decodeStr,
  encodeB64: encodeB64,
  
};
const ckcompactDrKdf0_1_0 = {
  kdfCk: kdfCk,
  kdfRk: kdfRk,
  
};

export { base640_1_0 as base64, ckcompactDrKdf0_1_0 as ckcompactDrKdf, base640_1_0 as 'ss:responder/base64@0.1.0', ckcompactDrKdf0_1_0 as 'ss:responder/ckcompact-dr-kdf@0.1.0',  }