import { CodegenConfig } from '@graphql-codegen/cli'
import {
  getAddPlugin,
  getConfig,
} from '@rolebase/functions/_src/shared/codegen'

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
    '../../functions/_src/shared/schema-overrides.gql',
  ],
  documents: ['src/**/*.gql', '../../functions/_src/shared/fragments/*.gql'],
  generates: {
    'src/graphql.generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
        getAddPlugin(),
      ],
    },
  },
  config: {
    ...getConfig(),
    withRefetchFn: true,
  },
}

export default config
