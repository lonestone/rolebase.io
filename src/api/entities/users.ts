import { User, UserEntry } from '@shared/user'
import * as yup from 'yup'
import { getCollection, subscribeDoc } from '../firebase'
import { emailSchema, nameSchema } from '../schemas'

const collection = getCollection<User>('users')

export function subscribeUser(id: string) {
  return subscribeDoc(collection.doc(id))
}

export async function createUser(id: string, user: User) {
  await collection.doc(id).set(user)
}

export async function updateUser(id: string, data: Partial<User>) {
  await collection.doc(id).update(data)
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
