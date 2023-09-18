import { ThreadState } from '@hooks/useThreadState'
import { createContext } from 'react'

export const ThreadContext = createContext<ThreadState | undefined>(undefined)
