import { OrgFragment } from '../gql'

export const org: OrgFragment = {
  id: 'org-1',
  name: 'SuperOrga',
  archived: false,
  createdAt: new Date().toISOString(),
  shareOrg: false,
  shareMembers: false,
  protectGovernance: false,
}
