import { nhost } from 'src/nhost'
import { getFileSHA1 } from '../../../utils/getFileSHA1'

// Upload file and return URL
export async function uploadFile(orgId: string, file: File): Promise<string> {
  const hash = await getFileSHA1(file)
  const name = `orgs/${orgId}/uploads/${hash}`

  // Upload file
  const { body } = await nhost.storage.uploadFiles({
    'file[]': [file],
    'metadata[]': [{ name }],
  })

  // Return URL
  return `${nhost.storage.baseURL}/files/${body.processedFiles[0].id}`
}
