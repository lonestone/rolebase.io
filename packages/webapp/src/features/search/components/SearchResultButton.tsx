import { Button, ButtonProps } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { SearchItem } from '../searchTypes'
import SearchResultContent from './SearchResultContent'
import { getSearchResultTitle } from './searchResultUtils'

interface Props extends ButtonProps {
  item?: SearchItem
  prevItem?: SearchItem
  standalone?: boolean
  highlighted?: boolean
}

export default React.forwardRef<HTMLButtonElement, Props>(
  function SearchResultButton(
    { item, prevItem, standalone, highlighted, ...buttonProps },
    ref
  ) {
    const { title, depth } = useMemo(
      () => getSearchResultTitle(item, prevItem, standalone),
      [item, prevItem, standalone]
    )

    return (
      <Button
        isActive={highlighted}
        ref={ref}
        pointerEvents="auto"
        justifyContent="start"
        variant="solid"
        py={2}
        pl={`calc(var(--chakra-sizes-3) + ${depth * 20}px)`}
        {...buttonProps}
      >
        <SearchResultContent
          item={item}
          size={buttonProps?.size as string}
          title={title}
        />
      </Button>
    )
  }
)
