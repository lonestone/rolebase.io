import * as yup from 'yup'
import { authedProcedure } from '../../authedProcedure'
import { Member_Role_Enum } from '../../gql'
import { generateMeetingToken } from '../../utils/generateMeetingToken'
import { guardOrg } from '../../utils/guardOrg'

const yupSchema = yup.object().shape({
  orgId: yup.string().required(),
})

export const getMeetingsToken = authedProcedure
  .input(yupSchema)
  .query(async (opts): Promise<string> => {
    const { orgId } = opts.input
    await guardOrg(orgId, Member_Role_Enum.Readonly, opts.ctx)
    return generateMeetingToken(orgId)
  })
