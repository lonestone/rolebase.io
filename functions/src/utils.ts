import * as crypto from 'crypto'

export function md5(data: string): string {
  return crypto.createHash('md5').update(data).digest('hex')
}
