import { getEntityMethods } from '@api/helpers/getEntityMethods'
import { getSubCollection } from '@api/helpers/getSubCollection'
import { subscribeQuery } from '@api/helpers/subscribeQuery'
import { PollAnswer } from '@shared/model/activity'
import { Optional } from '@shared/model/types'
import { doc, Timestamp } from 'firebase/firestore'
import { memoize } from 'src/memoize'
import { collection as activitiesCollection } from './activities'

export const pollAnswersEntities = memoize((activityId: string) => {
  const collection = getSubCollection<PollAnswer>(
    doc(activitiesCollection, activityId),
    'answers'
  )

  const methods = getEntityMethods(collection, {
    createTransform: (activity: Optional<PollAnswer, 'createdAt'>) => ({
      createdAt: Timestamp.now(),
      ...activity,
    }),
  })
  return {
    createPollAnswer: methods.create,
    updatePollAnswer: methods.update,
    deletePollAnswer: methods.delete,
    subscribePollAnswers: memoize(() => subscribeQuery(collection)),
  }
})
