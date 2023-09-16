import { Member_Role_Enum } from '@gql'
import { generateMeetingToken } from '@utils/generateMeetingToken'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { route } from '@utils/route'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  orgId: yup.string().required(),
})

export default route(async (context): Promise<string> => {
  guardAuth(context)
  const { orgId } = guardBodyParams(context, yupSchema)
  await guardOrg(orgId, Member_Role_Enum.Readonly, context)
  return generateMeetingToken(orgId)
})
