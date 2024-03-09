import { AlgoliaConfig } from '@rolebase/shared/model/search'
import algoliasearch from 'algoliasearch'
import * as yup from 'yup'
import { authedProcedure } from '../../authedProcedure'
import { Member_Role_Enum } from '../../gql'
import settings from '../../settings'
import { guardOrg } from '../../utils/guardOrg'

const yupSchema = yup.object().shape({
  orgId: yup.string().required(),
})

export const getAlgoliaConfig = authedProcedure
  .input(yupSchema)
  .query(async (opts): Promise<AlgoliaConfig> => {
    const { orgId } = opts.input

    await guardOrg(orgId, Member_Role_Enum.Readonly, opts.ctx)

    const apiKey = algoliasearch(
      settings.algolia.appId,
      settings.algolia.adminApiKey
    ).generateSecuredApiKey(settings.algolia.searchApiKey, {
      filters: `orgId:${orgId}`,
    })

    return {
      appId: settings.algolia.appId,
      apiKey,
      indexName: settings.algolia.indexName,
    }
  })
