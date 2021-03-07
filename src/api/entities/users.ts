import * as yup from 'yup'
import { getCollection } from '../firebase'
import { nameSchema } from '../schemas'

export interface User {
  name: string
}

export type UserEntry = User & { id: string }
export type UserCreate = User
export type UserUpdate = Partial<User>

const collection = getCollection<User>('users')

export async function getUser(id: string): Promise<UserEntry | undefined> {
  const snapshot = await collection.doc(id).get()
  const data = snapshot.data()
  if (!data) return undefined
  return { id, ...data }
}

export async function createUser(name: string): Promise<UserEntry> {
  const user: User = {
    name,
  }
  const doc = await collection.add(user)
  const snapshot = await doc.get()
  return { ...snapshot.data()!, id: doc.id }
}

export async function updateUser(id: string, data: UserUpdate) {
  await collection.doc(id).set(data, { merge: true })
}

export async function deleteUser(id: string) {
  await collection.doc(id).delete()
}

export const userCreateSchema = yup.object().shape({
  name: nameSchema,
})

export const userUpdateSchema = yup.object().shape({
  name: nameSchema,
})
