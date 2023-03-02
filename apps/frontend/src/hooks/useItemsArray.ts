import { Reducer, useCallback, useReducer } from 'react'

type Action<Item> =
  | { type: 'Set'; items: Item[] }
  | { type: 'Add'; item: Item }
  | { type: 'Update'; index: number; item: Item }
  | { type: 'Remove'; index: number }
  | { type: 'RemoveItem'; item: Item }

function reducer<Item>(state: Item[], action: Action<Item>): Item[] {
  switch (action.type) {
    case 'Set':
      return action.items
    case 'Add':
      return [...state, action.item]
    case 'Update': {
      const newState = [...state]
      newState.splice(action.index, 1, action.item)
      return newState
    }
    case 'Remove': {
      const newState = [...state]
      newState.splice(action.index, 1)
      return newState
    }
    case 'RemoveItem':
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

  const update = useCallback(
    (index: number, item: Item) => dispatch({ type: 'Update', index, item }),
    []
  )

  const remove = useCallback(
    (index: number) => dispatch({ type: 'Remove', index }),
    []
  )

  const removeItem = useCallback(
    (item: Item) => dispatch({ type: 'RemoveItem', item }),
    []
  )

  return { items, set, add, update, remove, removeItem }
}
