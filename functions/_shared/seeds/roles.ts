import { RoleFragment } from '@gql'
import { RoleLink } from '../model/role'

const roleBase = {
  archived: false,
  base: true,
  purpose: '',
  domain: '',
  accountabilities: '',
  checklist: '',
  indicators: '',
  notes: '',
  singleMember: true,
  link: RoleLink.No,
  defaultMinPerWeek: null,
  colorHue: null,
}

export const getSeedRoles = (orgId: string): Omit<RoleFragment, 'id'>[] =>
  [
    { name: 'Leader', link: RoleLink.Parent, colorHue: 0 },
    { name: 'Représentant', link: RoleLink.Parent, colorHue: 18 },
    { name: 'Secrétaire', colorHue: 283 },
    { name: 'Facilitateur', colorHue: 111 },
  ].map((partialRole) => ({
    ...roleBase,
    orgId,
    ...partialRole,
  }))
