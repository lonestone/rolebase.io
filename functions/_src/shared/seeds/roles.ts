import { RoleFragment } from '@gql'

export const defaultSeedRole = {
  archived: false,
  base: true,
  purpose: '',
  domain: '',
  accountabilities: '',
  checklist: '',
  indicators: '',
  notes: '',
  singleMember: true,
  parentLink: false,
  defaultMinPerWeek: null,
  colorHue: null,
}

export const getSeedRoles = (orgId: string): Omit<RoleFragment, 'id'>[] =>
  [
    { name: 'Leader', parentLink: true, colorHue: 0 },
    { name: 'Représentant', parentLink: true, colorHue: 18 },
    { name: 'Secrétaire', colorHue: 283 },
    { name: 'Facilitateur', colorHue: 111 },
  ].map((partialRole) => ({
    ...defaultSeedRole,
    orgId,
    ...partialRole,
  }))
