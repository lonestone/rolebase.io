import {
  Box,
  ButtonGroup,
  IconButton,
  Input,
  InputProps,
  Tooltip,
  useButtonGroup,
} from '@chakra-ui/react'
import { useElementSize } from '@hooks/useElementSize'
import { SearchTypes } from '@shared/model/search'
import { UseComboboxStateChange, useCombobox } from 'downshift'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiX } from 'react-icons/fi'
import SearchResultItem from './SearchResultItem'
import SearchResultsList from './SearchResultsList'
import { SearchItem } from './searchTypes'
import { useSearch } from './useSearch'

export interface SearchInputProps
  extends Omit<InputProps, 'value' | 'onChange'> {
  value?: string // Item id
  items: SearchItem[]
  onChange(value: string): void
  onClear?(): void
  onCreate?(name: string): Promise<string | void>
}

export default function SearchInput({
  value,
  items,
  onChange,
  onClear,
  onCreate,
  ...inputMoreProps
}: SearchInputProps) {
  const { t } = useTranslation()
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
        // Create entity and set its id as value
        const id = await onCreate(item.text)
        if (id) onChange(id)
      } else {
        // Select existing entity
        onChange(item.id)
      }

      selectItem(undefined as any)
      buttonRef.current?.focus()
    },
    [onChange]
  )

  const {
    isOpen,
    openMenu,
    closeMenu,
    highlightedIndex,
    selectItem,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
  } = useCombobox({
    items: filteredItems,
    defaultSelectedItem: value
      ? items.find((item) => item.id === value)
      : undefined,
    defaultHighlightedIndex: 0,
    itemToString: () => '',
    onInputValueChange,
    onSelectedItemChange,
  })

  const valueItem = useMemo(
    () => (value ? items.find((item) => item.id === value) : undefined),
    [value, items]
  )

  // Button
  const buttonRef = useRef<HTMLButtonElement>(null)
  const buttonGroupRef = useRef<HTMLDivElement>(null)
  const buttonDimensions = useElementSize(buttonGroupRef)
  const [buttonWidth, setButtonWidth] = useState<number>(0)
  const buttonGroup = useButtonGroup()

  useEffect(() => {
    const width = buttonDimensions?.width
    if (width) setButtonWidth(width)
  }, [buttonDimensions?.width])

  // Input
  const inputRef = useRef<HTMLInputElement | null>(null)
  const inputProps = getInputProps({
    ref: inputRef,
    onFocus: openMenu,
  })

  // Click on selected item button to put it in editing mode
  const handleClick = () => {
    openMenu()
    // Wait for the input to appears, then focus it
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  const inputVisible = isOpen || !valueItem

  return (
    <Box display="flex" {...getComboboxProps()}>
      <ButtonGroup
        ref={buttonGroupRef}
        display={inputVisible ? 'none' : undefined}
        maxW="100%"
        {...buttonGroup}
        {...inputMoreProps}
        isAttached
      >
        <Tooltip
          label={
            (valueItem?.text.length || 0) > 10 ? valueItem?.title : undefined
          }
          placement="top"
          hasArrow
        >
          <SearchResultItem
            ref={buttonRef}
            item={valueItem}
            standalone
            highlighted={false}
            {...buttonGroup}
            pr={onClear ? 1 : undefined}
            borderRight={onClear ? 'none' : undefined}
            overflow="hidden"
            sx={{
              div: {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
            }}
            onMouseDown={handleClick}
            onClick={handleClick}
          />
        </Tooltip>
        {onClear && (
          <IconButton
            aria-label={t('common.clear')}
            icon={<FiX />}
            borderLeft="none"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onClear()
            }}
          />
        )}
      </ButtonGroup>

      <Input
        type="text"
        onFocus={openMenu}
        display={inputVisible ? '' : 'none'}
        w={buttonWidth ? `${buttonWidth}px` : 'auto'}
        {...buttonGroup}
        {...inputMoreProps}
        {...inputProps}
        placeholder={inputMoreProps?.placeholder}
      />

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
