import { getAlgoliaConfig } from '@api/functions'
import useDateLocale from '@hooks/useDateLocale'
import { useOrgId } from '@hooks/useOrgId'
import { AlgoliaConfig, SearchDoc, SearchTypes } from '@shared/model/search'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import { UserLocalStorageKeys } from '@utils/localStorage'
import algoliasearch from 'algoliasearch'
import { format } from 'date-fns'
import debounce from 'lodash.debounce'
import { useMemo, useState } from 'react'
import { SearchItem } from './searchTypes'

async function getConfig(orgId: string): Promise<AlgoliaConfig> {
  const key = UserLocalStorageKeys.AlgoliaConfig.replace('{id}', orgId)

  // Use config from localStorage
  const localConfig = localStorage.getItem(key)
  if (localConfig) {
    return JSON.parse(localConfig)
  }

  // Query function to get Algolia config
  const config = await getAlgoliaConfig({ orgId })
  localStorage.setItem(key, JSON.stringify(config))
  return config
}

export function useAlgoliaSearch() {
  const dateLocale = useDateLocale()
  const orgId = useOrgId()
  const [loading, setLoading] = useState(false)
  const [filteredItems, setFilteredItems] = useState<SearchItem[]>([])

  // Get Algolia config
  const indexPromise = useMemo(() => {
    if (!orgId) return
    return getConfig(orgId)
      .then((config) =>
        algoliasearch(config.appId, config.apiKey).initIndex(config.indexName)
      )
      .catch(console.error)
  }, [orgId])

  const search = useMemo(() => {
    return debounce(async (value: string, type?: SearchTypes) => {
      if (!value) {
        setFilteredItems([])
        return
      }

      // Wait for index to be ready
      const index = await indexPromise
      if (!index) {
        // Retry
        search(value, type)
        return
      }

      try {
        setLoading(true)

        // Search query
        const { hits } = await index.search<SearchDoc>(
          value,
          type ? { facetFilters: `type:${type}` } : undefined
        )

        setFilteredItems(
          hits.map((hit) => {
            const title = hit.startDate
              ? `${hit.title}, ${capitalizeFirstLetter(
                  format(new Date(hit.startDate), 'PPPP', {
                    locale: dateLocale,
                  })
                )}`
              : hit.title

            return {
              id: hit.objectID,
              type: hit.type,
              text: '',
              title,
              picture: hit.picture,
            }
          })
        )
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }, 200)
  }, [indexPromise])

  return {
    loading,
    filteredItems,
    search,
  }
}
