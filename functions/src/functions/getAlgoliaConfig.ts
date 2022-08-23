import { AlgoliaConfig } from '@shared/model/search'
import { ClaimRole } from '@shared/model/userClaims'
import algoliasearch from 'algoliasearch'
import * as functions from 'firebase-functions'
import { guardOrg } from '../helpers/guards'
import settings from '../settings'

interface Payload {
  orgId: string
}

export const getAlgoliaConfig = functions.https.onCall(
  async (data: Payload, context): Promise<AlgoliaConfig> => {
    await guardOrg(context, data.orgId, ClaimRole.Readonly)

    const apiKey = algoliasearch(
      settings.algolia.appId,
      settings.algolia.adminApiKey
    ).generateSecuredApiKey(settings.algolia.searchApiKey, {
      filters: `orgId:${data.orgId}`,
    })

    return {
      appId: settings.algolia.appId,
      apiKey,
      indexName: settings.algolia.indexName,
    }
  }
)
