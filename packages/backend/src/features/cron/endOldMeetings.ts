import { gql } from '../../gql'
import { webhookProcedure } from '../../trpc/webhookProcedure'
import { adminRequest } from '../../utils/adminRequest'

const timeAfterEndDate = 6 * 60 * 60 * 1000

export default webhookProcedure.mutation(async () => {
  await adminRequest(END_OLD_MEETINGS, {
    before: new Date(Date.now() - timeAfterEndDate).toISOString(),
  })
})

const END_OLD_MEETINGS = gql(`
  mutation endOldMeetings($before: timestamptz!) {
    update_meeting(
      where: {
        endDate: { _lt: $before }
        ended: { _eq: false }
        currentStepId: { _is_null: false }
      }
      _set: { ended: true, currentStepId: null }
    ) {
      returning {
        id
      }
    }
  }
`)
