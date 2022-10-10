import { ClaimRole } from '@shared/model/userClaims'
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
  await guardOrg(context, orgId, ClaimRole.Readonly)
  return generateMeetingToken(orgId)
})
