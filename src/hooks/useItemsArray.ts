import { Reducer, useCallback, useReducer } from 'react'

type Action<Item> =
  | { type: 'Set'; items: Item[] }
  | { type: 'Add'; item: Item }
  | { type: 'Remove'; item: Item }

function reducer<Item>(state: Item[], action: Action<Item>): Item[] {
  switch (action.type) {
    case 'Set':
      return action.items
    case 'Add':
      return [...state, action.item]
    case 'Remove':
      return state.filter((item) => item !== action.item)
    default:
      return state
  }
}

export default function useItemsArray<Item>(defaultValue: Item[]) {
  const [items, dispatch] = useReducer<Reducer<Item[], Action<Item>>>(
    reducer,
    defaultValue
  )

  const set = useCallback(
    (items: Item[]) => dispatch({ type: 'Set', items }),
    []
  )
  const add = useCallback((item: Item) => dispatch({ type: 'Add', item }), [])
  const remove = useCallback(
    (item: Item) => dispatch({ type: 'Remove', item }),
    []
  )

  return { items, set, add, remove }
}
