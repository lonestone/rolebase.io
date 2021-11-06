import { WithId } from './types'

export interface Role {
  orgId: string
  base: boolean
  name: string
  purpose: string
  domain: string
  accountabilities: string
  notes: string
  defaultMinPerWeek?: number | null
}

export type RoleEntry = WithId<Role>
