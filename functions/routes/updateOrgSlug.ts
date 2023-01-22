import { gql, Member_Role_Enum } from '@gql'
import { slugSchema } from '@shared/schemas'
import { adminRequest } from '@utils/adminRequest'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { route, RouteError } from '@utils/route'
import settings from '@utils/settings'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  orgId: yup.string().required(),
  slug: slugSchema.required(),
})

export default route(async (context): Promise<void> => {
  const { orgId, slug } = guardBodyParams(context, yupSchema)

  guardAuth(context)
  await guardOrg(context, orgId, Member_Role_Enum.Admin)

  // Check forbidden slugs
  if (settings.forbiddenSlugs.includes(slug)) {
    throw new RouteError(409, 'Conflict')
  }

  try {
    // Update slug
    // Unique key ensure there is no conflict
    await adminRequest(UPDATE_ORG_SLUG, { id: orgId, slug })
  } catch (error) {
    throw new RouteError(409, 'Conflict')
  }
})

const UPDATE_ORG_SLUG = gql(`
  mutation updateOrgSlug($id: uuid!, $slug: String!) {
    update_org_by_pk(pk_columns: { id: $id }, _set: { slug: $slug }) {
      id
    }
  }`)
