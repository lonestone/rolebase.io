import { OrgFragment } from '@gql'

export const org: OrgFragment = {
  id: 'org-1',
  name: 'SuperOrga',
  archived: false,
  createdAt: new Date().toISOString(),
  defaultWorkedMinPerWeek: 35 * 60,
  shareOrg: false,
  shareMembers: false,
  protectGovernance: false,
}
