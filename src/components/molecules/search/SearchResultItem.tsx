import { Box, Button, ButtonProps } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import SearchResultIcon from './SearchResultIcon'
import { SearchItem } from './searchTypes'

export const searchItemTitleSeparator = ' › '

interface Props extends ButtonProps {
  item?: SearchItem
  prevItem?: SearchItem
  standalone?: boolean
  highlighted?: boolean
}

export default React.forwardRef<HTMLButtonElement, Props>(
  function SearchResultItem(
    { item, prevItem, standalone, highlighted, ...buttonProps },
    ref
  ) {
    const { title, depth } = useMemo(() => {
      let depth = 0
      let title = item?.title || ''

      if (standalone) {
        const itemParts = title.split(searchItemTitleSeparator)
        title = itemParts[itemParts.length - 1]

        // If the previous item is a parent of the current item, we want to
        // remove the parent from the title
        // and increase the depth of the item to display a tabulation.
        // This requires the items to be sorted by title.
      } else if (item && prevItem) {
        const itemParts = item.title.split(searchItemTitleSeparator)
        const prevItemParts = prevItem.title.split(searchItemTitleSeparator)
        for (
          let i = 0;
          i < prevItemParts.length &&
          i < itemParts.length - 1 &&
          prevItemParts[i] === itemParts[i];
          i++
        ) {
          depth++
          title = title.substring(
            itemParts[i].length + searchItemTitleSeparator.length
          )
        }
      }

      return { title, depth }
    }, [item, prevItem])

    return (
      <Button
        isActive={highlighted}
        ref={ref}
        pointerEvents="auto"
        justifyContent="start"
        variant="solid"
        pl={`calc(var(--chakra-sizes-3) + ${depth * 20}px)`}
        {...buttonProps}
      >
        {item && (
          <>
            <SearchResultIcon item={item} size={buttonProps?.size} />
            <Box ml={2}>{title}</Box>
          </>
        )}
      </Button>
    )
  }
)
