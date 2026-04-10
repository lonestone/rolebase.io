import crypto from 'crypto'

export function sha1(input: string | Uint8Array) {
  const hash = crypto.createHash('sha1')
  hash.update(input)
  return hash.digest('hex')
}
