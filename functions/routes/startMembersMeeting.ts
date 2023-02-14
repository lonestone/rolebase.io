import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { route } from '@utils/route'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  membersIds: yup.array().of(yup.string().required()).required(),
  meetingId: yup.string().required(),
})

export default route(async (context): Promise<void> => {
  guardAuth(context)
  const { membersIds, meetingId } = guardBodyParams(context, yupSchema)

  await adminRequest(START_MEMBERS_MEETING, {
    membersIds,
    meetingId,
  })
})

const START_MEMBERS_MEETING = gql(`
  mutation startMembersMeeting($membersIds: [uuid!]!, $meetingId: uuid!) {
    update_member(
      where: { id: { _in: $membersIds } }
      _set: { meetingId: $meetingId }
    ) {
      returning {
        id
      }
    }
  }`)
