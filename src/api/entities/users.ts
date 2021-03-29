import * as yup from 'yup'
import { getCollection } from '../firebase'
import { emailSchema, nameSchema } from '../schemas'

export interface User {
  name: string
  email: string
  picture?: string
}

export type UserEntry = User & { id: string }
export type UserCreate = User
export type UserUpdate = Partial<User>

const collection = getCollection<User>('users')

export function subscribeUser(
  email: string,
  onData: (user: UserEntry) => void,
  onError: (error: Error) => void
): () => void {
  return collection.where('email', '==', email).onSnapshot((querySnapshot) => {
    const doc = querySnapshot.docs[0]
    if (doc) {
      onData({
        id: doc.id,
        ...doc.data(),
      })
    }
  }, onError)
}

export async function getUser(id: string): Promise<UserEntry | undefined> {
  const snapshot = await collection.doc(id).get()
  const data = snapshot.data()
  if (!data) return undefined
  return { id, ...data }
}

export async function createUser(
  email: string,
  name: string
): Promise<UserEntry> {
  const user: User = {
    name,
    email,
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
  email: emailSchema,
})

export const userUpdateSchema = yup.object().shape({
  name: nameSchema,
  email: emailSchema,
})
