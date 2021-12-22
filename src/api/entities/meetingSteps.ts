import { MeetingStep } from '@shared/meeting'
import { memoize } from 'src/memoize'
import { getEntityMethods, getSubCollection, subscribeQuery } from '../firebase'
import { collection as meetingsCollection } from './meetings'

export const meetingStepsEntities = memoize((meetingId: string) => {
  const collection = getSubCollection<MeetingStep>(
    meetingsCollection.doc(meetingId),
    'steps'
  )

  const methods = getEntityMethods(collection)
  return {
    createMeetingStep: methods.create,
    updateMeetingStep: methods.update,
    deleteMeetingStep: methods.delete,
    subscribeMeetingSteps: memoize(() => subscribeQuery(collection)),
  }
})
