import { Box, Input, InputGroup } from '@chakra-ui/react'
import { useCombobox, UseComboboxStateChange } from 'downshift'
import React, { useCallback, useMemo, useRef } from 'react'
import SearchResultItem from './SearchResultItem'
import SearchResultsList from './SearchResultsList'
import { SearchItem } from './searchTypes'
import { useSearch } from './useSearch'

export interface SearchInputProps {
  value?: string // Circle / Member / CircleMember id
  items: SearchItem[]
  size?: 'sm' | 'md' | 'lg'
  onChange(value: string): void
}

export default function SearchInput({
  value,
  size,
  items,
  onChange,
}: SearchInputProps) {
  const { filteredItems, onInputValueChange } = useSearch(items, false)

  const onSelectedItemChange = useCallback(
    (changes: UseComboboxStateChange<SearchItem>) => {
      const item = changes.selectedItem
      if (!item) return
      closeMenu()
      onChange(item.id)
      selectItem(undefined as any)
      buttonRef.current?.focus()
    },
    []
  )

  const {
    isOpen,
    openMenu,
    closeMenu,
    highlightedIndex,
    selectItem,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
  } = useCombobox({
    items: filteredItems,
    defaultSelectedItem: value
      ? items.find((item) => item.id === value)
      : undefined,
    defaultHighlightedIndex: 0,
    itemToString: () => '',
    onInputValueChange,
    onSelectedItemChange,
  })

  // Button
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Input
  const inputRef = useRef<HTMLInputElement | null>(null)
  const inputProps = getInputProps({
    ref: inputRef,
    onFocus: openMenu,
  })

  const valueItem = useMemo(
    () => (value ? items.find((item) => item.id === value) : undefined),
    [value, items]
  )

  // Click on selected item button to put it in editing mode
  const handleClick = () => {
    openMenu()
    // Wait for the input to appears, then focus it
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  return (
    <Box position="relative" {...getComboboxProps()}>
      <InputGroup>
        {valueItem && !isOpen && (
          <SearchResultItem
            ref={buttonRef}
            size={size}
            item={valueItem}
            highlighted={false}
            onMouseDown={handleClick}
            onClick={handleClick}
          />
        )}
        <Input
          type="text"
          placeholder="Sélectionner..."
          onFocus={openMenu}
          size={size}
          display={isOpen || !valueItem ? '' : 'none'}
          w="auto"
          {...inputProps}
        />
      </InputGroup>

      <SearchResultsList
        items={filteredItems}
        isOpen={isOpen}
        highlightedIndex={highlightedIndex}
        getMenuProps={getMenuProps}
        getItemProps={getItemProps}
        inputRef={inputRef}
      />
    </Box>
  )
}
