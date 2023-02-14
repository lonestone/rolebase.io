import { Meeting_Step_Type_Enum } from '@gql'

export interface MeetingStepConfig {
  id: string
  type: Meeting_Step_Type_Enum
  title: string
}

export interface MeetingAttendee {
  memberId: string
  // Represented circles
  circlesIds: string[]
  present: boolean | null
}

export type VideoConf =
  | {
      type: VideoConfTypes.Url
      url: string
    }
  | {
      type: VideoConfTypes.Jitsi
    }

export enum VideoConfTypes {
  Url = 'Url',
  Jitsi = 'Jitsi',
}
