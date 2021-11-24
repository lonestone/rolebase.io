import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  ListItem,
  Portal,
} from '@chakra-ui/react'
import ComboboxList from '@components/atoms/ComboboxList'
import { useCombobox, UseComboboxStateChange } from 'downshift'
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import ComboboxItem from '../../atoms/ComboboxItem'
import { itemToString, SearchItem } from './searchItems'
import { useSearch } from './useSearch'
import { SearchOptions, useSearchItems } from './useSearchItems'

const maxDisplayedItems = 25

interface Props extends SearchOptions {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  leftIcon?: React.ReactElement
  onSelect(item: SearchItem): void
}

interface Position {
  top: number
  left: number
}

export default function SearchButtonCombobox({
  children,
  size,
  leftIcon,
  onSelect,
  ...options
}: Props) {
  const items = useSearchItems(options)
  const { inputItems, searchItems, onInputValueChange } = useSearch(
    items,
    false
  )

  const onSelectedItemChange = useCallback(
    (changes: UseComboboxStateChange<SearchItem>) => {
      const item = changes.selectedItem
      if (!item) return
      closeMenu()
      onSelect(item)
      setInputValue('')
      buttonRef.current?.focus()
    },
    []
  )

  const {
    isOpen,
    openMenu,
    closeMenu,
    inputValue,
    setInputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    setHighlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    itemToString,
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

  // Menu position
  const [menuPosition, setMenuPosition] = useState<Position | undefined>()

  useLayoutEffect(() => {
    if (!inputRef.current) return
    const { top, left, height } = inputRef.current.getBoundingClientRect()
    setMenuPosition({
      top: (top || 0) + (height || 0),
      left: left,
    })
  }, [isOpen])

  // When items list changes, highlight first item
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setHighlightedIndex(0), 0)
    }
  }, [inputItems, isOpen])

  // Click on button to put it in editing mode
  const handleClick = () => {
    searchItems(inputValue)
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

      <Portal appendToParentPortal={false}>
        <ComboboxList
          isOpen={isOpen}
          {...getMenuProps({}, { suppressRefError: true })}
          position="absolute"
          zIndex="2000"
          top={menuPosition?.top + 'px'}
          left={menuPosition?.left + 'px'}
        >
          {inputItems.slice(0, maxDisplayedItems).map((item, index) => (
            <ListItem mb={1} key={index}>
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
      </Portal>
    </div>
  )
}
