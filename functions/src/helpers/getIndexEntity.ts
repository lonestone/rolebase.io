import { SearchDoc, SearchTypes } from '@shared/model/search'
import { WithId } from '@shared/model/types'
import { SearchIndex } from 'algoliasearch'
import * as admin from 'firebase-admin'
import { getDocData } from '../utils'

export type SearchDocGetter<Entity, Result = string> = (
  entity: WithId<Entity>,
  doc: admin.firestore.DocumentSnapshot<Entity>
) => Result | Promise<Result>

export type IndexEntityFunction<Entity> = (
  index: SearchIndex,
  doc: admin.firestore.DocumentSnapshot<Entity>
) => Promise<void>

export function getIndexEntity<
  Entity extends { orgId: string; archived: boolean }
>(
  type: SearchTypes,
  getters: {
    getTitle: SearchDocGetter<Entity>
    getDescription?: SearchDocGetter<Entity>
    getPicture?: SearchDocGetter<Entity, string | undefined>
  }
): IndexEntityFunction<Entity> {
  return async (index, doc) => {
    const entity = getDocData(doc)
    if (entity.archived) return

    const searchDoc: SearchDoc = {
      objectID: entity.id,
      orgId: entity.orgId,
      type,
      title: await getters.getTitle(entity, doc),
      description: (await getters.getDescription?.(entity, doc)) ?? '',
    }

    if (getters.getPicture) {
      searchDoc.picture = await getters.getPicture(entity, doc)
    }

    await index.saveObject(searchDoc).catch(console.error)
  }
}
