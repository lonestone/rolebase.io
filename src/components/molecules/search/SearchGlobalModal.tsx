import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalContent,
  ModalOverlay,
  useColorMode,
  UseModalProps,
} from '@chakra-ui/react'
import useCurrentOrg from '@hooks/useCurrentOrg'
import { useIdleCallback } from '@hooks/useIdleCallback'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import { SearchTypes } from '@shared/model/search'
import { useCombobox, UseComboboxStateChange } from 'downshift'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiX } from 'react-icons/fi'
import { searchIcons } from './SearchResultIcon'
import SearchResultItem from './SearchResultItem'
import { SearchItem } from './searchTypes'
import { useAlgoliaSearch } from './useAlgoliaSearch'

const maxDisplayedItems = 50

const searchTypes = [
  SearchTypes.Member,
  SearchTypes.Circle,
  SearchTypes.Thread,
  SearchTypes.Meeting,
  SearchTypes.Task,
  SearchTypes.Decision,
] as const

export default function SearchGlobalModal(modalProps: UseModalProps) {
  const { t } = useTranslation()
  const { colorMode } = useColorMode()
  const org = useCurrentOrg()
  const navigateOrg = useNavigateOrg()

  // Search
  const [type, setType] = useState<typeof searchTypes[number] | undefined>()
  const { filteredItems, search } = useAlgoliaSearch()

  // Search when input value changes
  const onInputValueChange = useIdleCallback(
    ({ inputValue }: UseComboboxStateChange<SearchItem>) =>
      search(inputValue || '', type),
    [search, type]
  )

  const onSelectedItemChange = useCallback(
    (changes: UseComboboxStateChange<SearchItem>) => {
      const item = changes.selectedItem
      if (!item) return
      modalProps.onClose()
      if (item.type === SearchTypes.Member) {
        navigateOrg(`?memberId=${item.id}`)
      } else if (item.type === SearchTypes.Circle) {
        navigateOrg(`?circleId=${item.id}`)
      } else if (item.type === SearchTypes.Thread) {
        navigateOrg(`threads/${item.id}`)
      } else if (item.type === SearchTypes.Meeting) {
        navigateOrg(`meetings/${item.id}`)
      } else if (item.type === SearchTypes.Task) {
        navigateOrg(`tasks/${item.id}`)
      } else if (item.type === SearchTypes.Decision) {
        navigateOrg(`decisions/${item.id}`)
      }
    },
    []
  )

  const {
    highlightedIndex,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    inputValue,
  } = useCombobox({
    items: filteredItems,
    itemToString: () => '',
    defaultHighlightedIndex: 0,
    onInputValueChange,
    onSelectedItemChange,
  })

  // Update search when type changes
  useEffect(() => {
    search(inputValue, type)
  }, [type])

  // Icon of selected type
  const TypeIcon = type && searchIcons[type]

  return (
    <Modal size="lg" {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <Box {...getComboboxProps()}>
          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.500" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder={t('SearchGlobalModal.placeholder', {
                org: org?.name,
              })}
              borderRadius="md"
              background={colorMode === 'light' ? 'white' : 'gray.800'}
              {...getInputProps()}
            />
          </InputGroup>
        </Box>

        <HStack py={2} px={5}>
          <Menu>
            <MenuButton
              as={Button}
              variant="outline"
              size="sm"
              leftIcon={TypeIcon ? <TypeIcon /> : undefined}
              rightIcon={<ChevronDownIcon />}
            >
              {t(`common.searchTypes.${type || 'All'}`)}
            </MenuButton>
            <MenuList>
              <MenuItem
                key="All"
                icon={<FiX />}
                onClick={() => setType(undefined)}
              >
                {t(`common.searchTypes.All`)}
              </MenuItem>
              {searchTypes.map((buttonType) => {
                const Icon = searchIcons[buttonType]
                return (
                  <MenuItem
                    key={buttonType}
                    icon={<Icon />}
                    onClick={() => setType(buttonType)}
                  >
                    {t(`common.searchTypes.${buttonType}`)}
                  </MenuItem>
                )
              })}
            </MenuList>
          </Menu>
        </HStack>

        <List
          display={filteredItems.length === 0 ? 'none' : ''}
          overflow="hidden"
          mt="1px"
          pt={3}
          pb={2}
          bg={colorMode === 'light' ? 'white' : 'gray.800'}
          borderBottomRadius="md"
          {...getMenuProps()}
        >
          {filteredItems.slice(0, maxDisplayedItems).map((item, index) => (
            <ListItem key={index} mb={1}>
              <SearchResultItem
                item={item}
                highlighted={index === highlightedIndex}
                size="sm"
                w="100%"
                py={2}
                px={5}
                bg="transparent"
                borderRadius="none"
                _active={{
                  bg: colorMode === 'light' ? 'gray.100' : 'whiteAlpha.100',
                }}
                {...getItemProps({ item, index })}
              />
            </ListItem>
          ))}
        </List>
      </ModalContent>
    </Modal>
  )
}
