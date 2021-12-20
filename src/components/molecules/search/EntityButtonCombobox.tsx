import { Box, Input, InputGroup, ListItem } from '@chakra-ui/react'
import ComboboxList from '@components/atoms/ComboboxList'
import { useCombobox, UseComboboxStateChange } from 'downshift'
import React, { useCallback, useMemo, useRef } from 'react'
import ComboboxItem from '../../atoms/ComboboxItem'
import { getSearchItemId, SearchItem } from './searchItems'
import { useSearch } from './useSearch'
import { SearchOptions, useSearchItems } from './useSearchItems'

const maxDisplayedItems = 25

interface Props extends SearchOptions {
  value?: string // Circle / Member / CircleMember id
  size?: 'sm' | 'md' | 'lg'
  onChange(value: string): void
}

export default function EntityButtonCombobox({
  value,
  size,
  onChange,
  ...options
}: Props) {
  const items = useSearchItems(options)
  const { filteredItems, onInputValueChange } = useSearch(items, false)

  const onSelectedItemChange = useCallback(
    (changes: UseComboboxStateChange<SearchItem>) => {
      const item = changes.selectedItem
      if (!item) return
      closeMenu()
      onChange(getSearchItemId(item))
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
      ? items.find((item) => getSearchItemId(item) === value)
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
    () =>
      value ? items.find((item) => getSearchItemId(item) === value) : undefined,
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
          <ComboboxItem
            ref={buttonRef}
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
          style={{ display: isOpen || !valueItem ? 'block' : 'none' }}
          {...inputProps}
        />
      </InputGroup>

      <ComboboxList
        isOpen={isOpen}
        {...getMenuProps()}
        position="absolute"
        zIndex="1"
        pointerEvents="none"
      >
        {filteredItems.slice(0, maxDisplayedItems).map((item, index) => (
          <ListItem key={index} mb={1}>
            <ComboboxItem
              item={item}
              highlighted={index === highlightedIndex}
              {...getItemProps({ item, index })}
              size={size}
              shadow="md"
            />
          </ListItem>
        ))}
      </ComboboxList>
    </Box>
  )
}
