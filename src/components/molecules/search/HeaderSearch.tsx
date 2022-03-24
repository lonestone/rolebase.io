import {
  IconButton,
  Input,
  InputGroup,
  List,
  ListItem,
  useColorMode,
} from '@chakra-ui/react'
import { useCombobox, UseComboboxStateChange } from 'downshift'
import React, { useCallback, useContext, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
import { CircleMemberContext } from 'src/contexts/CircleMemberContext'
import { useCircleMemberSearchItems } from './entities/circleMembers/useCircleMemberSearchItems'
import { useCircleSearchItems } from './entities/circles/useCircleSearchItems'
import { useMemberSearchItems } from './entities/members/useMemberSearchItems'
import SearchResultItem from './SearchResultItem'
import { SearchItem, SearchItemTypes } from './searchTypes'
import { useCombineArrays } from './useCombineArrays'
import { useSearch } from './useSearch'

const maxDisplayedItems = 25

export default function HeaderSearch() {
  const { colorMode } = useColorMode()
  const circleMemberContext = useContext(CircleMemberContext)

  // Get items
  const memberItems = useMemberSearchItems()
  const circleItems = useCircleSearchItems()
  const circleMemberItems = useCircleMemberSearchItems()
  const items = useCombineArrays(memberItems, circleItems, circleMemberItems)

  // Search
  const { filteredItems, onInputValueChange } = useSearch(items, true)

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
            variant="ghost"
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

      <List
        display={isOpen ? '' : 'none'}
        py={2}
        {...getMenuProps()}
        position="absolute"
        zIndex="1000"
        right="0"
        pointerEvents="none"
      >
        {filteredItems.slice(0, maxDisplayedItems).map((item, index) => (
          <ListItem textAlign="right" mb={1} key={index}>
            <SearchResultItem
              item={item}
              highlighted={index === highlightedIndex}
              {...getItemProps({ item, index })}
              shadow="md"
              bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
              _active={{ bg: colorMode === 'light' ? 'gray.300' : 'gray.550' }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  )
}
