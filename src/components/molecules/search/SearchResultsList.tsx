import { List, ListItem, useColorMode } from '@chakra-ui/react'
import {
  GetPropsCommonOptions,
  UseComboboxGetItemPropsOptions,
  UseComboboxGetMenuPropsOptions,
} from 'downshift'
import React, { RefObject } from 'react'
import SearchResultItem from './SearchResultItem'
import { SearchItem } from './searchTypes'

interface Props {
  items: SearchItem[]
  isOpen: boolean
  highlightedIndex: number
  getMenuProps: (
    options?: UseComboboxGetMenuPropsOptions,
    otherOptions?: GetPropsCommonOptions
  ) => any
  getItemProps: (options: UseComboboxGetItemPropsOptions<SearchItem>) => any
  inputRef: RefObject<HTMLInputElement>
}

export default function SearchResultsList({
  items,
  isOpen,
  highlightedIndex,
  getMenuProps,
  getItemProps,
  inputRef,
}: Props) {
  const { colorMode } = useColorMode()

  return (
    <List
      {...getMenuProps()}
      display={isOpen && items.length > 0 ? '' : 'none'}
      position="absolute"
      overflow="hidden"
      zIndex="2"
      minW={`${inputRef.current?.offsetWidth || 0}px`}
      mt={1}
      shadow="md"
      bg={colorMode === 'light' ? 'white' : 'gray.700'}
      border="1px solid"
      borderColor="inherit"
      borderRadius="md"
      pointerEvents="none"
    >
      {items.map((item, index) => (
        <ListItem key={index}>
          <SearchResultItem
            {...getItemProps({ item, index })}
            item={item}
            highlighted={index === highlightedIndex}
            size="sm"
            w="100%"
            py={5}
            borderRadius="none"
            bg="transparent"
            _hover={{ bg: 'transparent' }}
            _active={{
              bg: colorMode === 'light' ? 'gray.100' : 'whiteAlpha.100',
            }}
          />
        </ListItem>
      ))}
    </List>
  )
}
