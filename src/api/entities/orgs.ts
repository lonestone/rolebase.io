import { getCollection } from '@api/helpers/getCollection'
import { getEntityMethods } from '@api/helpers/getEntityMethods'
import { subscribeIdsChunks } from '@api/helpers/subscribeIdsChunks'
import { subscribeQuery } from '@api/helpers/subscribeQuery'
import { Org } from '@shared/model/org'
import { orderBy, query, where } from 'firebase/firestore'
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

export const subscribeAllOrgs = memoize(() =>
  subscribeQuery(
    query(
      collection,
      where('archived', '==', false),
      orderBy('createdAt', 'desc')
    )
  )
)

export async function createOrg(name: string): Promise<string> {
  const { data: id } = await httpsCallable<any, string>(
    functions,
    'createOrg'
  )({ name })
  return id
}

export async function updateOrgSlug(id: string, slug: string): Promise<void> {
  await httpsCallable<any, string>(functions, 'updateOrgSlug')({ id, slug })
}
