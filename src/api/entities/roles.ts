import { getCollection } from '@api/helpers/getCollection'
import { getEntityMethods } from '@api/helpers/getEntityMethods'
import { subscribeQuery } from '@api/helpers/subscribeQuery'
import { Role } from '@shared/model/role'
import { Optional } from '@shared/model/types'
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
      | 'checklist'
      | 'indicators'
      | 'notes'
      | 'singleMember'
      | 'link'
      | 'defaultMinPerWeek'
      | 'colorHue'
    >
  ) => ({
    archived: false,
    purpose: '',
    domain: '',
    accountabilities: '',
    checklist: '',
    indicators: '',
    notes: '',
    singleMember: false,
    link: false,
    defaultMinPerWeek: null,
    colorHue: null,
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
