import {
  Box,
  Button,
  ButtonProps,
  Input,
  InputGroup,
  InputLeftElement,
  useButtonGroup,
} from '@chakra-ui/react'
import { SearchTypes } from '@rolebase/shared/model/search'
import { UseComboboxStateChange, useCombobox } from 'downshift'
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { useSearch } from '../hooks/useSearch'
import { SearchItem } from '../searchTypes'
import SearchResultsList from './SearchResultsList'

export interface SearchButtonProps extends Omit<ButtonProps, 'onSelect'> {
  children: string
  items: SearchItem[]
  onSelect(id: string): void
  onCreate?(name: string): Promise<string | void>
}

export default function SearchButton({
  children,
  items,
  onSelect,
  onCreate,
  ...buttonProps
}: SearchButtonProps) {
  const { filteredItems, onInputValueChange } = useSearch(
    items,
    false,
    !!onCreate
  )

  const onSelectedItemChange = useCallback(
    async (changes: UseComboboxStateChange<SearchItem>) => {
      const item = changes.selectedItem
      if (!item) return
      closeMenu()

      if (onCreate && item.type === SearchTypes.CreateAction) {
        // Create entity then select it
        const id = await onCreate(item.text)
        if (id) onSelect(id)
      } else {
        // Select existing entity
        onSelect(item.id)
      }

      selectItem(undefined as any)
      setInputValue('')
      buttonRef.current?.focus()
    },
    [onSelect, onCreate]
  )

  const {
    isOpen,
    openMenu,
    closeMenu,
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

  // Button
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [buttonWidth, setButtonWidth] = useState<number | undefined>(undefined)
  const buttonGroup = useButtonGroup()
  const size = buttonProps.size || buttonGroup?.size

  useLayoutEffect(() => {
    setButtonWidth(buttonRef.current?.offsetWidth)
  }, [children])

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
    <Box {...getComboboxProps()}>
      <InputGroup size={size}>
        {!isOpen && (
          <Button ref={buttonRef} {...buttonProps} onClick={handleClick}>
            {children}
          </Button>
        )}
        {isOpen && buttonProps.leftIcon && (
          <InputLeftElement pointerEvents="none" pl={3}>
            {buttonProps.leftIcon}
          </InputLeftElement>
        )}
        <Input
          type="text"
          placeholder={children}
          display={isOpen ? '' : 'none'}
          w={buttonWidth ? `${buttonWidth}px` : 'auto'}
          pl={buttonProps.leftIcon ? 10 : undefined}
          borderRadius={buttonProps.borderRadius}
          {...inputProps}
        />
      </InputGroup>

      <SearchResultsList
        items={filteredItems}
        isOpen={isOpen}
        highlightedIndex={highlightedIndex}
        getMenuProps={getMenuProps}
        getItemProps={getItemProps}
        inputRef={inputRef}
        showCanCreate={!!onCreate}
      />
    </Box>
  )
}
