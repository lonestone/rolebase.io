import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { getCollection } from './firebase'
import { id, saveOldIds } from './oldIds'
import { saveFilesFromTexts } from './saveFilesFromTexts'
import { Role as FirebaseRole } from './_model/role'

export async function importRoles() {
  console.log('Importing roles...')

  // Get all roles
  const roles = await getCollection<FirebaseRole>('roles').get()
  const newRoles = roles.docs.map((doc) => {
    const data = doc.data()
    return {
      orgId: id(data.orgId),
      name: data.name,
      archived: data.archived || false,
      base: data.base || false,
      purpose: data.purpose || '',
      domain: data.domain || '',
      accountabilities: data.accountabilities || '',
      checklist: data.checklist || '',
      indicators: data.indicators || '',
      notes: data.notes || '',
      singleMember: data.singleMember || false,
      autoCreate: data.autoCreate || false,
      link: data.link === true ? 'Parent' : data.link || 'No',
      defaultMinPerWeek: data.defaultMinPerWeek ?? null,
      colorHue: data.colorHue ?? null,
    }
  })

  // Insert roles
  const result = await adminRequest(
    gql(`
        mutation ImportRoles($objects: [role_insert_input!]!) {
          insert_role(objects: $objects) {
            returning {
              id
            }
          }
        }
      `),
    { objects: await saveFilesFromTexts(newRoles) }
  )

  await saveOldIds(
    'role',
    roles.docs.map((doc, i) => ({
      oldId: doc.id,
      newId: result.insert_role!.returning[i].id,
    }))
  )
}
