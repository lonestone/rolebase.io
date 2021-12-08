import { PollAnswer } from '@shared/activity'
import { Optional } from '@shared/types'
import { memoize } from 'src/utils'
import {
  getEntityMethods,
  getSubCollection,
  subscribeQuery,
  Timestamp,
} from '../firebase'
import { collection as activitiesCollection } from './activities'

export const pollAnswersEntities = memoize((activityId: string) => {
  const collection = getSubCollection<PollAnswer>(
    activitiesCollection.doc(activityId),
    'answers'
  )

  const methods = getEntityMethods(collection, {
    createTransform: (activity: Optional<PollAnswer, 'createdAt'>) => ({
      ...activity,
      createdAt: Timestamp.now(),
    }),
  })
  return {
    createPollAnswer: methods.create,
    updatePollAnswer: methods.update,
    deletePollAnswer: methods.delete,
    subscribePollAnswers: memoize(() => subscribeQuery(collection)),
  }
})
