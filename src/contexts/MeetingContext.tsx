import { MeetingState } from '@hooks/useMeetingState'
import { createContext } from 'react'

export const MeetingContext = createContext<MeetingState | undefined>(undefined)
