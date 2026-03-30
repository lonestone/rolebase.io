import { SearchItem } from '../searchTypes'

export const searchItemTitleSeparator = ' › '

export function getSearchResultTitle(
  item?: SearchItem,
  prevItem?: SearchItem,
  standalone?: boolean
) {
  let depth = 0
  let title = item?.title || ''

  if (standalone) {
    const itemParts = title.split(searchItemTitleSeparator)
    title = itemParts[itemParts.length - 1]
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
}
