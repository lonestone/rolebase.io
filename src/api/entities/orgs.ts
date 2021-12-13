import { Org } from '@shared/org'
import { Optional } from '@shared/types'
import { memoize } from 'src/memoize'
import * as yup from 'yup'
import { getCollection, getEntityMethods, subscribeQuery } from '../firebase'
import { nameSchema } from '../schemas'

export const collection = getCollection<Org>('orgs')

export const methods = getEntityMethods(collection, {
  createTransform: (
    org: Optional<Org, 'archived' | 'defaultWorkedMinPerWeek'>
  ) => ({
    ...org,
    archived: false,
    defaultWorkedMinPerWeek: org.defaultWorkedMinPerWeek ?? 35 * 60,
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

export const orgCreateSchema = yup.object().shape({
  name: nameSchema,
})

export const orgUpdateSchema = yup.object().shape({
  name: nameSchema,
  defaultWorkedMinPerWeek: yup.number(),
})
