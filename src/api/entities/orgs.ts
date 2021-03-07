import * as yup from 'yup'
import { getCollection } from '../firebase'
import { nameSchema } from '../schemas'

export interface Org {
  name: string
}

export type OrgEntry = Org & { id: string }
export type OrgCreate = Org
export type OrgUpdate = Partial<Org>

const collection = getCollection<Org>('orgs')

export function subscribeOrgs(
  orgId: string,
  onData: (orgUpdateSchema: OrgEntry[]) => void,
  onError: (error: Error) => void
): () => void {
  return collection.onSnapshot((querySnapshot) => {
    const entries = querySnapshot.docs.map((snapshot) => ({
      id: snapshot.id,
      ...snapshot.data(),
    }))

    // Sort entries by name
    entries.sort((a, b) => ((a.name || '') < (b.name || '') ? -1 : 1))

    onData(entries)
  }, onError)
}

export async function createOrg(name: string): Promise<OrgEntry> {
  const role: Org = { name }
  const doc = await collection.add(role)
  const snapshot = await doc.get()
  return { ...snapshot.data()!, id: doc.id }
}

export async function updateOrg(id: string, data: OrgUpdate) {
  await collection.doc(id).set(data, { merge: true })
}

export async function deleteOrg(id: string) {
  await collection.doc(id).delete()
}

export const orgCreateSchema = yup.object().shape({
  name: nameSchema,
})

export const orgUpdateSchema = yup.object().shape({
  name: nameSchema,
})
