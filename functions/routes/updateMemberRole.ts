import { Member_Role_Enum } from '@gql'
import { roleSchema } from '@shared/schemas'
import { getMemberById } from '@utils/getMemberById'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { route, RouteError } from '@utils/route'
import { updateMember } from '@utils/updateMember'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  memberId: yup.string().required(),
  role: roleSchema,
})

export default route(async (context): Promise<void> => {
  guardAuth(context)
  const { memberId, role } = guardBodyParams(context, yupSchema)

  // Get member
  const member = await getMemberById(memberId)

  const org = await guardOrg(context, member.orgId, Member_Role_Enum.Admin)

  if (member.role === Member_Role_Enum.Owner) {
    const owners = org.members.filter(mem => mem.role === Member_Role_Enum.Owner)

    // Checks if at least 1 owner will remain in the org
    if (owners.length <= 1) {
      throw new RouteError(400, 'Org must have at least 1 owner')
    }
  }

  if (!member.role) {
    throw new RouteError(401, 'Member is not invited')
  }

  if (!role) {
    // Remove role
    await updateMember(memberId, {
      userId: null,
      role: null,
      inviteEmail: null,
      inviteDate: null,
    })
  } else if (role in Member_Role_Enum) {
    // Update role
    await updateMember(memberId, { role })
  } else {
    throw new RouteError(400, 'Invalid role')
  }
})
