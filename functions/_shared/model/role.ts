import { WithId } from './types'

export enum RoleLink {
  No = 'No',
  Parent = 'Parent',
}

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
  // Auto create on any new circle
  // Only if singleMember is true
  autoCreate: boolean
  // Link to another circle (parent or other)
  // to represent parent circle's purpose in this other circle.
  //   string = circleId
  //   "Parent" = grand parent circle
  //   "No" = not a link
  link: string
  // Default work duration for this role
  // Can be overriden by circle member, uses org value by default
  defaultMinPerWeek?: number | null
  // Optional color for the circle
  colorHue?: number | null
}

export type RoleEntry = WithId<Role>
