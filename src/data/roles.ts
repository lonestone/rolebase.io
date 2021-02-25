import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore'
import * as yup from 'yup'
import { FirebaseHookReturn, firestore } from './firebase'

export interface Role {
  name: string
  purpose: string
  domain: string
  accountabilities: string
}

export interface RoleEntry extends Role {
  id: string
}

export type RoleCreate = Role
export type RoleUpdate = Partial<Role>

const collection = firestore.collection('roles')

export function useRoles(): FirebaseHookReturn<RoleEntry[]> {
  return useCollectionData<RoleEntry>(collection, { idField: 'id' })
}

export function useRole(id: string): FirebaseHookReturn<RoleEntry> {
  return useDocumentData(collection.doc(id), { idField: 'id' })
}

export async function createRole(name: string) {
  const role: Role = {
    name,
    purpose: '',
    domain: '',
    accountabilities: '',
  }
  await collection.add(role)
}

export async function updateRole(id: string, data: RoleUpdate) {
  await collection.doc(id).set(data, { merge: true })
}

export async function deleteRole(id: string) {
  await collection.doc(id).delete()
}

const name = yup.string().required().min(3)

export const roleCreateSchema = yup.object().shape({
  name,
})

export const roleUpdateSchema = yup.object().shape({
  name,
  purpose: yup.string(),
  domain: yup.string(),
  accountabilities: yup.string(),
})
