import { createContext } from 'react'
import { ThreadState } from '../hooks/useThreadState'

export const ThreadContext = createContext<ThreadState | undefined>(undefined)
