import {
  Box,
  ButtonGroup,
  IconButton,
  Input,
  InputProps,
} from '@chakra-ui/react'
import { useCombobox, UseComboboxStateChange } from 'downshift'
import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
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
}

export default function SearchInput({
  value,
  items,
  onChange,
  onClear,
  ...inputMoreProps
}: SearchInputProps) {
  const { t } = useTranslation()
  const { filteredItems, onInputValueChange } = useSearch(items, false)

  const onSelectedItemChange = useCallback(
    (changes: UseComboboxStateChange<SearchItem>) => {
      const item = changes.selectedItem
      if (!item) return
      closeMenu()
      onChange(item.id)
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
  const [buttonWidth, setButtonWidth] = useState<number | undefined>(undefined)

  useLayoutEffect(() => {
    setButtonWidth(buttonGroupRef.current?.offsetWidth)
  }, [valueItem])

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
    <Box position="relative" {...getComboboxProps()}>
      {!inputVisible && (
        <ButtonGroup ref={buttonGroupRef} {...inputMoreProps} isAttached>
          <SearchResultItem
            ref={buttonRef}
            item={valueItem}
            highlighted={false}
            pr={onClear ? 1 : undefined}
            onMouseDown={handleClick}
            onClick={handleClick}
          />
          {onClear && (
            <IconButton
              aria-label=""
              icon={<FiX />}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onClear()
              }}
            />
          )}
        </ButtonGroup>
      )}

      <Input
        type="text"
        onFocus={openMenu}
        display={inputVisible ? '' : 'none'}
        w={buttonWidth || 'auto'}
        {...inputMoreProps}
        {...inputProps}
        placeholder={
          inputMoreProps?.placeholder ||
          t('molecules.search.SearchInput.defaultPlaceholder')
        }
      />

      <SearchResultsList
        items={filteredItems}
        isOpen={isOpen}
        highlightedIndex={highlightedIndex}
        getMenuProps={getMenuProps}
        getItemProps={getItemProps}
        inputRef={inputRef}
      />
    </Box>
  )
}
