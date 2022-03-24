import {
  Box,
  Input,
  InputGroup,
  List,
  ListItem,
  useColorMode,
} from '@chakra-ui/react'
import { useCombobox, UseComboboxStateChange } from 'downshift'
import React, { useCallback, useMemo, useRef } from 'react'
import SearchResultItem from './SearchResultItem'
import { SearchItem } from './searchTypes'
import { useSearch } from './useSearch'

const maxDisplayedItems = 25

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
  const { colorMode } = useColorMode()
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
          {...inputProps}
        />
      </InputGroup>

      <List
        {...getMenuProps()}
        display={isOpen ? '' : 'none'}
        pt={1}
        position="absolute"
        zIndex="2"
        shadow="md"
        bg={colorMode === 'light' ? 'gray.100' : 'gray.550'}
        pointerEvents="none"
      >
        {filteredItems.slice(0, maxDisplayedItems).map((item, index) => (
          <ListItem key={index}>
            <SearchResultItem
              {...getItemProps({ item, index })}
              item={item}
              highlighted={index === highlightedIndex}
              size={size}
              w="100%"
              _active={{ bg: colorMode === 'light' ? 'gray.300' : 'gray.500' }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
