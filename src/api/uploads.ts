import { nhost } from 'src/nhost'
import { getFileSHA1 } from '../utils/getFileSHA1'

// Upload file and return URL
export async function uploadFile(orgId: string, file: File): Promise<string> {
  console.log('uploadFile')
  const hash = await getFileSHA1(file)
  const name = `orgs/${orgId}/uploads/${hash}`

  // Upload file
  const { error, fileMetadata } = await nhost.storage.upload({ file, name })
  if (error) throw error

  // Return URL
  return nhost.storage.getPublicUrl({ fileId: fileMetadata.id })
}
