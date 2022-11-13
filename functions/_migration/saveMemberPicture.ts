import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { storage } from './firebase'
import { saveFile } from './saveFile'

export async function saveMemberPicture(
  oldOrgId: string,
  newOrgId: string,
  oldId: string,
  newId: string
) {
  // Download file from Firebase
  const result = await storage
    .file(`orgs/${oldOrgId}/members/${oldId}`)
    .download()
  const buffer = result[0]
  if (!buffer) return

  // Upload file to Nhost Storage
  const name = `orgs/${newOrgId}/members/${newId}`
  const { url, fileId } = await saveFile(name, buffer)

  // Update member
  await adminRequest(
    gql(`
      mutation ImportMemberPicture($id: uuid!, $picture: String!, $pictureFileId: uuid!) {
        update_member_by_pk(pk_columns: { id: $id }, _set: { picture: $picture, pictureFileId: $pictureFileId }) {
          id
        }
      }
    `),
    {
      id: newId,
      picture: url,
      pictureFileId: fileId,
    }
  )
}
