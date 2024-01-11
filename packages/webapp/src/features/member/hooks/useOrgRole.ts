import { Member_Role_Enum } from '@gql'
import useCurrentMember from './useCurrentMember'

export function useOrgRole(): Member_Role_Enum | undefined {
  const currentMember = useCurrentMember()
  return currentMember?.role || undefined
}
