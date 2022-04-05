import { getCollection } from '@api/helpers/getCollection'
import { getEntityMethods } from '@api/helpers/getEntityMethods'
import { Optional } from '@shared/types'
import { User } from '@shared/user'
import { doc, setDoc, Timestamp } from 'firebase/firestore'

export const collection = getCollection<User>('users')

const methods = getEntityMethods(collection)
export const updateUser = methods.update
export const subscribeUser = methods.subscribe
export const deleteUser = methods.delete

export async function createUser(
  id: string,
  user: Optional<User, 'createdAt'>
) {
  const docRef = doc(collection, id)
  await setDoc(docRef, {
    ...user,
    createdAt: Timestamp.now(),
  })
}
