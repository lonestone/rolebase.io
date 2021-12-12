import { ThreadEntry } from '@shared/thread'
import { createContext } from 'react'

export const ThreadContext = createContext<ThreadEntry | undefined>(undefined)
