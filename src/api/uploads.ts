import { sha1 } from 'crypto-hash'
import { nhost } from 'src/nhost'

// Upload file and return URL
export async function uploadFile(orgId: string, file: File): Promise<string> {
  const hash = await getSHA1FromFile(file)
  const name = `orgs/${orgId}/uploads/${hash}`

  // Upload file
  const { error, fileMetadata } = await nhost.storage.upload({ file, name })
  if (error) throw error

  // Return URL
  return nhost.storage.getPublicUrl({ fileId: fileMetadata.id })
}

// Generate a SHA1 hash from a file
function getSHA1FromFile(file: File): Promise<string> {
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
