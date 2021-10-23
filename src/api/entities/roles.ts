import * as yup from 'yup'
import { getCollection, snapshotQuery } from '../firebase'
import { nameSchema } from '../schemas'

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

export type RoleEntry = Role & { id: string }
export type RoleCreate = Role
export type RoleUpdate = Partial<Role>

export const collection = getCollection<Role>('roles')

export function subscribeRoles(
  orgId: string,
  onData: (roles: RoleEntry[]) => void,
  onError: (error: Error) => void
): () => void {
  return snapshotQuery(
    collection.where('orgId', '==', orgId).orderBy('name'),
    onData,
    onError
  )
}

export async function createRole(
  orgId: string,
  base: boolean,
  name: string
): Promise<RoleEntry> {
  const role: Role = {
    orgId,
    base,
    name,
    purpose: '',
    domain: '',
    accountabilities: '',
    notes: '',
  }
  const doc = await collection.add(role)
  const snapshot = await doc.get()
  return { ...snapshot.data()!, id: doc.id }
}

export async function updateRole(id: string, data: RoleUpdate) {
  await collection.doc(id).set(data, { merge: true })
}

export async function deleteRole(id: string) {
  await collection.doc(id).delete()
}

export const roleCreateSchema = yup.object().shape({
  name: nameSchema,
})

export const roleUpdateSchema = yup.object().shape({
  name: nameSchema,
  purpose: yup.string(),
  domain: yup.string(),
  accountabilities: yup.string(),
  defaultMinPerWeek: yup.number().nullable(),
})
