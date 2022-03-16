import { sha1 } from 'crypto-hash'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from './firebase'

// Upload member picture and return URL
export async function uploadFile(orgId: string, file: File): Promise<string> {
  const hash = await getSHA1FromFile(file)
  const fileRef = ref(storage, `orgs/${orgId}/uploads/${hash}`)
  await uploadBytes(fileRef, file)
  return getDownloadURL(fileRef)
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
