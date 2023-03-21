import { Member_Role_Enum, Subscription_Plan_Type_Enum } from '@gql'
import {
  MeetingStartedNotificationBodyParams,
  NovuConfig,
} from '@shared/model/notification'
import { AlgoliaConfig } from '@shared/model/search'
import {
  CustomerBillingDetails,
  Invoice,
  PromotionCode,
  Subscription,
  SubscriptionIntentResponse,
} from '@shared/model/subscription'
import { nhost } from 'src/nhost'
import settings from 'src/settings'

export const createOrg = fn<{ name: string }, string>('createOrg')

export const updateOrgSlug = fn<{ orgId: string; slug: string }>(
  'updateOrgSlug'
)

export const inviteMember = fn<{
  memberId: string
  role: Member_Role_Enum
  email: string
}>('inviteMember')

export const acceptMemberInvitation = fn<{
  memberId: string
  token: string
}>('acceptMemberInvitation')

export const updateMemberRole = fn<{
  memberId: string
  role?: Member_Role_Enum
}>('updateMemberRole')

export const getAlgoliaConfig = fn<{ orgId: string }, AlgoliaConfig>(
  'getAlgoliaConfig'
)

export const searchReindexAll = fn('searchReindexAll')

export const getNovuConfig = fn<{}, NovuConfig>('getNovuConfig')

export const getMeetingsToken = fn<{ orgId: string }, string>(
  'getMeetingsToken'
)

export const sendMeetingStartedNotification =
  fn<MeetingStartedNotificationBodyParams>('sendMeetingStartedNotification')

export const startMembersMeeting = fn<{
  membersIds: string[]
  meetingId: string
}>('startMembersMeeting')

export const stopMembersMeeting = fn<{ meetingId: string }>(
  'stopMembersMeeting'
)

export const subscribeOrg = fn<
  {
    orgId: string
    planType: Subscription_Plan_Type_Enum
    address: CustomerBillingDetails
    promotionCode?: string
  },
  SubscriptionIntentResponse
>('subscribeOrg')

export const unsubscribeOrg = fn<
  {
    orgId: string
  },
  { cancelAt: string }
>('unsubscribeOrg')

export const getSubscriptionInvoices = fn<
  {
    orgId: string
  },
  Invoice[]
>('getSubscriptionInvoices')

export const getSubscription = fn<
  {
    orgId: string
  },
  Subscription
>('getSubscription')

export const updateSubscriptionBillingEmail = fn<
  {
    orgId: string
    email: string
  },
  string
>('updateSubscriptionBillingEmail')

export const updateSubscriptionBillingDetails = fn<
  {
    orgId: string
    billingDetails: CustomerBillingDetails
  },
  string
>('updateSubscriptionBillingDetails')

export const updateSubscriptionPaymentMethodIntent = fn<
  {
    orgId: string
  },
  { clientSecret: string }
>('updateSubscriptionPaymentMethodIntent')

export const resumeSubscription = fn<{
  orgId: string
}>('resumeSubscription')

export const archiveOrg = fn<{
  orgId: string
}>('archiveOrg')

export const retrieveCouponToSubscription = fn<
  {
    orgId: string
    promotionCode: string
  },
  PromotionCode
>('retrieveCouponToSubscription')

export const getPricePreview = fn<
  {
    orgId: string
    promotionCode?: string
    address: {
      city: string
      country: string
      line1: string
      line2?: string
      postal_code: string
      state?: string
    }
    planType: Subscription_Plan_Type_Enum
  },
  PromotionCode
>('getPricePreview')

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

export const archiveMember = fn<{ memberId: string }>('archiveMember')

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
