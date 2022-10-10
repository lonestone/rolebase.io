import { OrgEntry } from '../model/org'

export const org: OrgEntry = {
  id: 'org-1',
  name: 'SuperOrga',
  archived: false,
  createdAt: new Date().toISOString(),
  defaultWorkedMinPerWeek: 35 * 60,
}
