import { MeetingStepConfig, VideoConf } from './meeting'
import { EntityWithParticipants, WithId } from './types'

export interface MeetingRecurring extends EntityWithParticipants {
  circle: {
    role: {
      name: string
      colorHue?: number | null
    }
  }
  orgId: string
  templateId: string
  template: {
    title: string
    stepsConfig: MeetingStepConfig[]
  }
  rrule: string
  duration: number
  videoConf?: VideoConf | null
  createdAt: string
}

export type MeetingRecurringEntry = WithId<MeetingRecurring>
