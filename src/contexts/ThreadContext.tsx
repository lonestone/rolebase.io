import { ThreadFragment } from '@gql'
import { createContext } from 'react'

export const ThreadContext = createContext<ThreadFragment | undefined>(
  undefined
)
