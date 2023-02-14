import { CircleFullFragment, MemberFragment, RoleFragment } from '@gql'
import { RoleLink } from '@shared/model/role'
import settings from 'src/settings'
import angela from './pictures/angela.jpg'
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

/* Members */

const memberBase = {
  orgId: 'org-1',
  description: '',
  archived: false,
}

const membersMap: Record<string, MemberFragment> = {
  michael: {
    id: 'member-michael',
    name: 'Michael',
    picture: settings.url + michael,
    ...memberBase,
  },
  jim: {
    id: 'member-jim',
    name: 'Jim',
    picture: settings.url + jim,
    ...memberBase,
  },
  kevin: {
    id: 'member-kevin',
    name: 'Kévin',
    picture: settings.url + kevin,
    ...memberBase,
  },
  pam: {
    id: 'member-pam',
    name: 'Pam',
    picture: settings.url + pam,
    ...memberBase,
  },
  dwight: {
    id: 'member-dwight',
    name: 'Dwight',
    picture: settings.url + dwight,
    ...memberBase,
  },
  oscar: {
    id: 'member-oscar',
    name: 'Oscar',
    picture: settings.url + oscar,
    ...memberBase,
  },
  angela: {
    id: 'member-angela',
    name: 'Angela',
    picture: settings.url + angela,
    ...memberBase,
  },
  karen: {
    id: 'member-karen',
    name: 'Karen',
    picture: settings.url + karen,
    ...memberBase,
  },
  meredith: {
    id: 'member-meredith',
    name: 'Meredith',
    picture: settings.url + meredith,
    ...memberBase,
  },
  stanley: {
    id: 'member-stanley',
    name: 'Stanley',
    picture: settings.url + stanley,
    ...memberBase,
  },
  darryl: {
    id: 'member-darryl',
    name: 'Darryl',
    picture: settings.url + darryl,
    ...memberBase,
  },
}

/* Roles */

const roleBase = {
  orgId: 'org-1',
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
  link: RoleLink.No,
  defaultMinPerWeek: null,
  colorHue: null,
}

const rolesMaps = {
  super: {
    id: 'role-super',
    name: 'Mon Entreprise',
    ...roleBase,
  },
  product: {
    id: 'role-product',
    name: 'Product',
    ...roleBase,
  },
  business: {
    id: 'role-business',
    name: 'Business',
    ...roleBase,
  },
  finance: {
    id: 'role-finance',
    name: 'Finance',
    ...roleBase,
  },
  designer: {
    id: 'role-designer',
    name: 'Designer',
    ...roleBase,
  },
  dev: {
    id: 'role-dev',
    name: 'Dev',
    ...roleBase,
  },
  leader: {
    id: 'role-leader',
    name: 'Leader',
    ...roleBase,
    base: true,
    singleMember: true,
    link: RoleLink.Parent,
    colorHue: 0,
  },
  facilitator: {
    id: 'role-facilitator',
    name: 'Facilitateur',
    ...roleBase,
    base: true,
    singleMember: true,
  },
}

/* Circles */

function buildCircleFull(
  id: string,
  parentId: string | null,
  role: RoleFragment,
  members?: MemberFragment[]
): CircleFullFragment {
  return {
    id,
    orgId: 'org-1',
    parentId,
    archived: false,
    roleId: role.id,
    role,
    members:
      members?.map((member) => ({
        id: `${id}-${member.id}`,
        circleId: id,
        memberId: member.id,
        avgMinPerWeek: 0,
        createdAt: new Date().toISOString(),
        archived: false,
        member,
      })) ?? [],
  }
}

export const circles = [
  buildCircleFull('circle-super', null, rolesMaps.super),
  buildCircleFull('circle-leader', 'circle-super', rolesMaps.leader, [
    membersMap.michael,
  ]),
  buildCircleFull('circle-product', 'circle-super', rolesMaps.product),
  buildCircleFull('circle-product-leader', 'circle-product', rolesMaps.leader, [
    membersMap.darryl,
  ]),
  buildCircleFull(
    'circle-product-designer',
    'circle-product',
    rolesMaps.designer,
    [membersMap.pam]
  ),
  buildCircleFull('circle-product-dev', 'circle-product', rolesMaps.dev, [
    membersMap.kevin,
    membersMap.meredith,
  ]),
  buildCircleFull(
    'circle-product-dev-leader',
    'circle-product-dev',
    rolesMaps.leader,
    [membersMap.karen]
  ),
  buildCircleFull(
    'circle-product-dev-facilitator',
    'circle-product-dev',
    rolesMaps.facilitator,
    [membersMap.stanley]
  ),
  buildCircleFull('circle-business', 'circle-super', rolesMaps.business, [
    membersMap.pam,
    membersMap.dwight,
  ]),
  buildCircleFull(
    'circle-business-leader',
    'circle-business',
    rolesMaps.leader,
    [membersMap.jim]
  ),
  buildCircleFull('circle-finance', 'circle-super', rolesMaps.finance, [
    membersMap.angela,
  ]),
]
