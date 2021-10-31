// Organization
export interface Org {
  name: string
  ownersIds: string[] // Ids of users that own the organization
  disabled: boolean
  defaultWorkedMinPerWeek: number
}

export type OrgEntry = Org & { id: string }
export type OrgCreate = Org
export type OrgUpdate = Partial<Org>
