import { Input, InputGroup, ListItem } from '@chakra-ui/react'
import ComboboxList from '@components/atoms/ComboboxList'
import { useCombobox, UseComboboxStateChange } from 'downshift'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import ComboboxItem from '../../atoms/ComboboxItem'
import { getSearchItemId, itemToString, SearchItem } from './searchItems'
import { useSearch } from './useSearch'
import { SearchOptions, useSearchItems } from './useSearchItems'

const maxDisplayedItems = 25

interface Props extends SearchOptions {
  value?: string // Circle / Member / CircleMember id
  onChange(value: string): void
}

export default function EntityButtonCombobox({
  value,
  onChange,
  ...options
}: Props) {
  const items = useSearchItems(options)
  const { inputItems, searchItems, onInputValueChange } = useSearch(
    items,
    false
  )

  // Set default items on mount
  useEffect(
    () =>
      searchItems(
        value
          ? itemToString(items.find((item) => getSearchItemId(item) === value))
          : ''
      ),
    []
  )

  const onSelectedItemChange = useCallback(
    (changes: UseComboboxStateChange<SearchItem>) => {
      const item = changes.selectedItem
      if (!item) return
      closeMenu()
      onChange(getSearchItemId(item))
      buttonRef.current?.focus()
    },
    []
  )

  const {
    isOpen,
    openMenu,
    closeMenu,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    setHighlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    defaultSelectedItem: value
      ? items.find((item) => getSearchItemId(item) === value)
      : undefined,
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

  // When items list changes, highlight first item
  useEffect(() => setHighlightedIndex(0), [inputItems])

  const valueItem = useMemo(
    () => value && items.find((item) => getSearchItemId(item) === value),
    [value, items]
  )

  // Click on selected item button to put it in editing mode
  const handleClick = () => {
    openMenu()
    // Wait for the input to appears, then focus it
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  return (
    <div style={{ position: 'relative' }} {...getComboboxProps()}>
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
          placeholder="Rechercher..."
          style={{ display: isOpen || !valueItem ? 'block' : 'none' }}
          {...inputProps}
        />
      </InputGroup>

      <ComboboxList
        isOpen={isOpen}
        {...getMenuProps()}
        position="absolute"
        zIndex="1"
        left="0"
      >
        {inputItems.slice(0, maxDisplayedItems).map((item, index) => (
          <ListItem mb={1} key={index}>
            <ComboboxItem
              item={item}
              highlighted={index === highlightedIndex}
              {...getItemProps({ item, index })}
              shadow="md"
            />
          </ListItem>
        ))}
      </ComboboxList>
    </div>
  )
}
