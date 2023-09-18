import settings from '@settings'
import algoliasearch, { SearchIndex } from 'algoliasearch'

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
