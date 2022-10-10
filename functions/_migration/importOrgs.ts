import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { getCollection } from './firebase'
import { saveOldIds } from './oldIds'
import { Org as FirebaseOrg } from './_model/org'

export async function importOrgs() {
  console.log('Importing orgs...')

  // Get all orgs
  const orgs = await getCollection<FirebaseOrg>('orgs').get()
  const newOrgs = orgs.docs.map((doc) => {
    const data = doc.data()
    return {
      name: data.name,
      archived: data.archived,
      defaultWorkedMinPerWeek: data.defaultWorkedMinPerWeek || 2100,
      slug: data.slug,
      createdAt: data.createdAt.toDate().toISOString(),
    }
  })

  // Insert orgs
  const result = await adminRequest(
    gql(`
        mutation ImportOrgs($objects: [org_insert_input!]!) {
          insert_org(objects: $objects) {
            returning {
              id
            }
          }
        }
      `),
    { objects: newOrgs }
  )

  await saveOldIds(
    'org',
    orgs.docs.map((doc, i) => ({
      oldId: doc.id,
      newId: result.insert_org!.returning[i].id,
    }))
  )
}
