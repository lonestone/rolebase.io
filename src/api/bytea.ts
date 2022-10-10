// Helpers to manipulate Hasura bytea fields

function hexToUint8Array(hex: string) {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i !== bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16)
  }
  return bytes
}

function uint8ArrayToHex(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join(
    ''
  )
}

export function byteaToUint8Array(bytea: string) {
  return hexToUint8Array(
    // Strip \x prefix
    bytea.substring(2)
  )
}

export function uint8ArrayToBytea(bytes: Uint8Array) {
  return '\\x' + uint8ArrayToHex(bytes)
}
