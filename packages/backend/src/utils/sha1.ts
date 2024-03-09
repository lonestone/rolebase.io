import crypto from 'crypto'

export function sha1(input: string | Buffer) {
  const hash = crypto.createHash('sha1')

  if (Buffer.isBuffer(input)) {
    hash.update(input)
  } else if (typeof input === 'string') {
    hash.update(Buffer.from(input))
  } else {
    throw new Error('Input must be a Buffer or a string')
  }

  return hash.digest('hex')
}
