import { sha1 } from '@utils/sha1'
import { loadFileBuffer } from './loadFileBuffer'
import { saveFile } from './saveFile'

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
