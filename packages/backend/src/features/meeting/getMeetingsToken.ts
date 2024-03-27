import * as yup from 'yup'
import { Member_Role_Enum } from '../../gql'
import { guardOrg } from '../../guards/guardOrg'
import { authedProcedure } from '../../trpc/authedProcedure'
import { generateMeetingToken } from './generateMeetingToken'

export default authedProcedure
  .input(
    yup.object().shape({
      orgId: yup.string().required(),
    })
  )
  .query(async (opts): Promise<string> => {
    const { orgId } = opts.input
    await guardOrg(orgId, Member_Role_Enum.Readonly, opts.ctx)
    return generateMeetingToken(orgId)
  })
