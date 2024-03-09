import { RoleFragment } from '../gql'

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
  parentLink: false,
  defaultMinPerWeek: null,
  colorHue: null,
}

export const roles: RoleFragment[] = [
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
    parentLink: true,
    colorHue: 0,
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
