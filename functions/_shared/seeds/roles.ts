import { Role, RoleLink } from '../model/role'

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
  autoCreate: false,
  link: RoleLink.No,
  defaultMinPerWeek: null,
  colorHue: null,
}

export const getSeedRoles = (orgId: string): Role[] =>
  [
    { name: 'Leader', autoCreate: true, link: RoleLink.Parent, colorHue: 0 },
    { name: 'Représentant', link: RoleLink.Parent, colorHue: 18 },
    { name: 'Secrétaire', colorHue: 283 },
    { name: 'Facilitateur', colorHue: 111 },
  ].map((partialRole) => ({
    ...roleBase,
    orgId,
    ...partialRole,
  }))
