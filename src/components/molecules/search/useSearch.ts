import { useIdleCallback } from '@hooks/useIdleCallback'
import { SearchTypes } from '@shared/model/search'
import { UseComboboxStateChange } from 'downshift'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import incrementalSearch from './incrementalSearch'
import { SearchItem } from './searchTypes'

export function useSearch(
  items: SearchItem[],
  defaultEmpty: boolean,
  createItem?: boolean
) {
  const { t } = useTranslation()
  const [searchText, setSearchText] = useState('')

  // Filtered items using incremental search
  const filteredItems = useMemo(() => {
    const searchItems =
      searchText === ''
        ? defaultEmpty
          ? []
          : items
        : incrementalSearch(items, searchText)

    // Sort by text
    searchItems.sort((a, b) => a.text.localeCompare(b.text))

    // Add Create item
    if (createItem && searchText.length >= 1) {
      return searchItems.concat({
        id: 'create',
        text: searchText,
        type: SearchTypes.CreateAction,
        title: t(`useSearch.create`, {
          name: searchText,
        }) as string,
      })
    }

    return searchItems
  }, [t, searchText, items, defaultEmpty])

  // Search when input value changes
  const onInputValueChange = useIdleCallback(
    ({ inputValue }: UseComboboxStateChange<SearchItem>) => {
      setSearchText(inputValue || '')
    },
    []
  )

  return {
    filteredItems,
    onInputValueChange,
  }
}
