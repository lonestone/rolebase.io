import { getCollection } from '@api/helpers/getCollection'
import { getEntityMethods } from '@api/helpers/getEntityMethods'
import { subscribeQuery } from '@api/helpers/subscribeQuery'
import { Role } from '@shared/role'
import { Optional } from '@shared/types'
import { orderBy, query, where } from 'firebase/firestore'
import { memoize } from 'src/memoize'

export const collection = getCollection<Role>('roles')

const methods = getEntityMethods(collection, {
  createTransform: (
    role: Optional<
      Role,
      | 'archived'
      | 'purpose'
      | 'domain'
      | 'accountabilities'
      | 'notes'
      | 'singleMember'
      | 'link'
      | 'defaultMinPerWeek'
    >
  ) => ({
    archived: false,
    purpose: '',
    domain: '',
    accountabilities: '',
    notes: '',
    singleMember: false,
    link: false,
    defaultMinPerWeek: null,
    ...role,
  }),
})
export const getRole = methods.get
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
