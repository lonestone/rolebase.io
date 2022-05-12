import { ThreadEntry } from '@shared/model/thread'
import { createContext } from 'react'

export const ThreadContext = createContext<ThreadEntry | undefined>(undefined)
