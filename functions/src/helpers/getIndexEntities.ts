import { WithId } from '@shared/model/types'
import { SearchIndex } from 'algoliasearch'
import * as admin from 'firebase-admin'
import { info } from 'firebase-functions/lib/logger'
import { IndexEntityFunction } from './getIndexEntity'

export type SearchDocGetter<Entity, Result = string> = (
  entity: WithId<Entity>,
  doc: admin.firestore.DocumentSnapshot<Entity>
) => Result | Promise<Result>

export function getIndexEntities<
  Entity extends { orgId: string; archived: boolean }
>(
  collection: admin.firestore.CollectionReference<Entity>,
  indexEntity: IndexEntityFunction<Entity>
) {
  return async (index: SearchIndex) => {
    const snapshot = await collection.get()
    const docs: admin.firestore.QueryDocumentSnapshot<Entity>[] = []
    snapshot.forEach((doc) => docs.push(doc))
    for (const doc of docs) {
      await indexEntity(index, doc)
    }
    info(`${collection.path} indexed`)
  }
}
