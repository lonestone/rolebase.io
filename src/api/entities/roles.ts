import { Role, RoleEntry } from '@shared/role'
import * as yup from 'yup'
import { getCollection, subscribeQuery } from '../firebase'
import { nameSchema } from '../schemas'

export const collection = getCollection<Role>('roles')

export function subscribeRoles(orgId: string) {
  return subscribeQuery(collection.where('orgId', '==', orgId).orderBy('name'))
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

export async function updateRole(id: string, data: Partial<Role>) {
  await collection.doc(id).update(data)
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
