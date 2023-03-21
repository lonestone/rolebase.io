import { Member_Role_Enum } from '@gql'
import { AlgoliaConfig } from '@shared/model/search'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { route } from '@utils/route'
import settings from '@utils/settings'
import algoliasearch from 'algoliasearch'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  orgId: yup.string().required(),
})

export default route(async (context): Promise<AlgoliaConfig> => {
  guardAuth(context)
  const { orgId } = guardBodyParams(context, yupSchema)

  await guardOrg(orgId, Member_Role_Enum.Readonly, context.userId)

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
