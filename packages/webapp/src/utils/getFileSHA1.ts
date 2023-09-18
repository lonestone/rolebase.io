import { sha1 } from 'crypto-hash'

// Generate a SHA1 hash from a file
export function getFileSHA1(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = async function () {
      try {
        const fileResult = this.result
        if (!fileResult) throw new Error('File empty')
        const hash = await sha1(fileResult)
        resolve(hash)
      } catch (e) {
        reject(e)
      }
    }

    reader.readAsArrayBuffer(file)
  })
}
