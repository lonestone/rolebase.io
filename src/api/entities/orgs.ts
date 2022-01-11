import { Org, OrgEntry } from '@shared/org'
import firebase from 'firebase/app'
import { memoize } from 'src/memoize'
import {
  functions,
  getCollection,
  getEntityMethods,
  stackSubscribe,
  subscribeQuery,
  SubscriptionFn,
} from '../firebase'

export const collection = getCollection<Org>('orgs')

export const methods = getEntityMethods(collection)
export const updateOrg = methods.update

export const subscribeOrgs = memoize(
  (ids: string[], archived: boolean = false): SubscriptionFn<OrgEntry[]> => {
    return stackSubscribe((onData, onError) => {
      const unsubscribeHandlers: Function[] = []
      const chunksData: OrgEntry[][] = []
      for (let i = 0; i < ids.length; i += 10) {
        const subscribe = subscribeQuery(
          collection
            .where(
              firebase.firestore.FieldPath.documentId(),
              'in',
              ids.slice(i, i + 10)
            )
            .where('archived', '==', archived)
        )
        const unsubscribe = subscribe((data) => {
          chunksData[i] = data
          onData(chunksData.flat().sort((a, b) => (a.name < b.name ? -1 : 1)))
        }, onError)
        unsubscribeHandlers.push(unsubscribe)
      }
      return () => {
        unsubscribeHandlers.forEach((unsubscribe) => unsubscribe())
        unsubscribeHandlers.length = 0
      }
    })
  }
)

export async function createOrg(name: string): Promise<void> {
  await functions.httpsCallable('createOrg')({
    name,
  })
}
