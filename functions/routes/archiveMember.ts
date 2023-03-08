import { Member_Role_Enum } from '@gql'
import { getMemberById } from '@utils/getMemberById'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardMultipleOwnersOrg } from '@utils/guardMultipleOwnersOrg'
import { guardOrg } from '@utils/guardOrg'
import { route, RouteError } from '@utils/route'
import { updateMember } from '@utils/updateMember'
import { updateOrgSubscriptionAfterArchive } from '@utils/updateOrgSubscriptionAfterArchive'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  memberId: yup.string().required(),
  orgId: yup.string().required(),
})

export default route(async (context): Promise<void> => {
  guardAuth(context)
  const { memberId, orgId } = guardBodyParams(context, yupSchema)

  // Get member
  const memberToArchive = await getMemberById(memberId)

  if (!memberToArchive) {
    throw new RouteError(400, 'Member does not exist')
  }

  const { member: issuerMember } = await guardOrg(
    context,
    orgId,
    Member_Role_Enum.Admin
  )

  if (!memberToArchive) {
    throw new RouteError(400, 'Member does not exist')
  }

  if (
    memberToArchive.role === Member_Role_Enum.Owner &&
    issuerMember.role !== Member_Role_Enum.Owner
  ) {
    throw new RouteError(403, 'Insufficient permissions')
  }

  if (memberToArchive.role === Member_Role_Enum.Owner) {
    // Ensures at least one owner of the org will remain active
    await guardMultipleOwnersOrg(context, memberToArchive.orgId)
  }

  if (memberToArchive.userId) {
    await updateOrgSubscriptionAfterArchive(context, memberToArchive.orgId)
  }

  return updateMember(memberId, { userId: null, archived: true })
})
