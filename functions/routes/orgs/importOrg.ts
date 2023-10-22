import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { nhost } from '@utils/nhost'
import { RouteError, route } from '@utils/route'
import { importers } from '_src/import'
import axios from 'axios'
import * as yup from 'yup'

/* Import a new organization from a file */

const yupSchema = yup.object().shape({
  provider: yup.mixed().oneOf(Object.keys(importers)).required(),
  fileId: yup.string().required(),
})

export default route(async (context): Promise<string> => {
  const userId = guardAuth(context)
  const { provider, fileId } = guardBodyParams(context, yupSchema)

  // Get file from storage
  console.log('DEBUG: fileId', fileId)
  const fileUrl = nhost.storage.getPublicUrl({ fileId })
  console.log('DEBUG: fileUrl', fileUrl)
  const result = await axios
    .get(fileUrl, { responseType: 'arraybuffer' })
    .catch(() => {
      throw new RouteError(400, `Error downloading file ${fileUrl}`)
    })
  console.log('DEBUG: file loaded')
  const fileData = result.data

  // Run importer
  const importerFactory = importers[provider as keyof typeof importers]
  if (!importerFactory) {
    throw new RouteError(400, 'Unknown provider')
  }
  const importer = importerFactory(userId)
  const orgId = await importer.importFile(fileData)

  return orgId
})
