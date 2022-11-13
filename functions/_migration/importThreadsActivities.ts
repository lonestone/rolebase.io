import { gql } from '@gql'
import { Activity } from '@shared/model/thread_activity'
import { adminRequest } from '@utils/adminRequest'
import { Thread_Poll_Answer_Insert_Input } from '_gql/graphql'
import { getCollection } from './firebase'
import { id, saveOldIds } from './oldIds'
import { saveFilesFromTexts } from './saveFilesFromTexts'
import {
  Activity as FirebaseActivity,
  ActivityType,
  PollAnswer as FirebasePollAnswer,
} from './_model/activity'

export async function importThreadsActivities() {
  // Get all activities
  console.log('Importing threads activities...')
  const activities = await getCollection<FirebaseActivity>('activities').get()
  const pollsIds: string[] = []

  const newActivities = activities.docs.map((doc) => {
    const data = doc.data()

    let activityData: Activity['data'] = {}

    if (data.type === ActivityType.Message) {
      activityData = {
        message: data.message,
      }
    }
    if (data.type === ActivityType.Poll) {
      activityData = {
        question: data.question,
        choices: data.choices,
        multiple: data.multiple,
        minAnswers: data.minAnswers,
        maxAnswers: data.maxAnswers,
        pointsPerUser: data.pointsPerUser,
        randomize: data.randomize,
        anonymous: data.anonymous,
        hideUntilEnd: data.hideUntilEnd,
        canAddChoice: data.canAddChoice,
        endDate: data.endDate ? data.endDate.toDate().toISOString() : null,
        endWhenAllVoted: data.endWhenAllVoted,
      }
      pollsIds.push(doc.id)
    }
    if (
      data.type === ActivityType.Thread ||
      data.type === ActivityType.Meeting ||
      data.type === ActivityType.Task ||
      data.type === ActivityType.Decision
    ) {
      activityData = {
        entityId: id(data.entityId),
      }
    }

    return {
      threadId: id(data.threadId),
      userId: id(data.userId),
      createdAt: data.createdAt.toDate().toISOString(),
      type: data.type,
      data: activityData,
    }
  })

  // Insert threads activiteies
  const activitiesResult = await adminRequest(
    gql(`
      mutation ImportThreadActivitiess($objects: [thread_activity_insert_input!]!) {
        insert_thread_activity(objects: $objects) {
          returning {
            id
          }
        }
      }
    `),
    { objects: await saveFilesFromTexts(newActivities) }
  )

  await saveOldIds(
    'thread_activity',
    activities.docs.map((doc, i) => ({
      oldId: doc.id,
      newId: activitiesResult.insert_thread_activity!.returning[i].id,
    }))
  )

  // Get poll answers
  console.log('Importing threads polls answers...')
  const newPollAnswers: Thread_Poll_Answer_Insert_Input[] = []
  for (const activityId of pollsIds) {
    const answers = await getCollection<FirebasePollAnswer>(
      `activities/${activityId}/answers`
    ).get()
    for (const doc of answers.docs) {
      const data = doc.data()
      newPollAnswers.push({
        activityId: id(activityId),
        userId: id(doc.id),
        choicesPoints: data.choicesPoints,
        createdAt: data.createdAt.toDate().toISOString(),
      })
    }
  }

  // Insert poll answers
  await adminRequest(
    gql(`
      mutation ImportPollAnswers($objects: [thread_poll_answer_insert_input!]!) {
        insert_thread_poll_answer(objects: $objects) {
          returning {
            id
          }
        }
      }
    `),
    { objects: newPollAnswers }
  )
  console.log(`Importied ${newPollAnswers.length} threads polls answers.`)
}
