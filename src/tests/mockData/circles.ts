import { CircleEntry } from '@shared/circle'

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
