import { ThreadActivityFragment, ThreadFragment, gql } from '@gql'
import { defaultCircleColorHue } from '@shared/helpers/circleColor'
import filterEntities from '@shared/helpers/filterEntities'
import { fixCirclesHue } from '@shared/helpers/fixCirclesHue'
import { getOrgPath } from '@shared/helpers/getOrgPath'
import { getParticipantCircles } from '@shared/helpers/getParticipantCircles'
import { getDateFromUTCDate } from '@shared/helpers/rrule'
import { getDefaultDigestRRule } from '@shared/model/notifications'
import {
  EntityFilters,
  EntityWithParticipants,
} from '@shared/model/participants'
import { UserMetadata } from '@shared/model/user'
import { adminRequest } from '@utils/adminRequest'
import { guardWebhookSecret } from '@utils/guardWebhookSecret'
import { route } from '@utils/route'
import sendDigestEmail from '@utils/sendDigestEmail'
import settings from '@utils/settings'
import { OrgDigest } from '_emails/Digest'
import { RRule } from 'rrule'

export default route(async (context): Promise<void> => {
  guardWebhookSecret(context)

  const { users } = await adminRequest(GET_USERS)

  for (const user of users) {
    if (!user.email) continue
    if (!user.metadata) {
      console.error(`User ${user.id} has no metadata`)
      continue
    }

    const nowDate = new Date()

    // Get config and state from metadata
    const metadata: UserMetadata = user.metadata
    const { digestRrule, digestLastDate } = metadata

    // Digest is disabled
    if (digestRrule === false) continue

    const rrule = digestRrule
      ? RRule.fromString(digestRrule)
      : getDefaultDigestRRule(user.createdAt)

    // Previous planned occurrence
    const occurrenceDateUTC = rrule.before(nowDate)
    if (!occurrenceDateUTC) continue
    const occurrenceDate = getDateFromUTCDate(occurrenceDateUTC)

    // Last sent digest date
    const lastDate = digestLastDate ? new Date(digestLastDate) : occurrenceDate

    // Skip if not due yet
    if (occurrenceDate < lastDate) {
      continue
    }

    try {
      await sendDigest(
        user.id,
        user.displayName,
        user.email,
        user.locale,
        lastDate
      )

      // Save next digest date as last date
      await adminRequest(UPDATE_USER_METADATA, {
        userId: user.id,
        metadata: { ...metadata, digestLastDate: nowDate.toISOString() },
      })
    } catch (e) {
      console.error(`Error sending digest to user ${user.id}:`, e)
    }
  }
})

const GET_USERS = gql(`
  query getUsersForDigest {
    users(where: { disabled: { _eq: false }}) {
      id
      createdAt
      displayName
      email
      locale
      metadata
    }
  }
`)

const UPDATE_USER_METADATA = gql(`
  mutation updateUserMetadata($userId: uuid!, $metadata: jsonb!) {
    updateUser(pk_columns: { id: $userId }, _set: { metadata: $metadata }) {
      id
    }
  }
`)

// Send a digest to a user
async function sendDigest(
  userId: string,
  userName: string,
  userEmail: string,
  lang: string,
  date: Date
) {
  const result = await adminRequest(GET_USER_DIGEST_DATA, {
    userId,
    date: date.toISOString(),
  })

  const orgDigests: OrgDigest[] = []

  for (const member of result.member) {
    const org = member.org
    const circles = fixCirclesHue(org.circles)
    const orgUrl = `${settings.url}${getOrgPath(org)}`

    // Get circles where the member is participating
    const participantCircles = getParticipantCircles(member.id, circles).map(
      (c) => c.id
    )

    // Filter entities where the member is participating
    const filterParticipating = <T extends EntityWithParticipants>(
      entities: T[]
    ) =>
      filterEntities(
        EntityFilters.Invited,
        entities,
        undefined,
        member.id,
        participantCircles
      )

    // Threads
    const threads = filterParticipating(org.threads).sort(sortThreads)

    // Meetings
    const meetings = org.meetings

    if (threads.length === 0 && meetings.length === 0) {
      continue
    }

    orgDigests.push({
      name: org.name,

      // Threads
      threads: threads.map((thread) => ({
        title: thread.title,
        url: `${orgUrl}/threads/${thread.id}`,
        activities: thread.activities.length,
        circle: {
          name: thread.circle.role.name,
          colorHue: thread.circle.role.colorHue || defaultCircleColorHue,
          url: `${orgUrl}/roles?circleId=${thread.circle.id}`,
        },
      })),

      // Meetings
      meetings: meetings.map((meeting) => ({
        title: meeting.title,
        url: `${orgUrl}/meetings/${meeting.id}`,
        date: meeting.endDate,
        circle: {
          name: meeting.circle.role.name,
          colorHue: meeting.circle.role.colorHue || defaultCircleColorHue,
          url: `${orgUrl}/roles?circleId=${meeting.circle.id}`,
        },
      })),
    })
  }

  // Empty -> no digest sent
  if (orgDigests.length === 0) return

  await sendDigestEmail({
    recipient: {
      Email: userEmail,
      Name: userName,
    },
    lang,
    orgDigests,
  })
}

type ThreadWithActivities = ThreadFragment & {
  activities: ThreadActivityFragment[]
}

function sortThreads(
  threadA: ThreadWithActivities,
  threadB: ThreadWithActivities
) {
  const aDate = getThreadLastDate(threadA)
  const bDate = getThreadLastDate(threadB)
  return aDate > bDate ? -1 : 1
}

function getThreadLastDate(thread: ThreadWithActivities) {
  if (thread.activities.length === 0) return thread.createdAt
  return thread.activities.reduce(
    (last, activity) => (activity.createdAt > last ? activity.createdAt : last),
    thread.activities[0].createdAt
  )
}

const GET_USER_DIGEST_DATA = gql(`
  query getUserDigestData($userId: uuid!, $date: timestamptz!) {
    member(
      where: {
        userId: { _eq: $userId }
        archived: { _eq: false }
        org: { archived: { _eq: false } }
      }
    ) {
      id
      org {
        ...Org

        # Circles to compute participations
        circles(where: { archived: { _eq: false } }) {
          ...CircleFull
        }

        # Threads to include in the digest
        threads(
          where: {
            _or: [
              # New threads
              { createdAt: { _gt: $date } }
              # New activities in threads
              { activities: { createdAt: { _gt: $date } } }
            ]
            archived: { _eq: false }
          }
        ) {
          ...Thread
          circle {
            id
            role {
              name
              colorHue
            }
          }
          activities(where: { createdAt: { _gt: $date } }) {
            ...ThreadActivity
          }
        }

        # Meetings to include in the digest
        meetings(
          where: { endDate: { _gt: $date }, archived: { _eq: false } }
          order_by: { endDate: desc }
        ) {
          ...MeetingSummary
          circle {
            id
            role {
              name
              colorHue
            }
          }
        }
      }
    }
  }
`)
