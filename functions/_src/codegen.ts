import { CodegenConfig } from '@graphql-codegen/cli'
import { getAddPlugin, getConfig } from './shared/codegen'

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
    '_src/shared/schema-overrides.gql',
  ],
  documents: [
    'routes/*.ts',
    'routes/**/*.ts',
    '_src/shared/fragments/*.gql',
    '_src/**/*.ts',
    '!_src/graphql/**/*',
  ],
  generates: {
    '_src/graphql/': {
      preset: 'gql-tag-operations-preset',
      plugins: [getAddPlugin()],
    },
  },
  config: getConfig(),
}

export default config
