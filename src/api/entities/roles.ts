import { Role } from '@shared/role'
import { Optional } from '@shared/types'
import { orderBy, query, where } from 'firebase/firestore'
import { memoize } from 'src/memoize'
import { getCollection, getEntityMethods, subscribeQuery } from '../firebase'

export const collection = getCollection<Role>('roles')

const methods = getEntityMethods(collection, {
  createTransform: (
    role: Optional<
      Role,
      'archived' | 'purpose' | 'domain' | 'accountabilities' | 'notes'
    >
  ) => ({
    archived: false,
    purpose: '',
    domain: '',
    accountabilities: '',
    notes: '',
    ...role,
  }),
})
export const createRole = methods.create
export const updateRole = methods.update

export const subscribeRoles = memoize((orgId: string, archived: boolean) =>
  subscribeQuery(
    query(
      collection,
      where('orgId', '==', orgId),
      where('archived', '==', archived),
      orderBy('name')
    )
  )
)
