import { Thread, ThreadEntry } from '@shared/thread'
import * as yup from 'yup'
import { getCollection, subscribeDoc, subscribeQuery } from '../firebase'
import { nameSchema } from '../schemas'

const collection = getCollection<Thread>('threads')

export function subscribeThreads(orgId: string) {
  return subscribeQuery(
    collection.where('orgId', '==', orgId).orderBy('createdDate')
  )
}

export function subscribeThread(id: string) {
  return subscribeDoc(collection.doc(id))
}

export async function getThread(id: string): Promise<ThreadEntry | undefined> {
  const snapshot = await collection.doc(id).get()
  const data = snapshot.data()
  if (!data) return undefined
  return { id, ...data }
}

export async function createThread(id: string, thread: Thread) {
  await collection.doc(id).set(thread)
}

export async function updateThread(id: string, data: Partial<Thread>) {
  await collection.doc(id).update(data)
}

export async function deleteThread(id: string) {
  await collection.doc(id).delete()
}

export const threadSchema = yup.object().shape({
  title: nameSchema,
})
