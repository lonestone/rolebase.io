import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  useColorMode,
} from '@chakra-ui/react'
import { useCombobox, UseComboboxStateChange } from 'downshift'
import React, { ReactNode, useCallback, useRef } from 'react'
import SearchResultItem from './SearchResultItem'
import { SearchItem, SearchItemTypes } from './searchTypes'
import { useSearch } from './useSearch'

const maxDisplayedItems = 25

export interface SearchButtonProps {
  children: ReactNode
  items: SearchItem[]
  size?: 'sm' | 'md' | 'lg'
  leftIcon?: React.ReactElement
  onSelect(id: string): void
  onCreate?(name: string): Promise<string>
}

export default function SearchButton({
  children,
  items,
  size,
  leftIcon,
  onSelect,
  onCreate,
}: SearchButtonProps) {
  const { colorMode } = useColorMode()
  const { filteredItems, onInputValueChange } = useSearch(items, false, true)

  const onSelectedItemChange = useCallback(
    async (changes: UseComboboxStateChange<SearchItem>) => {
      const item = changes.selectedItem
      if (!item) return
      closeMenu()

      if (onCreate && item.type === SearchItemTypes.CreateAction) {
        // Create entity then select it
        const id = await onCreate(item.text)
        onSelect(id)
      } else {
        // Select existing entity
        onSelect(item.id)
      }

      selectItem(undefined as any)
      setInputValue('')
      buttonRef.current?.focus()
    },
    [onSelect]
  )

  const {
    isOpen,
    openMenu,
    closeMenu,
    highlightedIndex,
    setInputValue,
    selectItem,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
  } = useCombobox({
    items: filteredItems,
    itemToString: () => '',
    defaultHighlightedIndex: 0,
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

  // Click on button to put it in editing mode
  const handleClick = () => {
    openMenu()
    // Wait for the input to appears, then focus it
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  return (
    <Box position="relative" {...getComboboxProps()}>
      <InputGroup size={size}>
        {!isOpen && (
          <Button ref={buttonRef} leftIcon={leftIcon} onClick={handleClick}>
            {children}
          </Button>
        )}
        {isOpen && (
          <InputLeftElement pointerEvents="none">{leftIcon}</InputLeftElement>
        )}
        <Input
          type="text"
          placeholder={children}
          display={isOpen ? '' : 'none'}
          {...inputProps}
        />
      </InputGroup>

      <List
        {...getMenuProps({}, { suppressRefError: true })}
        display={isOpen ? '' : 'none'}
        position="absolute"
        zIndex="2"
        pt={1}
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
