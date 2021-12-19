import { Optional } from '@shared/types'
import { User } from '@shared/user'
import { getCollection, getEntityMethods, Timestamp } from '../firebase'

export const collection = getCollection<User>('users')

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
