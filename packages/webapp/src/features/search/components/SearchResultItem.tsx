import CircleByIdButton from '@/circle/components/CircleByIdButton'
import useDateLocale from '@/common/hooks/useDateLocale'
import { Box, BoxProps, Spacer, Text } from '@chakra-ui/react'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import { format } from 'date-fns'
import React, { useMemo } from 'react'
import { SearchItem } from '../searchTypes'
import SearchResultIcon from './SearchResultIcon'

export const searchItemTitleSeparator = ' › '

interface Props extends BoxProps {
  item?: SearchItem
  prevItem?: SearchItem
  standalone?: boolean
  highlighted?: boolean
  size?: string
}

export default React.forwardRef<HTMLDivElement, Props>(
  function SearchResultItem(
    { item, prevItem, standalone, highlighted, size, ...boxProps },
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
      <Box
        role="option"
        tabIndex={0}
        aria-label={item?.title}
        aria-selected={highlighted || undefined}
        ref={ref}
        pointerEvents="auto"
        display="flex"
        alignItems="center"
        justifyContent="start"
        cursor="pointer"
        py={2}
        pl={`calc(var(--chakra-sizes-3) + ${depth * 20}px)`}
        _hover={{ bg: 'gray.100', _dark: { bg: 'whiteAlpha.100' } }}
        {...boxProps}
        bg={highlighted ? (boxProps?._active as any)?.bg : boxProps?.bg}
      >
        {item && (
          <>
            <SearchResultIcon item={item} size={size} />
            <Box ml={2} textAlign="left">
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
                size={size === 'sm' ? 'xs' : 'sm'}
              />
            )}
          </>
        )}
      </Box>
    )
  }
)
