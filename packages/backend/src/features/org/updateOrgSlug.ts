import { slugSchema } from '@rolebase/shared/schemas'
import { TRPCError } from '@trpc/server'
import * as yup from 'yup'
import { gql, Member_Role_Enum } from '../../gql'
import { guardOrg } from '../../guards/guardOrg'
import settings from '../../settings'
import { authedProcedure } from '../../trpc/authedProcedure'
import { adminRequest } from '../../utils/adminRequest'

export default authedProcedure
  .input(
    yup.object().shape({
      orgId: yup.string().required(),
      slug: slugSchema.required(),
    })
  )
  .mutation(async (opts): Promise<void> => {
    const { orgId, slug } = opts.input

    await guardOrg(orgId, Member_Role_Enum.Admin, opts.ctx)

    // Check forbidden slugs
    if (settings.forbiddenSlugs.includes(slug)) {
      throw new TRPCError({ code: 'CONFLICT', message: 'Conflict' })
    }

    try {
      // Update slug
      // Unique key ensure there is no conflict
      await adminRequest(UPDATE_ORG_SLUG, { id: orgId, slug })
    } catch (error) {
      throw new TRPCError({ code: 'CONFLICT', message: 'Conflict' })
    }
  })

const UPDATE_ORG_SLUG = gql(`
  mutation updateOrgSlug($id: uuid!, $slug: String!) {
    update_org_by_pk(pk_columns: { id: $id }, _set: { slug: $slug }) {
      id
    }
  }`)
