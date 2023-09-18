import { SearchItem } from './searchTypes'

const multiSpacesRegex = /[  ]+/g

export default function incrementalSearch(
  items: SearchItem[],
  searchValue: string
): SearchItem[] {
  if (searchValue === '') return []
  searchValue = searchValue.replace(multiSpacesRegex, ' ').trim().toLowerCase()

  return items.filter((item) => {
    let lastPosition = -1

    // Search for each char to compute a score
    for (let i = 0; i < searchValue.length; i++) {
      const index = item.text.indexOf(searchValue[i], lastPosition + 1)
      if (index === -1) {
        return false
      }
      lastPosition = index
    }
    return true
  })
}
