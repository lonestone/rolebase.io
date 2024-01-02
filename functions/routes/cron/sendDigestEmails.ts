import sendDigestEmail from '@emails/sendDigestEmail'
import { OrgDigest } from '@emails/templates/Digest'
import { ThreadActivityFragment, ThreadFragment, gql } from '@gql'
import settings from '@settings'
import { defaultCircleColorHue } from '@shared/helpers/circleColor'
import { getOrgPath } from '@shared/helpers/getOrgPath'
import { getDateFromUTCDate } from '@shared/helpers/rrule'
import { getDefaultDigestRRule } from '@shared/model/notifications'
import { UserMetadata } from '@shared/model/user'
import { adminRequest } from '@utils/adminRequest'
import { guardWebhookSecret } from '@utils/guardWebhookSecret'
import { route } from '@utils/route'
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

  const timezone = result.user?.metadata.timezone || settings.defaultTimezone
  const orgDigests: OrgDigest[] = []

  for (const member of result.member) {
    const org = member.org
    const orgUrl = `${settings.url}${getOrgPath(org)}`

    // Threads
    const threads = org.threads.sort(sortThreads)

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
    timezone,
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
    user(id: $userId) {
      metadata
    }
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

        # Threads to include in the digest
        threads(
          where: {
            _and: [
              {
                _or: [
                  # New threads
                  { createdAt: { _gt: $date } }
                  # New activities in threads
                  { activities: { createdAt: { _gt: $date } } }
                ]
              }
              {
                _or: [
                  {
                    circle: { participants: { member: { id: { _eq: $userId } } } }
                  }
                  { extra_members: { member: { id: { _eq: $userId } } } }
                ]
              }
              { archived: { _eq: false } }
            ]
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
          where: {
            endDate: { _gt: $date }
            ended: { _eq: true }
            _or: [
              { private: { _eq: false } }
              { circle: { participants: { member: { id: { _eq: $userId } } } } }
              { meeting_attendees: { member: { id: { _eq: $userId } } } }
            ]
            archived: { _eq: false }
          }
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
