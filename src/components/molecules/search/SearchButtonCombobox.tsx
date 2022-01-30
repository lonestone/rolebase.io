import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  ListItem,
  useColorMode,
} from '@chakra-ui/react'
import ComboboxList from '@components/atoms/ComboboxList'
import { useCombobox, UseComboboxStateChange } from 'downshift'
import React, { ReactNode, useCallback, useRef } from 'react'
import ComboboxItem from '../../atoms/ComboboxItem'
import { SearchItem } from './searchItems'
import { useSearch } from './useSearch'
import { SearchOptions, useSearchItems } from './useSearchItems'

const maxDisplayedItems = 25

interface Props extends SearchOptions {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  leftIcon?: React.ReactElement
  onSelect(item: SearchItem): void
}

export default function SearchButtonCombobox({
  children,
  size,
  leftIcon,
  onSelect,
  ...options
}: Props) {
  const { colorMode } = useColorMode()
  const items = useSearchItems(options)
  const { filteredItems, onInputValueChange } = useSearch(items, false)

  const onSelectedItemChange = useCallback(
    (changes: UseComboboxStateChange<SearchItem>) => {
      const item = changes.selectedItem
      if (!item) return
      closeMenu()
      onSelect(item)
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
    <div style={{ position: 'relative' }} {...getComboboxProps()}>
      <InputGroup size={size}>
        {!isOpen && (
          <Button ref={buttonRef} leftIcon={leftIcon} onClick={handleClick}>
            {children}
          </Button>
        )}
        {isOpen && (
          <InputLeftElement pointerEvents="none" children={leftIcon} />
        )}
        <Input
          type="text"
          placeholder={children}
          style={{ display: isOpen ? 'block' : 'none' }}
          {...inputProps}
        />
      </InputGroup>

      <ComboboxList
        isOpen={isOpen}
        {...getMenuProps({}, { suppressRefError: true })}
        position="absolute"
        zIndex="2"
        pointerEvents="none"
      >
        {filteredItems.slice(0, maxDisplayedItems).map((item, index) => (
          <ListItem key={index}>
            <ComboboxItem
              item={item}
              highlighted={index === highlightedIndex}
              {...getItemProps({ item, index })}
              size={size}
              shadow="md"
              bg={colorMode === 'light' ? 'gray.100' : 'gray.550'}
              _active={{ bg: colorMode === 'light' ? 'gray.300' : 'gray.500' }}
            />
          </ListItem>
        ))}
      </ComboboxList>
    </div>
  )
}
