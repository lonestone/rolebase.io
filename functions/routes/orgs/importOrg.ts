import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { importers } from '@utils/import'
import { nhost } from '@utils/nhost'
import { RouteError, route } from '@utils/route'
import axios from 'axios'
import * as yup from 'yup'

/* Import a new organization from a file */

const yupSchema = yup.object().shape({
  provider: yup.mixed().oneOf(Object.keys(importers)).required(),
  fileId: yup.string().required(),
})

export default route(async (context): Promise<string> => {
  guardAuth(context)
  const { provider, fileId } = guardBodyParams(context, yupSchema)

  // Get file from storage
  const fileUrl = nhost.storage.getPublicUrl({ fileId })
  const result = await axios.get(fileUrl, { responseType: 'arraybuffer' })
  if (result.status !== 200) {
    throw new RouteError(400, 'Error downloading file')
  }
  const fileData = result.data

  // Run importer
  const importerFactory = importers[provider as keyof typeof importers]
  if (!importerFactory) {
    throw new RouteError(400, 'Unknown provider')
  }
  const importer = importerFactory(context)
  const orgId = await importer.importFile(fileData)

  return orgId
})
