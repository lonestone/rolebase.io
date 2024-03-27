import { roleSchema } from '@rolebase/shared/schemas'
import { TRPCError } from '@trpc/server'
import * as yup from 'yup'
import { Member_Role_Enum } from '../../gql'
import { guardMultipleOwnersOrg } from '../../guards/guardMultipleOwnersOrg'
import { guardOrg } from '../../guards/guardOrg'
import { authedProcedure } from '../../trpc/authedProcedure'
import { getMemberById } from './utils/getMemberById'
import { updateMember } from './utils/updateMember'

export default authedProcedure
  .input(
    yup.object().shape({
      memberId: yup.string().required(),
      role: roleSchema,
    })
  )
  .mutation(async (opts): Promise<void> => {
    const { memberId, role } = opts.input

    // Get member
    const memberToUpdate = await getMemberById(memberId)

    await guardOrg(
      memberToUpdate.orgId,
      memberToUpdate.role === Member_Role_Enum.Owner
        ? Member_Role_Enum.Owner
        : Member_Role_Enum.Admin,
      opts.ctx
    )

    if (memberToUpdate.role === Member_Role_Enum.Owner) {
      // Ensures at least one other owner of the org will remain active
      await guardMultipleOwnersOrg(opts.ctx, memberToUpdate.orgId)
    }

    if (!memberToUpdate.role) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Member is not invited',
      })
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
      await updateMember(memberId, { role: role as Member_Role_Enum })
    } else {
      throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid role' })
    }
  })
