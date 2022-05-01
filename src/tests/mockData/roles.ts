import { RoleEntry } from '@shared/role'

const roleBase = {
  archived: false,
  base: false,
  purpose: '',
  domain: '',
  accountabilities: '',
  checklist: '',
  indicators: '',
  notes: '',
  singleMember: false,
  link: false,
  defaultMinPerWeek: null,
  colorHue: null,
}

export const roles: RoleEntry[] = [
  {
    id: 'role-super',
    orgId: 'org-1',
    name: 'SuperOrga',
    ...roleBase,
  },
  {
    id: 'role-agence',
    orgId: 'org-1',
    name: 'Agence',
    ...roleBase,
  },
  {
    id: 'role-studio',
    orgId: 'org-1',
    name: 'Studio',
    ...roleBase,
  },
  {
    id: 'role-am',
    orgId: 'org-1',
    name: 'Account Managers',
    ...roleBase,
  },
  {
    id: 'role-dev',
    orgId: 'org-1',
    name: 'Développeurs',
    ...roleBase,
  },
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
