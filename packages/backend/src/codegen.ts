import { CodegenConfig } from '@graphql-codegen/cli'
import {
  fragmentsPath,
  getAddPlugin,
  getConfig,
  schemaOverridesPath,
} from '@rolebase/shared/codegenUtils'

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
    schemaOverridesPath,
  ],
  documents: [fragmentsPath, 'src/**/*.ts', '!src/graphql/**/*'],
  generates: {
    'src/graphql/': {
      preset: 'gql-tag-operations-preset',
      plugins: [getAddPlugin()],
    },
  },
  config: getConfig(),
}

export default config
