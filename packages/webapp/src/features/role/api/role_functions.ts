import { RoleAiFragment } from '@gql'
import { fn } from '../../common/api/functions'

// Generate properties for a role with AI
export const generateRole = fn<{ name: string; lang: string }, RoleAiFragment>(
  'generateRole'
)
