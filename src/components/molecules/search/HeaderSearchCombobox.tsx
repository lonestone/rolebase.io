import {
  IconButton,
  Input,
  InputGroup,
  ListItem,
  useColorMode,
} from '@chakra-ui/react'
import ComboboxList from '@components/atoms/ComboboxList'
import { useCombobox, UseComboboxStateChange } from 'downshift'
import React, { useCallback, useContext, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
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
      <InputGroup size="sm">
        {!isOpen && (
          <IconButton
            aria-label="Rechercher"
            icon={<FaSearch />}
            size="sm"
            onClick={handleClick}
          />
        )}
        <Input
          type="text"
          placeholder="Rechercher..."
          display={isOpen ? '' : 'none'}
          w="200px"
          borderRadius="md"
          background={colorMode === 'light' ? 'white' : 'gray.800'}
          {...inputProps}
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
              bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
              _active={{ bg: colorMode === 'light' ? 'gray.300' : 'gray.550' }}
            />
          </ListItem>
        ))}
      </ComboboxList>
    </div>
  )
}
