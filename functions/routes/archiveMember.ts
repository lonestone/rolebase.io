import { Member_Role_Enum } from '@gql'
import { getMemberById } from '@utils/getMemberById'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { guardOrgOwnership } from '@utils/guardOrgOwnership'
import { route, RouteError } from '@utils/route'
import { updateMember } from '@utils/updateMember'
import { updateOrgSubscriptionAfterArchive } from '@utils/updateOrgSubscriptionAfterArchive'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  memberId: yup.string().required(),
  issuerMemberId: yup.string().required(),
})

export default route(async (context): Promise<void> => {
  guardAuth(context)
  const { memberId, issuerMemberId } = guardBodyParams(context, yupSchema)

  // Get member
  const member = await getMemberById(memberId)
  const issuerMember = await getMemberById(issuerMemberId)

  if (!member || !issuerMember) {
    throw new RouteError(400, 'Member does not exist')
  }

  await guardOrg(context, member.orgId, Member_Role_Enum.Admin)

  if (
    member.role === Member_Role_Enum.Owner &&
    issuerMember.role !== Member_Role_Enum.Owner
  ) {
    throw new RouteError(403, 'Insufficient permissions')
  }

  if (member.role === Member_Role_Enum.Owner) {
    // Ensures at least one owner of the org will remain active
    await guardOrgOwnership(context, member.orgId)
  }

  if (member.userId) {
    await updateOrgSubscriptionAfterArchive(context, member.orgId)
  }

  return updateMember(memberId, { archived: true })
})
