import { MeetingStepConfig } from './meeting'
import { WithId } from './types'

export interface MeetingTemplate {
  orgId: string
  title: string
  stepsConfig: MeetingStepConfig[]
}

export type MeetingTemplateEntry = WithId<MeetingTemplate>
