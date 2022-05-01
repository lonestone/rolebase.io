import { WithId } from './types'

export interface Role {
  orgId: string
  archived: boolean
  base: boolean
  name: string
  purpose: string
  domain: string
  accountabilities: string
  checklist: string
  indicators: string
  notes: string
  // Can only contain 0-1 member if true
  singleMember: boolean
  // Link to another circle (parent or other)
  // to represent parent circle's purpose in this other circle.
  // Only if singleMember is true
  //   string = circleId
  //   true = grand parent circle
  //   false = not a link
  link: string | boolean
  // Default work duration for this role
  // Can be overriden by circle member, uses org value by default
  defaultMinPerWeek: number | null
}

export type RoleEntry = WithId<Role>
