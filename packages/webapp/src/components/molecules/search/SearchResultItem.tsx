import CircleByIdButton from '@atoms/CircleByIdButton'
import { Box, Button, ButtonProps, Spacer, Text } from '@chakra-ui/react'
import useDateLocale from '@hooks/useDateLocale'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import { format } from 'date-fns'
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
    const dateLocale = useDateLocale()

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
        h="auto"
        py={2}
        pl={`calc(var(--chakra-sizes-3) + ${depth * 20}px)`}
        {...buttonProps}
      >
        {item && (
          <>
            <SearchResultIcon item={item} size={buttonProps?.size} />
            <Box ml={2} whiteSpace="break-spaces" textAlign="left">
              {title}
            </Box>

            <Spacer />

            {item.date && (
              <Text
                fontSize="xs"
                color="gray.500"
                _dark={{ color: 'gray.300' }}
              >
                {capitalizeFirstLetter(
                  format(new Date(item.date), 'PPPP', {
                    locale: dateLocale,
                  })
                )}
              </Text>
            )}

            {item.circleId && (
              <CircleByIdButton
                id={item.circleId}
                ml={2}
                size={buttonProps?.size === 'sm' ? 'xs' : 'sm'}
              />
            )}
          </>
        )}
      </Button>
    )
  }
)
