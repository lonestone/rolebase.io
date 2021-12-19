import { MeetingStepConfig } from './meeting'
import { WithId } from './types'

export interface MeetingTemplate {
  orgId: string
  name: string
  stepsConfig: MeetingStepConfig[]
}

export type MeetingTempalteEntry = WithId<MeetingTemplate>
