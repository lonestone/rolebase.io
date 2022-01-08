import { Org } from '@shared/org'
import { Optional } from '@shared/types'
import { memoize } from 'src/memoize'
import { getCollection, getEntityMethods, subscribeQuery } from '../firebase'

export const collection = getCollection<Org>('orgs')

export const methods = getEntityMethods(collection, {
  createTransform: (
    org: Optional<Org, 'archived' | 'defaultWorkedMinPerWeek'>
  ) => ({
    archived: false,
    defaultWorkedMinPerWeek: 35 * 60,
    ...org,
  }),
})
export const createOrg = methods.create
export const updateOrg = methods.update

export const subscribeOrgs = memoize(
  (userId: string, archived: boolean = false) =>
    subscribeQuery(
      collection
        .where('ownersIds', 'array-contains', userId)
        .where('archived', '==', archived)
        .orderBy('name')
    )
)
