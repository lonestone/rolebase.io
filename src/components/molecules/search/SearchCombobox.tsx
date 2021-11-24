import {
  CloseButton,
  Input,
  InputGroup,
  InputRightElement,
  ListItem,
} from '@chakra-ui/react'
import ComboboxList from '@components/atoms/ComboboxList'
import { useCombobox, UseComboboxStateChange } from 'downshift'
import React, { useCallback, useEffect } from 'react'
import ComboboxItem from '../../atoms/ComboboxItem'
import { SearchItem } from './searchItems'
import { useSearch } from './useSearch'
import { useSearchItems } from './useSearchItems'

const maxDisplayedItems = 25

const searchOptions = {
  members: true,
  circles: true,
  circleMembers: true,
}

interface ComboboxProps {
  onSelect(item: SearchItem): void
}

export default function SearchCombobox({ onSelect }: ComboboxProps) {
  const items = useSearchItems(searchOptions)
  const { inputItems, onInputValueChange } = useSearch(items, true)

  const onSelectedItemChange = useCallback(
    (changes: UseComboboxStateChange<SearchItem>) => {
      const item = changes.selectedItem
      if (!item) return
      onSelect(item)
      setInputValue('')
    },
    []
  )

  const {
    isOpen,
    openMenu,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    setHighlightedIndex,
    getItemProps,
    setInputValue,
  } = useCombobox({
    items: inputItems,
    itemToString: (item) => (item ? item.text : ''),
    onInputValueChange,
    onSelectedItemChange,
  })

  // When items list changes, highlight first item
  useEffect(() => setHighlightedIndex(0), [inputItems])

  return (
    <div style={{ position: 'relative' }} {...getComboboxProps()}>
      <InputGroup>
        <Input
          type="text"
          placeholder="Rechercher..."
          bg="white"
          w="200px"
          _focus={{ width: '250px' }}
          onClick={() => openMenu()}
          {...getInputProps()}
        />
        <InputRightElement
          children={
            <CloseButton
              colorScheme="gray"
              size="sm"
              onClick={() => setInputValue('')}
            />
          }
        />
      </InputGroup>

      <ComboboxList
        isOpen={isOpen}
        {...getMenuProps()}
        position="absolute"
        zIndex="1"
        right="0"
      >
        {inputItems.slice(0, maxDisplayedItems).map((item, index) => (
          <ListItem textAlign="right" mb={1} key={index}>
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
