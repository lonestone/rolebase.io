import { CircleEntry } from '@shared/model/circle'
import { MemberEntry } from '@shared/model/member'
import { RoleEntry } from '@shared/model/role'

import darryl from './pictures/darryl.jpg'
import dwight from './pictures/dwight.jpg'
import jim from './pictures/jim.jpg'
import karen from './pictures/karen.jpg'
import kevin from './pictures/kevin.jpg'
import meredith from './pictures/meredith.jpg'
import michael from './pictures/michael.jpg'
import oscar from './pictures/oscar.jpg'
import pam from './pictures/pam.jpg'
import stanley from './pictures/stanley.jpg'

const memberBase = {
  description: '',
  archived: false,
}

export const members: MemberEntry[] = [
  {
    id: 'member-michael',
    orgId: 'org-1',
    name: 'Michael',
    picture: michael,
    ...memberBase,
  },
  {
    id: 'member-jim',
    orgId: 'org-1',
    name: 'Jim',
    picture: jim,
    ...memberBase,
  },
  {
    id: 'member-kevin',
    orgId: 'org-1',
    name: 'Kévin',
    picture: kevin,
    ...memberBase,
  },
  {
    id: 'member-pam',
    orgId: 'org-1',
    name: 'Pam',
    picture: pam,
    ...memberBase,
  },
  {
    id: 'member-dwight',
    orgId: 'org-1',
    name: 'Dwight',
    picture: dwight,
    ...memberBase,
  },
  {
    id: 'member-oscar',
    orgId: 'org-1',
    name: 'Oscar',
    picture: oscar,
    ...memberBase,
  },
  {
    id: 'member-stanley',
    orgId: 'org-1',
    name: 'Stanley',
    picture: stanley,
    ...memberBase,
  },
  {
    id: 'member-darryl',
    orgId: 'org-1',
    name: 'Darryl',
    picture: darryl,
    ...memberBase,
  },
  {
    id: 'member-meredith',
    orgId: 'org-1',
    name: 'Meredith',
    picture: meredith,
    ...memberBase,
  },
  {
    id: 'member-karen',
    orgId: 'org-1',
    name: 'Karen',
    picture: karen,
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
    id: 'circle-leader',
    orgId: 'org-1',
    roleId: 'role-leader',
    parentId: 'circle-super',
    members: [
      {
        id: '1',
        memberId: 'member-michael',
      },
    ],
    archived: false,
  },
  {
    id: 'circle-product',
    orgId: 'org-1',
    roleId: 'role-product',
    parentId: 'circle-super',
    members: [],
    archived: false,
  },
  {
    id: 'circle-product-leader',
    orgId: 'org-1',
    roleId: 'role-leader',
    parentId: 'circle-product',
    members: [
      {
        id: '1',
        memberId: 'member-darryl',
      },
    ],
    archived: false,
  },
  {
    id: 'circle-product-designer',
    orgId: 'org-1',
    roleId: 'role-designer',
    parentId: 'circle-product',
    members: [
      {
        id: '1',
        memberId: 'member-pam',
      },
    ],
    archived: false,
  },
  {
    id: 'circle-product-dev',
    orgId: 'org-1',
    roleId: 'role-dev',
    parentId: 'circle-product',
    members: [
      {
        id: '1',
        memberId: 'member-kevin',
      },
      {
        id: '2',
        memberId: 'member-meredith',
      },
    ],
    archived: false,
  },
  {
    id: 'circle-product-dev-leader',
    orgId: 'org-1',
    roleId: 'role-leader',
    parentId: 'circle-product-dev',
    members: [
      {
        id: '1',
        memberId: 'member-karen',
      },
    ],
    archived: false,
  },
  {
    id: 'circle-product-dev-facilitator',
    orgId: 'org-1',
    roleId: 'role-facilitator',
    parentId: 'circle-product-dev',
    members: [
      {
        id: '1',
        memberId: 'member-stanley',
      },
    ],
    archived: false,
  },
  {
    id: 'circle-business',
    orgId: 'org-1',
    roleId: 'role-business',
    parentId: 'circle-super',
    members: [
      {
        id: '1',
        memberId: 'member-pam',
      },
      {
        id: '2',
        memberId: 'member-dwight',
      },
    ],
    archived: false,
  },
  {
    id: 'circle-business-leader',
    orgId: 'org-1',
    roleId: 'role-leader',
    parentId: 'circle-business',
    members: [
      {
        id: '1',
        memberId: 'member-jim',
      },
    ],
    archived: false,
  },
  {
    id: 'circle-finance',
    orgId: 'org-1',
    roleId: 'role-finance',
    parentId: 'circle-super',
    members: [
      {
        id: '1',
        memberId: 'member-oscar',
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
    name: 'Mon Entreprise',
    ...roleBase,
  },
  {
    id: 'role-product',
    orgId: 'org-1',
    name: 'Product',
    ...roleBase,
  },
  {
    id: 'role-business',
    orgId: 'org-1',
    name: 'Business',
    ...roleBase,
  },
  {
    id: 'role-finance',
    orgId: 'org-1',
    name: 'Finance',
    ...roleBase,
  },
  {
    id: 'role-designer',
    orgId: 'org-1',
    name: 'Designer',
    ...roleBase,
  },
  {
    id: 'role-dev',
    orgId: 'org-1',
    name: 'Dev',
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
