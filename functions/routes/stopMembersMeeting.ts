import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { route } from '@utils/route'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  meetingId: yup.string().required(),
})

export default route(async (context): Promise<void> => {
  guardAuth(context)
  const { meetingId } = guardBodyParams(context, yupSchema)

  await adminRequest(STOP_MEMBERS_MEETING, { meetingId })
})

const STOP_MEMBERS_MEETING = gql(`
  mutation stopMembersMeeting($meetingId: uuid!) {
    update_member(
      where: { meetingId: { _eq: $meetingId } }
      _set: { meetingId: null }
    ) {
      returning {
        id
      }
    }
  }`)
