import {
  CloseButton,
  Input,
  InputGroup,
  InputRightElement,
  ListItem,
} from '@chakra-ui/react'
import { useCombobox, UseComboboxStateChange } from 'downshift'
import debounce from 'lodash.debounce'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ComboboxItem from './ComboboxItem'
import ComboboxList from './ComboboxList'
import incrementalSearch from './incrementalSearch'
import { SearchItem, SearchItemTypes } from './types'
import { useSearchItems } from './useSearchItems'

const maxDisplayedItems = 25

interface ComboboxProps {
  onMemberSelected(memberId: string): void
  onCircleSelected(circleId: string): void
  onCircleMemberSelected(circleId: string, memberId: string): void
}

export default function SearchCombobox({
  onMemberSelected,
  onCircleSelected,
  onCircleMemberSelected,
}: ComboboxProps) {
  const items = useSearchItems({
    members: true,
    circles: true,
    circleMembers: true,
  })

  const onInputValueChange = useMemo(
    () =>
      debounce(({ inputValue }: UseComboboxStateChange<SearchItem>) => {
        setInputItems(
          inputValue
            ? incrementalSearch(
                items,
                (item) => item.text,
                inputValue.toLowerCase()
              )
            : []
        )
      }, 250),
    [items]
  )

  const onSelectedItemChange = useCallback(
    (changes: UseComboboxStateChange<SearchItem>) => {
      const item = changes.selectedItem
      if (!item) return
      setInputValue('')

      // Member edit modal
      if (item.type === SearchItemTypes.Member) {
        onMemberSelected(item.member.id)
      }

      // Circle focus
      else if (item.type === SearchItemTypes.Circle) {
        onCircleSelected(item.circle.id)
      }

      // Circle member focus
      else if (item.type === SearchItemTypes.CircleMember && item.member) {
        onCircleMemberSelected(item.circle.id, item.member.id)
      }
    },
    []
  )

  const [inputItems, setInputItems] = useState<SearchItem[]>([])
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    setHighlightedIndex,
    getItemProps,
    openMenu,
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
          <ListItem textAlign="right" mb={2} key={index}>
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
