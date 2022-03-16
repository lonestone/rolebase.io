import { CircleEntry } from '@shared/circle'
import { MemberEntry } from '@shared/member'
import { OrgEntry } from '@shared/org'
import { RoleEntry } from '@shared/role'

export const org: OrgEntry = {
  id: 'org-1',
  name: 'SuperOrga',
  archived: false,
  defaultWorkedMinPerWeek: 35,
}

export const members: MemberEntry[] = [
  {
    id: 'member-alice',
    orgId: 'org-1',
    archived: false,
    name: 'Alice',
  },
  {
    id: 'member-bob',
    orgId: 'org-1',
    archived: false,
    name: 'Bob',
  },
  {
    id: 'member-jean-kevin',
    orgId: 'org-1',
    archived: false,
    name: 'Jean-Kévin',
  },
]

export const roles: RoleEntry[] = [
  {
    id: 'role-super',
    orgId: 'org-1',
    archived: false,
    base: false,
    name: 'SuperOrga',
    purpose: '',
    domain: '',
    accountabilities: '',
    notes: '',
    singleMember: false,
    link: false,
    defaultMinPerWeek: null,
  },
  {
    id: 'role-agence',
    orgId: 'org-1',
    archived: false,
    base: false,
    name: 'Agence',
    purpose: '',
    domain: '',
    accountabilities: '',
    notes: '',
    singleMember: false,
    link: false,
    defaultMinPerWeek: null,
  },
  {
    id: 'role-studio',
    orgId: 'org-1',
    archived: false,
    base: false,
    name: 'Studio',
    purpose: '',
    domain: '',
    accountabilities: '',
    notes: '',
    singleMember: false,
    link: false,
    defaultMinPerWeek: null,
  },
  {
    id: 'role-am',
    orgId: 'org-1',
    archived: false,
    base: false,
    name: 'Account Managers',
    purpose: '',
    domain: '',
    accountabilities: '',
    notes: '',
    singleMember: false,
    link: false,
    defaultMinPerWeek: null,
  },
  {
    id: 'role-dev',
    orgId: 'org-1',
    archived: false,
    base: false,
    name: 'Développeurs',
    purpose: '',
    domain: '',
    accountabilities: '',
    notes: '',
    singleMember: false,
    link: false,
    defaultMinPerWeek: null,
  },
  {
    id: 'role-leader',
    orgId: 'org-1',
    archived: false,
    base: true,
    name: 'Leader',
    purpose: '',
    domain: '',
    accountabilities: '',
    notes: '',
    singleMember: true,
    link: true,
    defaultMinPerWeek: null,
  },
  {
    id: 'role-facilitator',
    orgId: 'org-1',
    archived: false,
    base: true,
    name: 'Facilitateur',
    purpose: '',
    domain: '',
    accountabilities: '',
    notes: '',
    singleMember: true,
    link: false,
    defaultMinPerWeek: null,
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
    roleId: 'role-agence',
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
