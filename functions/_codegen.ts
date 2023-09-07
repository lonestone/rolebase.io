import { CodegenConfig } from '@graphql-codegen/cli'
import path from 'path'

export function getAddPlugin() {
  return {
    add: {
      content: `
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
    //ignoreFieldConflicts: true,
    onFieldTypeConflict: (left, right) => left,
    // Set scalars to avoid "any" type
    scalars: {
      uuid: 'string',
      smallint: 'number',
      bigint: 'number',
      timestamptz: 'string',
      citext: 'string',
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
      'https://local.hasura.nhost.run/v1/graphql': {
        headers: {
          'x-hasura-admin-secret': 'nhost-admin-secret',
        },
      },
    },
    path.join(__dirname, '_shared/schema-overrides.gql'),
  ],
  documents: [
    'routes/*.ts',
    'routes/**/*.ts',
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
