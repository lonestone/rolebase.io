import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { ImportProviders, importers } from '@utils/import'
import { nhost } from '@utils/nhost'
import { RouteError, route } from '@utils/route'
import axios from 'axios'
import * as yup from 'yup'

/* Import a new organization from a file */

const yupSchema = yup.object().shape({
  provider: yup.mixed().oneOf(Object.values(ImportProviders)).required(),
  fileId: yup.string().required(),
})

export default route(async (context): Promise<void> => {
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
  const importer = importers[provider]
  if (!importer) {
    throw new RouteError(400, 'Unknown provider')
  }
  await importer(context, fileData)
})
