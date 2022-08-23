import { WithId } from '@shared/model/types'
import * as crypto from 'crypto'
import * as admin from 'firebase-admin'

export function md5(data: string): string {
  return crypto.createHash('md5').update(data).digest('hex')
}

export function getDocData<Entity>(
  doc: admin.firestore.DocumentSnapshot<Entity>
): WithId<Entity> {
  const data = doc.data()
  if (!data) throw new Error(`Error getting doc data: ${doc.id}`)
  return { id: doc.id, ...data }
}

export function getQuerySnapshotData<Entity>(
  querySnapshot: admin.firestore.QuerySnapshot<Entity>
): WithId<Entity>[] {
  return querySnapshot.docs.map(getDocData)
}
