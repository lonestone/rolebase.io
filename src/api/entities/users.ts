import { Optional } from '@shared/types'
import { User } from '@shared/user'
import * as yup from 'yup'
import { getCollection, getEntityMethods, Timestamp } from '../firebase'
import { emailSchema, nameSchema } from '../schemas'

const collection = getCollection<User>('users')

const methods = getEntityMethods(collection)
export const updateUser = methods.update
export const subscribeUser = methods.subscribe
export const deleteUser = methods.delete

export async function createUser(
  id: string,
  user: Optional<User, 'createdAt'>
) {
  await collection.doc(id).set({
    ...user,
    createdAt: Timestamp.now(),
  })
}

export const userCreateSchema = yup.object().shape({
  name: nameSchema,
  email: emailSchema,
})

export const userUpdateSchema = yup.object().shape({
  name: nameSchema,
  email: emailSchema,
})
