import { getAlgoliaConfig } from '@api/functions'
import { useIdleCallback } from '@hooks/useIdleCallback'
import { useOrgId } from '@hooks/useOrgId'
import { AlgoliaConfig, SearchDoc } from '@shared/model/search'
import algoliasearch from 'algoliasearch'
import { UseComboboxStateChange } from 'downshift'
import debounce from 'lodash.debounce'
import { useMemo, useState } from 'react'
import { UserLocalStorageKeys } from 'src/utils'
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
  const orgId = useOrgId()
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

  const searchDebounce = useMemo(() => {
    return debounce(async (value: string) => {
      const index = await indexPromise
      if (!index) {
        searchDebounce(value)
        return
      }
      try {
        const { hits } = await index.search<SearchDoc>(value)
        setFilteredItems(
          hits.map((hit) => ({
            id: hit.objectID,
            type: hit.type,
            text: '',
            title: hit.title,
            picture: hit.picture,
          }))
        )
      } catch (e) {
        console.error(e)
      }
    }, 200)
  }, [indexPromise])

  // Search when input value changes
  const onInputValueChange = useIdleCallback(
    ({ inputValue }: UseComboboxStateChange<SearchItem>) => {
      if (!inputValue) {
        return setFilteredItems([])
      }
      searchDebounce(inputValue || '')
    },
    []
  )

  return {
    filteredItems,
    onInputValueChange,
  }
}
