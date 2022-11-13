import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { Circle_Insert_Input } from '_gql/graphql'
import { getCollection } from './firebase'
import { id, saveOldIds } from './oldIds'
import { Circle as FirebaseCircle } from './_model/circle'

export async function importCircles() {
  console.log('Importing circles...')

  // Get all circles
  const circles = await getCollection<FirebaseCircle>('circles').get()

  const newCircles = circles.docs.map((doc) => {
    const data = doc.data()
    return {
      orgId: id(data.orgId),
      roleId: id(data.roleId),
      parentId: null, // Temporary null (see below)
      members: {
        data: data.members
          .map((m) => {
            try {
              return {
                memberId: id(m.memberId),
                avgMinPerWeek: m.avgMinPerWeek,
              }
            } catch (e) {
              return
            }
          })
          .filter(Boolean),
      },
      archived: data.archived ?? false,
    } as Circle_Insert_Input
  })

  // Insert circles
  const result = await adminRequest(
    gql(`
        mutation ImportCircles($objects: [circle_insert_input!]!) {
          insert_circle(objects: $objects) {
            returning {
              id
            }
          }
        }
      `),
    { objects: newCircles }
  )

  await saveOldIds(
    'circle',
    circles.docs.map((doc, i) => ({
      oldId: doc.id,
      newId: result.insert_circle!.returning[i].id,
    }))
  )

  // Update parentId
  for (const doc of circles.docs) {
    const data = doc.data()
    if (!data.parentId) continue
    await adminRequest(
      gql(`
          mutation UpdateCircleParentId($id: uuid!, $parentId: uuid!) {
            update_circle_by_pk(pk_columns: { id: $id }, _set: { parentId: $parentId }) {
              id
            }
          }
        `),
      {
        id: id(doc.id),
        parentId: id(data.parentId),
      }
    )
  }
  console.log('Updated circles parentId.')
}
