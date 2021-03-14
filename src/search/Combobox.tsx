import {
  CloseButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { useCombobox, UseComboboxStateChange } from 'downshift'
import debounce from 'lodash.debounce'
import React, { useCallback, useMemo, useState } from 'react'
import incrementalSearch from '../utils/incrementalSearch'
import ComboboxItem from './ComboboxItem'
import ComboboxList from './ComboboxList'
import { SearchItem, SearchItemTypes } from './types'
import { useSearchItems } from './useSearchItems'

const maxDisplayedItems = 25

interface ComboboxProps {
  onMemberSelected(memberId: string): void
  onCircleSelected(circleId: string): void
  onCircleMemberSelected(circleId: string, memberId: string): void
}

export default function Combobox({
  onMemberSelected,
  onCircleSelected,
  onCircleMemberSelected,
}: ComboboxProps) {
  const items = useSearchItems()

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

  const [inputItems, setInputItems] = useState(items)
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    openMenu,
    setInputValue,
  } = useCombobox({
    items: inputItems,
    onInputValueChange,
    onSelectedItemChange,
  })

  return (
    <div style={{ position: 'relative' }} {...getComboboxProps()}>
      <InputGroup w="200px">
        <Input
          type="text"
          placeholder="Rechercher..."
          bg="white"
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
        zIndex="100"
        right="0"
      >
        {inputItems.slice(0, maxDisplayedItems).map((item, index) => (
          <ComboboxItem
            item={item}
            itemIndex={index}
            highlightedIndex={highlightedIndex}
            {...getItemProps({ item, index })}
            key={index}
          />
        ))}
      </ComboboxList>
    </div>
  )
}
