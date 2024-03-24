import algoliasearch, { SearchIndex } from 'algoliasearch'
import settings from '../../../settings'

let index: SearchIndex

export default function getAlgoliaIndex() {
  if (!index) {
    index = algoliasearch(
      settings.algolia.appId,
      settings.algolia.adminApiKey
    ).initIndex(settings.algolia.indexName)
  }
  return index
}
