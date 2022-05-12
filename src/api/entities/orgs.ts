import { getCollection } from '@api/helpers/getCollection'
import { getEntityMethods } from '@api/helpers/getEntityMethods'
import { subscribeIdsChunks } from '@api/helpers/subscribeIdsChunks'
import { Org } from '@shared/model/org'
import { query, where } from 'firebase/firestore'
import { httpsCallable } from 'firebase/functions'
import { memoize } from 'src/memoize'
import { functions } from '../firebase'

export const collection = getCollection<Org>('orgs')

export const methods = getEntityMethods(collection)
export const updateOrg = methods.update

export const subscribeOrgs = memoize(
  (ids: string[], archived: boolean = false) =>
    subscribeIdsChunks(ids, (constraint) =>
      query(collection, where('archived', '==', archived), constraint)
    )
)

export async function createOrg(name: string): Promise<string> {
  const { data: id } = await httpsCallable<any, string>(
    functions,
    'createOrg'
  )({
    name,
  })
  return id
}
