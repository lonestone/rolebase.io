import {
  CloseButton,
  Input,
  InputGroup,
  InputRightElement,
  ListItem,
  useColorMode,
} from '@chakra-ui/react'
import ComboboxList from '@components/atoms/ComboboxList'
import { useCombobox, UseComboboxStateChange } from 'downshift'
import React, { useCallback, useContext } from 'react'
import { CircleMemberContext } from 'src/contexts/CircleMemberContext'
import ComboboxItem from '../../atoms/ComboboxItem'
import { SearchItem, SearchItemTypes } from './searchItems'
import { useSearch } from './useSearch'
import { SearchOptions, useSearchItems } from './useSearchItems'

const maxDisplayedItems = 25

const searchOptions: SearchOptions = {
  members: true,
  circles: true,
  circleMembers: true,
}

export default function HeaderSearchCombobox() {
  const { colorMode } = useColorMode()
  const items = useSearchItems(searchOptions)
  const { filteredItems, onInputValueChange } = useSearch(items, true)
  const circleMemberContext = useContext(CircleMemberContext)

  const onSelectedItemChange = useCallback(
    (changes: UseComboboxStateChange<SearchItem>) => {
      const item = changes.selectedItem
      if (!item) return

      if (item.type === SearchItemTypes.Member) {
        circleMemberContext?.goTo(undefined, item.member.id)
      } else if (item.type === SearchItemTypes.Circle) {
        circleMemberContext?.goTo(item.circle.id)
      } else if (item.type === SearchItemTypes.CircleMember) {
        circleMemberContext?.goTo(item.circle.id, item.member.id)
      }

      selectItem(undefined as any)
      setInputValue('')
    },
    []
  )

  const {
    isOpen,
    openMenu,
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

  return (
    <div style={{ position: 'relative' }} {...getComboboxProps()}>
      <InputGroup size="sm">
        <Input
          type="text"
          placeholder="Rechercher..."
          w="200px"
          borderRadius="md"
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
        zIndex="1000"
        right="0"
        pointerEvents="none"
      >
        {filteredItems.slice(0, maxDisplayedItems).map((item, index) => (
          <ListItem textAlign="right" mb={1} key={index}>
            <ComboboxItem
              item={item}
              highlighted={index === highlightedIndex}
              {...getItemProps({ item, index })}
              shadow="md"
              bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
              _active={{ bg: colorMode === 'light' ? 'gray.300' : 'gray.600' }}
            />
          </ListItem>
        ))}
      </ComboboxList>
    </div>
  )
}
