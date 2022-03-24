import { UseComboboxStateChange } from 'downshift'
import { debounce } from 'lodash'
import { useMemo, useState } from 'react'
import incrementalSearch from './incrementalSearch'
import { SearchItem } from './searchTypes'

export function useSearch(items: SearchItem[], defaultEmpty: boolean) {
  const [searchText, setSearchText] = useState('')

  // Filtered items using incremental search
  const filteredItems = useMemo(
    () =>
      searchText === ''
        ? defaultEmpty
          ? []
          : items
        : incrementalSearch(items, (item) => item.text, searchText),
    [searchText, items, defaultEmpty]
  )

  // Search with debounce when input value changes
  const onInputValueChange = useMemo(
    () =>
      debounce(
        ({ inputValue }: UseComboboxStateChange<SearchItem>) =>
          setSearchText(inputValue || ''),
        250
      ),
    [items]
  )

  return {
    filteredItems,
    onInputValueChange,
  }
}
