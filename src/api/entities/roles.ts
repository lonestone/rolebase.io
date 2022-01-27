import { Role } from '@shared/role'
import { Optional } from '@shared/types'
import { orderBy, query, where } from 'firebase/firestore'
import { memoize } from 'src/memoize'
import { getCollection, getEntityMethods, subscribeQuery } from '../firebase'

export const collection = getCollection<Role>('roles')

const methods = getEntityMethods(collection, {
  createTransform: (
    role: Optional<Role, 'purpose' | 'domain' | 'accountabilities' | 'notes'>
  ) => ({
    purpose: '',
    domain: '',
    accountabilities: '',
    notes: '',
    ...role,
  }),
})
export const createRole = methods.create
export const updateRole = methods.update
export const deleteRole = methods.delete

export const subscribeRoles = memoize((orgId: string) =>
  subscribeQuery(
    query(collection, where('orgId', '==', orgId), orderBy('name'))
  )
)
