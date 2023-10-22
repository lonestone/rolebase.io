import crypto from 'crypto'
import { loadFileBuffer } from './loadFileBuffer'
import { saveFile } from './saveFile'

function sha1(input: string | Buffer) {
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

export async function importFileUpload(
  url: string,
  orgId: string
): Promise<{ fileId: string; url: string } | undefined> {
  const data = await loadFileBuffer(url)
  if (!data) return

  const hash = sha1(data)
  const name = `orgs/${orgId}/uploads/${hash}`
  return saveFile(name, data)
}
