import { CodegenConfig } from '@graphql-codegen/cli'

export function getAddPlugin() {
  return {
    add: {
      content: `
import { MemberPreferences } from '@shared/model/member'
import { MeetingAttendee, MeetingStepConfig, VideoConf } from '@shared/model/meeting'
import { MeetingStepData } from '@shared/model/meeting_step'
import { LogDisplay, EntitiesChanges } from '@shared/model/log'
`,
    },
  }
}

export function getConfig() {
  return {
    // Required for merge-and-override of schemas
    ignoreFieldConflicts: true,
    // Set scalars to avoid "any" type
    scalars: {
      uuid: 'string',
      smallint: 'number',
      bigint: 'number',
      timestamptz: 'string',
      citext: 'string',
      member_preferences: 'MemberPreferences',
      attendee: 'MeetingAttendee',
      meeting_step_config: 'MeetingStepConfig',
      meeting_step_data: 'MeetingStepData',
      videoconf: 'VideoConf',
      log_display: 'LogDisplay',
      log_changes: 'EntitiesChanges',
    },
  }
}

const config: CodegenConfig = {
  overwrite: true,
  watch: true,
  schema: [
    {
      'http://localhost:1337/v1/graphql': {
        headers: {
          'x-hasura-admin-secret': 'nhost-admin-secret',
        },
      },
    },
    '_shared/schema-overrides.gql',
  ],
  documents: [
    'routes/*.ts',
    '_utils/*.ts',
    '_utils/**/*.ts',
    '_shared/fragments/*.gql',
    '_search/*.ts',
    '!_gql/**/*',
  ],
  generates: {
    '_gql/': {
      preset: 'gql-tag-operations-preset',
      plugins: [getAddPlugin()],
    },
  },
  config: getConfig(),
}

export default config
