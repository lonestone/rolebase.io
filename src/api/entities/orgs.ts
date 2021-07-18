import * as yup from 'yup'
import { getCollection, snapshotQuery } from '../firebase'
import { nameSchema } from '../schemas'

// Organization
export interface Org {
  name: string
  ownersIds: string[] // Ids of users that own the organization
  disabled: boolean
  defaultWorkedMinPerWeek: number
}

export type OrgEntry = Org & { id: string }
export type OrgCreate = Org
export type OrgUpdate = Partial<Org>

const collection = getCollection<Org>('orgs')

export function subscribeOrgs(
  userId: string,
  onData: (orgUpdateSchema: OrgEntry[]) => void,
  onError: (error: Error) => void
): () => void {
  return snapshotQuery(
    collection
      .where('ownersIds', 'array-contains', userId)
      .where('disabled', '!=', true)
      .orderBy('disabled')
      .orderBy('name'),
    onData,
    onError
  )
}

export async function createOrg(
  name: string,
  ownerId: string
): Promise<OrgEntry> {
  const role: Org = {
    name,
    ownersIds: [ownerId],
    disabled: false,
    defaultWorkedMinPerWeek: 35 * 60,
  }
  const doc = await collection.add(role)
  const snapshot = await doc.get()
  return { ...snapshot.data()!, id: doc.id }
}

export async function updateOrg(id: string, data: OrgUpdate) {
  await collection.doc(id).set(data, { merge: true })
}

export async function deleteOrg(id: string) {
  await updateOrg(id, { disabled: true })
}

export const orgCreateSchema = yup.object().shape({
  name: nameSchema,
})

export const orgUpdateSchema = yup.object().shape({
  name: nameSchema,
  defaultWorkedMinPerWeek: yup.number(),
})
