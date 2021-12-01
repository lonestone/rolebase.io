import { Role } from '@shared/role'
import { Optional } from '@shared/types'
import memoize from 'memoizee'
import * as yup from 'yup'
import { getCollection, getEntityMethods, subscribeQuery } from '../firebase'
import { nameSchema } from '../schemas'

export const collection = getCollection<Role>('roles')

const methods = getEntityMethods(collection, {
  createTransform: (
    role: Optional<Role, 'purpose' | 'domain' | 'accountabilities' | 'notes'>
  ) => ({
    ...role,
    purpose: role.purpose || '',
    domain: role.domain || '',
    accountabilities: role.accountabilities || '',
    notes: role.notes || '',
  }),
})
export const createRole = methods.create
export const updateRole = methods.update
export const deleteRole = methods.delete

export const subscribeRoles = memoize((orgId: string) =>
  subscribeQuery(collection.where('orgId', '==', orgId).orderBy('name'))
)

export const roleCreateSchema = yup.object().shape({
  name: nameSchema,
})

export const roleUpdateSchema = yup.object().shape({
  name: nameSchema,
  purpose: yup.string(),
  domain: yup.string(),
  accountabilities: yup.string(),
  defaultMinPerWeek: yup.number().nullable(),
})
