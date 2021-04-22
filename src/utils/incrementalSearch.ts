interface SearchItem<Item> {
  item: Item
  score: number
}

export default function incrementalSearch<Item>(
  items: Item[],
  getItemValue: (item: Item) => string,
  searchValue: string
): Item[] {
  if (searchValue === '') return []
  return items
    .map((item) => {
      const value = getItemValue(item)

      // Weight with value length
      let score = searchValue.length / value.length
      let lastPosition = -1

      // Search for each char to compute a score
      for (let i = 0; i < searchValue.length; i++) {
        const index = value.indexOf(searchValue[i], lastPosition + 1)
        if (index === -1) {
          score = 0
          break
        }
        score++
        lastPosition = index
      }

      return { item, score }
    })
    .sort((a, b) => b.score - a.score)
    .filter((searchItem) => searchItem.score > 0)
    .map((searchItem) => searchItem.item)
}
