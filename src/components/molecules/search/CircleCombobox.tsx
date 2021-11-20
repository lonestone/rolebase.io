import { Input, InputGroup, ListItem } from '@chakra-ui/react'
import { useCombobox, UseComboboxStateChange } from 'downshift'
import debounce from 'lodash.debounce'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ComboboxItem from './ComboboxItem'
import ComboboxList from './ComboboxList'
import incrementalSearch from './incrementalSearch'
import { SearchItem, SearchItemTypes } from './types'
import { useSearchItems } from './useSearchItems'

const maxDisplayedItems = 25

interface CircleComboboxProps {
  value?: string // Circle id
  onChange(circleId: string): void
}

function itemToString(item: SearchItem | undefined | null) {
  return item ? item.text : ''
}

export default function CircleCombobox({
  value,
  onChange,
}: CircleComboboxProps) {
  const items = useSearchItems({
    circles: true,
  })
  const [inputItems, setInputItems] = useState<SearchItem[]>([])

  const updateSearch = (inputValue: string) =>
    setInputItems(
      inputValue === ''
        ? items
        : inputValue
        ? incrementalSearch(
            items,
            (item) => item.text,
            inputValue.toLowerCase()
          )
        : []
    )

  // Search with debounce when input value changes
  const onInputValueChange = useMemo(
    () =>
      debounce(
        ({ inputValue }: UseComboboxStateChange<SearchItem>) =>
          updateSearch(inputValue || ''),
        250
      ),
    [items]
  )

  // Set default item on mount
  useEffect(
    () =>
      updateSearch(
        value
          ? itemToString(
              items.find(
                (item) =>
                  item.type === SearchItemTypes.Circle &&
                  item.circle.id === value
              )
            )
          : ''
      ),
    []
  )

  const onSelectedItemChange = useCallback(
    (changes: UseComboboxStateChange<SearchItem>) => {
      const item = changes.selectedItem
      if (!item) return
      closeMenu()
      if (item.type === SearchItemTypes.Circle) {
        onChange(item.circle.id)
      }
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
      ? items.find(
          (item) =>
            item.type === SearchItemTypes.Circle && item.circle.id === value
        )
      : undefined,
    itemToString,
    onInputValueChange,
    onSelectedItemChange,
  })

  // Input
  const inputRef = useRef<HTMLInputElement | null>(null)
  const inputProps = getInputProps({
    ref: inputRef,
    onFocus: openMenu,
  })

  // When items list changes, highlight first item
  useEffect(() => setHighlightedIndex(0), [inputItems])

  const selectedCircle = useMemo(
    () =>
      value &&
      items.find(
        (item) =>
          item.type === SearchItemTypes.Circle && item.circle.id === value
      ),
    [value, items]
  )

  // Click on selected circle to put it in editing mode
  const handleSelectedCircleClick = () => {
    openMenu()
    // Wait for the input to appears, then focus it
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  useEffect(() => {}, [])

  return (
    <div style={{ position: 'relative' }} {...getComboboxProps()}>
      <InputGroup>
        {selectedCircle && !isOpen && (
          <ComboboxItem
            item={selectedCircle}
            highlighted={false}
            onMouseDown={handleSelectedCircleClick}
            onClick={handleSelectedCircleClick}
          />
        )}
        <Input
          type="text"
          placeholder="Rechercher..."
          style={{ display: isOpen || !selectedCircle ? 'block' : 'none' }}
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
          <ListItem mb={2} key={index}>
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
