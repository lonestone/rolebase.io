import { createContext } from 'react'
import { MeetingState } from '../hooks/useMeetingState'

export const MeetingContext = createContext<MeetingState | undefined>(undefined)
