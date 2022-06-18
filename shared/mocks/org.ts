import { OrgEntry } from '@shared/model/org'
import { Timestamp } from 'firebase/firestore'

export const org: OrgEntry = {
  id: 'org-1',
  name: 'SuperOrga',
  archived: false,
  createdAt: Timestamp.now(),
  defaultWorkedMinPerWeek: 35,
}
