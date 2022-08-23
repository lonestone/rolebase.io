import { SearchIndex } from 'algoliasearch'
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import getAlgoliaIndex from './getAlgoliaClient'

export function getUpdateSearchHandler<Entity extends { archived: boolean }>(
  path: string,
  indexEntity: (
    index: SearchIndex,
    doc: admin.firestore.DocumentSnapshot<Entity>
  ) => void
) {
  return functions.firestore.document(path).onWrite((change) => {
    const index = getAlgoliaIndex()
    const data = change.after.data() as Entity
    if (!change.after.exists || data.archived) {
      index.deleteObject(change.after.id).catch(console.error)
    } else {
      indexEntity(
        index,
        change.after as admin.firestore.DocumentSnapshot<Entity>
      )
    }
  })
}
