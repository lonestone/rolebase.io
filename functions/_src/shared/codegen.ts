export function getAddPlugin() {
  return {
    add: {
      content: `
import { MeetingStepConfig, VideoConf } from '@shared/model/meeting'
import { MeetingStepData } from '@shared/model/meeting_step'
import { ParticipantsScope } from '@shared/model/participants'
import { LogDisplay, EntitiesChanges } from '@shared/model/log'
import { UserMetadata } from '@shared/model/user'
`,
    },
  }
}

export function getConfig() {
  return {
    // Required for merge-and-override of schemas
    //ignoreFieldConflicts: true,
    onFieldTypeConflict: (left: any) => left,
    // Set scalars to avoid "any" type
    scalars: {
      uuid: 'string',
      smallint: 'number',
      bigint: 'number',
      timestamptz: 'string',
      citext: 'string',
      user_metadata: 'UserMetadata',
      participants_scope: 'ParticipantsScope',
      meeting_step_config: 'MeetingStepConfig',
      meeting_step_data: 'MeetingStepData',
      videoconf: 'VideoConf',
      log_display: 'LogDisplay',
      log_changes: 'EntitiesChanges',
    },
  }
}
