import * as yup from 'yup'
import { getCollection } from '../firebase'
import { nameSchema } from '../schemas'

export interface Role {
  orgId: string
  name: string
  purpose: string
  domain: string
  accountabilities: string
  notes: string
}

export type RoleEntry = Role & { id: string }
export type RoleCreate = Role
export type RoleUpdate = Partial<Role>

const collection = getCollection<Role>('roles')

export function subscribeRoles(
  orgId: string,
  onData: (roles: RoleEntry[]) => void,
  onError: (error: Error) => void
): () => void {
  return collection.where('orgId', '==', orgId).onSnapshot((querySnapshot) => {
    const entries = querySnapshot.docs.map((snapshot) => ({
      id: snapshot.id,
      ...snapshot.data(),
    }))

    // Sort entries by name
    entries.sort((a, b) => ((a.name || '') < (b.name || '') ? -1 : 1))

    onData(entries)
  }, onError)
}

export async function createRole(
  orgId: string,
  name: string
): Promise<RoleEntry> {
  const role: Role = {
    orgId,
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
})
