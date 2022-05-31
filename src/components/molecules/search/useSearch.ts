import { useIdleCallback } from '@hooks/useIdleCallback'
import { UseComboboxStateChange } from 'downshift'
import { useMemo, useState } from 'react'
import incrementalSearch from './incrementalSearch'
import { SearchItem, SearchItemTypes } from './searchTypes'

export function useSearch(
  items: SearchItem[],
  defaultEmpty: boolean,
  createItem?: boolean
) {
  const [searchText, setSearchText] = useState('')

  // Filtered items using incremental search
  const filteredItems = useMemo(() => {
    const searchItems =
      searchText === ''
        ? defaultEmpty
          ? []
          : items
        : incrementalSearch(items, (item) => item.text, searchText)

    // Add Create item
    if (createItem && searchText.length >= 1) {
      return searchItems.concat({
        id: 'create',
        text: searchText,
        type: SearchItemTypes.CreateAction,
      })
    }

    return searchItems
  }, [searchText, items, defaultEmpty])

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
