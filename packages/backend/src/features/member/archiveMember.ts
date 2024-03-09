import { TRPCError } from '@trpc/server'
import * as yup from 'yup'
import { Member_Role_Enum } from '../../gql'
import { guardMultipleOwnersOrg } from '../../guards/guardMultipleOwnersOrg'
import { guardOrg } from '../../guards/guardOrg'
import { authedProcedure } from '../../trpc/authedProcedure'
import { updateOrgSubscriptionAfterArchive } from '../orgSubscription/utils/updateOrgSubscriptionAfterArchive'
import { getMemberById } from './utils/getMemberById'
import { updateMember } from './utils/updateMember'

export default authedProcedure
  .input(
    yup.object().shape({
      memberId: yup.string().required(),
    })
  )
  .mutation(async (opts): Promise<void> => {
    const { memberId } = opts.input

    // Get member
    const memberToArchive = await getMemberById(memberId)

    if (!memberToArchive) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Member does not exist',
      })
    }

    await guardOrg(
      memberToArchive.orgId,
      memberToArchive.role === Member_Role_Enum.Owner
        ? Member_Role_Enum.Owner
        : Member_Role_Enum.Admin,
      opts.ctx
    )

    if (!memberToArchive) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Member does not exist',
      })
    }

    if (memberToArchive.role === Member_Role_Enum.Owner) {
      // Ensures at least one owner of the org will remain active
      await guardMultipleOwnersOrg(opts.ctx, memberToArchive.orgId)
    }

    if (memberToArchive.userId) {
      await updateOrgSubscriptionAfterArchive(opts.ctx, memberToArchive.orgId)
    }

    return updateMember(memberId, {
      userId: null,
      archived: true,
      inviteDate: null,
      inviteEmail: null,
    })
  })
