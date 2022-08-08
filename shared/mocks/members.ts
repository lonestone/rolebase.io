import { MemberEntry } from '@shared/model/member'

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
