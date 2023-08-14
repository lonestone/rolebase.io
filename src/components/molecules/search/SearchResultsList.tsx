import {
  LayoutProps,
  List,
  ListItem,
  Portal,
  PositionProps,
  useColorMode,
} from '@chakra-ui/react'
import useWindowSize from '@hooks/useWindowSize'
import {
  GetPropsCommonOptions,
  UseComboboxGetItemPropsOptions,
  UseComboboxGetMenuPropsOptions,
} from 'downshift'
import React, { RefObject } from 'react'
import { useTranslation } from 'react-i18next'
import SearchResultItem from './SearchResultItem'
import { SearchItem } from './searchTypes'

interface Props {
  items: SearchItem[]
  isOpen: boolean
  showCanCreate: boolean
  highlightedIndex: number
  getMenuProps: (
    options?: UseComboboxGetMenuPropsOptions,
    otherOptions?: GetPropsCommonOptions
  ) => any
  getItemProps: (options: UseComboboxGetItemPropsOptions<SearchItem>) => any
  inputRef: RefObject<HTMLInputElement>
}

const satisfyingWidth = 250
const satisfyingMinHeight = 250

export default function SearchResultsList({
  items,
  isOpen,
  showCanCreate,
  highlightedIndex,
  getMenuProps,
  getItemProps,
  inputRef,
}: Props) {
  const { t } = useTranslation()
  const { colorMode } = useColorMode()
  const windowSize = useWindowSize()

  const inputBounds = inputRef.current?.getBoundingClientRect()

  // Layout props
  const layoutProps: LayoutProps = {
    minW: `${inputBounds ? inputBounds.width : 0}px`,
    maxH: `${
      inputBounds
        ? Math.max(
            windowSize.height - inputBounds.bottom - 15,
            satisfyingMinHeight
          )
        : satisfyingMinHeight
    }px`,
  }

  // Position props
  const positionProps: PositionProps = {
    top: `${inputBounds?.bottom || 0}px`,
  }

  // Determine alignment -> position + width
  if (inputBounds) {
    const alignRightWidth = inputBounds.right
    const alignLeftWidth = windowSize.width - inputBounds.left
    if (alignLeftWidth >= satisfyingWidth) {
      positionProps.left = inputBounds.left
      layoutProps.maxW = `${alignLeftWidth}px`
    } else if (alignRightWidth >= satisfyingWidth) {
      positionProps.right = windowSize.width - inputBounds.right
      layoutProps.maxW = `${alignRightWidth}px`
    } else {
      positionProps.left = 0
      layoutProps.w = '100vw'
    }
  }

  return (
    <Portal>
      <List
        {...getMenuProps(
          {},
          {
            // Ignore error occuring when using a portal
            suppressRefError: true,
          }
        )}
        display={
          isOpen && items.length > 0 && inputRef.current?.offsetHeight
            ? ''
            : 'none'
        }
        position="fixed"
        overflow="auto"
        zIndex="2000"
        mt={1}
        shadow="md"
        bg={colorMode === 'light' ? 'white' : 'gray.700'}
        border="1px solid"
        borderColor="inherit"
        borderRadius="md"
        {...layoutProps}
        {...positionProps}
      >
        {showCanCreate && !items.some((item) => item.id === 'create') && (
          <ListItem px={2} py={1} fontSize="sm" fontStyle="italic">
            {t('SearchResultsList.canCreate')}
          </ListItem>
        )}

        {items.map((item, index) => (
          <ListItem key={index}>
            <SearchResultItem
              {...getItemProps({ item, index })}
              item={item}
              prevItem={items[index - 1]}
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
    </Portal>
  )
}
