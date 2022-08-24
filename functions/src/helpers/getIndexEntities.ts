import { WithId } from '@shared/model/types'
import { SearchIndex } from 'algoliasearch'
import * as admin from 'firebase-admin'
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
    snapshot.forEach((doc) => indexEntity(index, doc))
  }
}
