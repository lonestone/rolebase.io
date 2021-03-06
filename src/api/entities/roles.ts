import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types'
import * as yup from 'yup'
import { getCollection } from '../firebase'
import { createDataHooks } from '../hooks'
import { nameSchema } from '../schemas'

export interface Role {
  name: string
  purpose: string
  domain: string
  accountabilities: string
}

export type RoleEntry = Data<Role, 'id', 'id'>
export type RoleCreate = Role
export type RoleUpdate = Partial<Role>

const collection = getCollection<Role>('roles')

// React hooks
const hooks = createDataHooks<Role, RoleEntry>(collection)
export const useRoles = hooks.useCollection
export const useRole = hooks.useDocument
export const useContextRoles = hooks.useContextCollection
export const useContextRole = hooks.useContextDocument
export const RolesProvider = hooks.Provider

export async function createRole(name: string): Promise<RoleEntry | undefined> {
  const role: Role = {
    name,
    purpose: '',
    domain: '',
    accountabilities: '',
  }
  const doc = await collection.add(role)
  const snapshot = await doc.get()
  return { ...snapshot.data(), id: doc.id } as RoleEntry | undefined
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
