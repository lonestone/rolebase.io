import { UseComboboxStateChange } from 'downshift'
import { debounce } from 'lodash'
import { useMemo, useState } from 'react'
import incrementalSearch from './incrementalSearch'
import { SearchItem } from './searchItems'

export function useSearch(items: SearchItem[], defaultEmpty: boolean) {
  const [inputItems, setInputItems] = useState<SearchItem[]>([])

  const searchItems = (inputValue: string) =>
    setInputItems(
      inputValue === ''
        ? defaultEmpty
          ? []
          : items
        : incrementalSearch(
            items,
            (item) => item.text,
            inputValue.toLowerCase()
          )
    )

  // Search with debounce when input value changes
  const onInputValueChange = useMemo(
    () =>
      debounce(
        ({ inputValue }: UseComboboxStateChange<SearchItem>) =>
          searchItems(inputValue || ''),
        250
      ),
    [items]
  )

  return {
    inputItems,
    searchItems,
    onInputValueChange,
  }
}
