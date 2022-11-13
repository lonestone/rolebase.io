import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { Decision_Insert_Input } from '_gql/graphql'
import { getCollection } from './firebase'
import { getMemberIdFromUserId } from './getMemberIdFromUserId'
import { id, oldIds, saveOldIds } from './oldIds'
import { saveFilesFromTexts } from './saveFilesFromTexts'
import { Decision as FirebaseDecision } from './_model/decision'

export async function importDecisions() {
  console.log('Importing decisions...')

  // Get all decisions
  const decisions = await getCollection<FirebaseDecision>('decisions').get()
  const newDecisions: Decision_Insert_Input[] = []

  for (const doc of decisions.docs) {
    const data = doc.data()
    const orgId = id(data.orgId)
    const { type, newId } = oldIds.get(data.memberId)!
    let memberId = newId

    // Fix memberId that is in fact a userId
    if (type !== 'member') {
      console.log(`memberId ${newId} is a ${type}`)
      const i = await getMemberIdFromUserId(newId, orgId)
      if (i) {
        memberId = i
        console.log(`memberId replaced to ${memberId}`)
      }
    }

    newDecisions.push({
      orgId: id(data.orgId),
      circleId: id(data.circleId),
      memberId,
      title: data.title || '',
      description: data.description || '',
      archived: data.archived,
      createdAt: data.createdAt.toDate().toISOString(),
    })
  }

  // Insert decisions
  const result = await adminRequest(
    gql(`
        mutation ImportDecisions($objects: [decision_insert_input!]!) {
          insert_decision(objects: $objects) {
            returning {
              id
            }
          }
        }
      `),
    { objects: await saveFilesFromTexts(newDecisions) }
  )

  await saveOldIds(
    'decision',
    decisions.docs.map((doc, i) => ({
      oldId: doc.id,
      newId: result.insert_decision!.returning[i].id,
    }))
  )
}
