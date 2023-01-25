import { Member_Role_Enum } from '@gql'
import { getMemberById } from '@utils/getMemberById'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { route, RouteError } from '@utils/route'
import { updateMember } from '@utils/updateMember'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  memberId: yup.string().required(),
})

export default route(async (context): Promise<void> => {
  guardAuth(context)
  const { memberId } = guardBodyParams(context, yupSchema)

  // Get member
  const member = await getMemberById(memberId)

  if (!member) {
    throw new RouteError(400, 'Member does not exists')
  }

  const org = await guardOrg(context, member.orgId, Member_Role_Enum.Admin)

  if (member.role === Member_Role_Enum.Owner) {
    const owners = org.members.filter(mem => mem.role === Member_Role_Enum.Owner)

    // Checks if at least 1 owner will remain in the org
    if (owners.length <= 1) {
      throw new RouteError(400, 'Org must have at least 1 owner')
    }
  }

  return updateMember(memberId, { archived: true })
})
