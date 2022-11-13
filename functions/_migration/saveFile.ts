import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { nhost } from '@utils/nhost'
import settings from '@utils/settings'
import FormData from 'form-data'
import { Readable } from 'stream'

export async function saveFile(
  name: string,
  buffer: Buffer
): Promise<{ fileId: string; url: string }> {
  // Check if file already exists
  const { files } = await adminRequest(
    gql(`
    query GetFileByName($name: String!) {
      files(where: { name: { _eq: $name } }) {
        id
      }
    }
  `),
    { name }
  )
  if (files[0]) {
    const fileId = files[0].id
    console.log(`Retrieved file ${fileId}: ${name}`)
    return {
      fileId,
      url: settings.storageUrl + fileId,
    }
  }

  // Upload file to Nhost Storage
  const fd = new FormData()
  fd.append('file', Readable.from(buffer), name)
  const { error, fileMetadata } = await nhost.storage.upload({
    formData: fd,
    name,
  })
  if (error) throw error
  const fileId = fileMetadata.id
  const url = settings.storageUrl + fileId

  console.log(`Imported file ${fileId}: ${name}`)
  return { fileId, url }
}
