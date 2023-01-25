import { Member_Role_Enum } from '@gql'
import {
  MagicbellConfig,
  NotificationCategories,
} from '@shared/model/notification'
import { AlgoliaConfig } from '@shared/model/search'
import { nhost } from 'src/nhost'
import settings from 'src/settings'

export const createOrg = fn<{ name: string }, string>('createOrg')

export const updateOrgSlug =
  fn<{ orgId: string; slug: string }>('updateOrgSlug')

export const inviteMember =
  fn<{ memberId: string; role: Member_Role_Enum; email: string }>(
    'inviteMember'
  )

export const acceptMemberInvitation = fn<{
  memberId: string
  token: string
}>('acceptMemberInvitation')

export const updateMemberRole =
  fn<{ memberId: string; issuerMemberId: string; role?: Member_Role_Enum }>(
    'updateMemberRole'
  )

export const getAlgoliaConfig = fn<{ orgId: string }, AlgoliaConfig>(
  'getAlgoliaConfig'
)

export const searchReindexAll = fn('searchReindexAll')

export const getMagicbellConfig = fn<{}, MagicbellConfig>('getMagicbellConfig')

export const getMeetingsToken = fn<{ orgId: string }, string>(
  'getMeetingsToken'
)

export const sendNotification = fn<{
  category: NotificationCategories
  recipientMemberIds: string[]
  title: string
  content: string
  url?: string
  topic?: string
}>('sendNotification')

export const startMembersMeeting = fn<{
  membersIds: string[]
  meetingId: string
}>('startMembersMeeting')

export const stopMembersMeeting =
  fn<{ meetingId: string }>('stopMembersMeeting')

export function getMeetingsIcalUrl(
  orgId: string | undefined,
  token: string,
  lang: string,
  memberId?: string,
  circleId?: string
): string {
  return `${
    settings.functionsUrl
  }routes/meetingsIcal?token=${token}&lang=${lang}&orgId=${orgId}${
    memberId ? `&memberId=${memberId}` : circleId ? `&circleId=${circleId}` : ''
  }`
}

export const archiveMember =
  fn<{ memberId: string; issuerMemberId: string }>('archiveMember')

export const replaceOldIds = fn<{ text: string }, string>('replaceOldIds')

// Helper to call a function
function fn<Params, Result = void>(route: string) {
  return async (params: Params): Promise<Result> => {
    const { error, res } = await nhost.functions.call<Result>(
      `routes/${route}`,
      params
    )
    if (error) throw error
    return res.data
  }
}
