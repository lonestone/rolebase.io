import { RoleEntry } from '@shared/model/role'

const roleBase = {
  archived: false,
  base: true,
  // purpose: '',
  // domain: '',
  // accountabilities: '',
  // checklist: '',
  // indicators: '',
  // notes: '',
  singleMember: true,
  link: false,
  defaultMinPerWeek: null,
  colorHue: null,
}

export const roles: RoleEntry[] = [
  {
    id: 'role-leader',
    orgId: 'org-1',
    name: 'Leader',
    ...roleBase,
    base: true,
    singleMember: true,
    link: true,
  },
  {
    id: 'role-facilitator',
    orgId: 'org-1',
    name: 'Facilitateur',
    ...roleBase,
    base: true,
    singleMember: true,
  },
]
