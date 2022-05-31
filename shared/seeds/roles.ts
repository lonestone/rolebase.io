import { Role } from '@shared/model/role'

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
  link: false,
  defaultMinPerWeek: null,
  colorHue: null,
}

export const getSeedRoles = (orgId: string): Role[] =>
  [
    { name: 'Leader', link: true, colorHue: 0 },
    { name: 'Représentant', link: true, colorHue: 18 },
    { name: 'Secrétaire', colorHue: 283 },
    { name: 'Facilitateur', colorHue: 111 },
  ].map((partialRole) => ({
    ...roleBase,
    orgId,
    ...partialRole,
  }))
