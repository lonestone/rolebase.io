import { CircleFragment, CircleFullFragment } from '@gql'
import { members } from './members'
import { roles } from './roles'

export const circles: CircleFragment[] = [
  {
    id: 'circle-super',
    orgId: 'org-1',
    roleId: 'role-super',
    parentId: null,
    archived: false,
  },
  {
    id: 'circle-agence',
    orgId: 'org-1',
    roleId: 'role-agence',
    parentId: 'circle-super',
    archived: false,
  },
  {
    id: 'circle-studio',
    orgId: 'org-1',
    roleId: 'role-studio',
    parentId: 'circle-super',
    archived: false,
  },
  {
    id: 'circle-agence-am',
    orgId: 'org-1',
    roleId: 'role-am',
    parentId: 'circle-agence',
    archived: false,
  },
  {
    id: 'circle-agence-dev',
    orgId: 'org-1',
    roleId: 'role-dev',
    parentId: 'circle-agence',
    archived: false,
  },
  {
    id: 'circle-agence-leader',
    orgId: 'org-1',
    roleId: 'role-leader',
    parentId: 'circle-agence',
    archived: false,
  },
  {
    id: 'circle-studio-leader',
    orgId: 'org-1',
    roleId: 'role-leader',
    parentId: 'circle-studio',
    archived: false,
  },
  {
    id: 'circle-agence-am-leader',
    orgId: 'org-1',
    roleId: 'role-leader',
    parentId: 'circle-agence-am',
    archived: false,
  },
  {
    id: 'circle-agence-dev-leader',
    orgId: 'org-1',
    roleId: 'role-leader',
    parentId: 'circle-agence-dev',
    archived: false,
  },
  {
    id: 'circle-agence-dev-facilitator',
    orgId: 'org-1',
    roleId: 'role-facilitator',
    parentId: 'circle-agence-dev',
    archived: false,
  },
]

const circlesMembers: Record<string, string[]> = {
  'circle-agence-dev': ['member-jean-kevin', 'member-pam'],
  'circle-agence-leader': ['member-alice'],
  'circle-studio-leader': ['member-jean-kevin'],
  'circle-agence-am-leader': ['member-bob'],
  'circle-agence-dev-leader': ['member-alice'],
  'circle-agence-dev-facilitator': ['member-bob'],
}

export const circlesFull: CircleFullFragment[] = circles.map((circle) => {
  // Find role
  const role = roles.find((role) => role.id === circle.roleId)
  if (!role) throw new Error(`Missing mock role ${circle.roleId}`)

  // Construct circle members
  const circleMembers = (circlesMembers[circle.id] || []).map((memberId) => {
    // Find member
    const member = members.find((member) => member.id === memberId)
    if (!member) throw new Error(`Missing mock member ${memberId}`)
    return {
      id: `${circle.id}-${member.id}`,
      circleId: circle.id,
      memberId: member.id,
      avgMinPerWeek: 0,
      createdAt: new Date().toISOString(),
      archived: false,
      member,
    }
  })

  return {
    ...circle,
    role,
    members: circleMembers,
    invitedCircleLinks: [],
  }
})
