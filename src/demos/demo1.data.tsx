import { CircleEntry } from '@shared/model/circle'
import { MemberEntry } from '@shared/model/member'
import { RoleEntry } from '@shared/model/role'

const memberBase = {
  description: '',
  archived: false,
}

export const members: MemberEntry[] = [
  {
    id: 'member-alice',
    orgId: 'org-1',
    name: 'Alice',
    ...memberBase,
  },
  {
    id: 'member-bob',
    orgId: 'org-1',
    name: 'Bob',
    ...memberBase,
  },
  {
    id: 'member-jean-kevin',
    orgId: 'org-1',
    name: 'Jean-Kévin',
    ...memberBase,
  },
  {
    id: 'member-pam',
    orgId: 'org-1',
    name: 'Pam',
    ...memberBase,
  },
]

export const circles: CircleEntry[] = [
  {
    id: 'circle-super',
    orgId: 'org-1',
    roleId: 'role-super',
    parentId: null,
    members: [],
    archived: false,
  },
  {
    id: 'circle-agence',
    orgId: 'org-1',
    roleId: 'role-agence',
    parentId: 'circle-super',
    members: [],
    archived: false,
  },
  {
    id: 'circle-studio',
    orgId: 'org-1',
    roleId: 'role-studio',
    parentId: 'circle-super',
    members: [],
    archived: false,
  },
  {
    id: 'circle-agence-am',
    orgId: 'org-1',
    roleId: 'role-am',
    parentId: 'circle-agence',
    members: [],
    archived: false,
  },
  {
    id: 'circle-agence-dev',
    orgId: 'org-1',
    roleId: 'role-dev',
    parentId: 'circle-agence',
    members: [
      {
        id: '1',
        memberId: 'member-jean-kevin',
      },
      {
        id: '2',
        memberId: 'member-pam',
      },
    ],
    archived: false,
  },
  {
    id: 'circle-agence-leader',
    orgId: 'org-1',
    roleId: 'role-leader',
    parentId: 'circle-agence',
    members: [
      {
        id: '1',
        memberId: 'member-alice',
      },
    ],
    archived: false,
  },
  {
    id: 'circle-studio-leader',
    orgId: 'org-1',
    roleId: 'role-leader',
    parentId: 'circle-studio',
    members: [
      {
        id: '1',
        memberId: 'member-jean-kevin',
      },
    ],
    archived: false,
  },
  {
    id: 'circle-agence-am-leader',
    orgId: 'org-1',
    roleId: 'role-leader',
    parentId: 'circle-agence-am',
    members: [
      {
        id: '1',
        memberId: 'member-bob',
      },
    ],
    archived: false,
  },
  {
    id: 'circle-agence-dev-leader',
    orgId: 'org-1',
    roleId: 'role-leader',
    parentId: 'circle-agence-dev',
    members: [
      {
        id: '1',
        memberId: 'member-alice',
      },
    ],
    archived: false,
  },
  {
    id: 'circle-agence-dev-facilitator',
    orgId: 'org-1',
    roleId: 'role-facilitator',
    parentId: 'circle-agence-dev',
    members: [
      {
        id: '1',
        memberId: 'member-bob',
      },
    ],
    archived: false,
  },
]

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
  autoCreate: false,
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
