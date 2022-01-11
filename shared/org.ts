import { WithId } from './types'

// Organization
export interface Org {
  name: string
  archived: boolean
  // Default work duration for every role
  // Can be overriden by role or by circle member
  defaultWorkedMinPerWeek: number
}

export type OrgEntry = WithId<Org>
