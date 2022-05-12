import { WithId } from '@shared/model/types'
import * as crypto from 'crypto'
import * as admin from 'firebase-admin'

export function md5(data: string): string {
  return crypto.createHash('md5').update(data).digest('hex')
}

export function getQuerySnapshotData<Entity>(
  querySnapshot: admin.firestore.QuerySnapshot<Entity>
): WithId<Entity>[] {
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}
