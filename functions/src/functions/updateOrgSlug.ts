import { ClaimRole } from '@shared/model/userClaims'
import * as functions from 'firebase-functions'
import { collections } from '../firebase'
import { guardArgument, guardAuth, guardOrg } from '../helpers/guards'
import settings from '../settings'
import { getQuerySnapshotData } from '../utils'

interface Payload {
  id: string
  slug: string
}

// Update slug of an org
export const updateOrgSlug = functions.https.onCall(
  async (data: Payload, context) => {
    guardArgument(data, 'id')
    guardArgument(data, 'slug')
    guardAuth(context)
    await guardOrg(context, data.id, ClaimRole.Admin)

    // Check forbidden slugs
    if (settings.forbiddenSlugs.includes(data.slug)) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'Slug not allowed'
      )
    }

    // Check if there is an org that is already using this slug
    const existingOrg = getQuerySnapshotData(
      await collections.orgs.where('slug', '==', data.slug).limit(1).get()
    )
    if (existingOrg[0]) {
      throw new functions.https.HttpsError(
        'already-exists',
        'Org with this slug already exists'
      )
    }

    // Update org with slug
    collections.orgs.doc(data.id).update({
      slug: data.slug,
    })
  }
)
