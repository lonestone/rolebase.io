import { WithId } from './types'

// Organization
export interface Org {
  name: string
  ownersIds: string[] // Ids of users that own the organization
  disabled: boolean
  defaultWorkedMinPerWeek: number
}

export type OrgEntry = WithId<Org>
