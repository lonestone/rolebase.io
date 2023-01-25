import { Member_Role_Enum } from '@gql'
import { getMemberById } from '@utils/getMemberById'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrgOwnership } from '@utils/guardOrgOwnership'
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

  if (member.role === Member_Role_Enum.Owner) {
    // Ensures at least one owner of the org will remain active
    await guardOrgOwnership(context, member.orgId)
  }

  return updateMember(memberId, { archived: true })
})
