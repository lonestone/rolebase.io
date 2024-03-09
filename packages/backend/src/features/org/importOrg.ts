import { TRPCError } from '@trpc/server'
import axios from 'axios'
import * as yup from 'yup'
import { authedProcedure } from '../../trpc/authedProcedure'
import { nhost } from '../../utils/nhost'
import { importers } from './import'

/* Import a new organization from a file */

export default authedProcedure
  .input(
    yup.object().shape({
      provider: yup.mixed().oneOf(Object.keys(importers)).required(),
      fileId: yup.string().required(),
    })
  )
  .mutation(async (opts): Promise<string> => {
    const { provider, fileId } = opts.input

    // Get file from storage
    const fileUrl = nhost.storage.getPublicUrl({ fileId })

    const result = await axios
      .get(fileUrl, { responseType: 'arraybuffer' })
      .catch(() => {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Error downloading file ${fileUrl}`,
        })
      })

    const fileData = result.data

    // Run importer
    const importerFactory = importers[provider as keyof typeof importers]
    if (!importerFactory) {
      throw new TRPCError({ code: 'BAD_REQUEST', message: 'Unknown provider' })
    }
    const importer = importerFactory(opts.ctx.userId!)
    const orgId = await importer.importFile(fileData)

    return orgId
  })
