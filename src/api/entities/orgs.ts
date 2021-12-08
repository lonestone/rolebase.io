import { Org } from '@shared/org'
import { Optional } from '@shared/types'
import { memoize } from 'src/utils'
import * as yup from 'yup'
import { getCollection, getEntityMethods, subscribeQuery } from '../firebase'
import { nameSchema } from '../schemas'

const collection = getCollection<Org>('orgs')

const methods = getEntityMethods(collection, {
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

export const subscribeOrgs = memoize((userId: string) =>
  subscribeQuery(
    collection
      .where('ownersIds', 'array-contains', userId)
      .where('archived', '==', false)
      .orderBy('archived')
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
