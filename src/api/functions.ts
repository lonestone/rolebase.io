import {
  Member_Role_Enum,
  RoleAiFragment,
  Subscription_Plan_Type_Enum,
} from '@gql'
import { AlgoliaConfig } from '@shared/model/search'
import {
  CustomerBillingDetails,
  Invoice,
  PricePreview,
  PromotionCode,
  Subscription,
  SubscriptionIntentResponse,
} from '@shared/model/subscription'
import { nhost } from 'src/nhost'
import settings from 'src/settings'
import Stripe from 'stripe'

export const createOrg = fn<{ name: string; slug: string }, string>(
  'orgs/createOrg'
)

export const updateOrgSlug = fn<{ orgId: string; slug: string }>(
  'orgs/updateOrgSlug'
)

export const inviteMember = fn<{
  memberId: string
  role: Member_Role_Enum
  email: string
}>('members/inviteMember')

export const acceptMemberInvitation = fn<{
  memberId: string
  token: string
}>('members/acceptMemberInvitation')

export const updateMemberRole = fn<{
  memberId: string
  role?: Member_Role_Enum
}>('members/updateMemberRole')

export const getAlgoliaConfig = fn<{ orgId: string }, AlgoliaConfig>(
  'getAlgoliaConfig'
)

export const searchReindexAll = fn('searchReindexAll')

export const getMeetingsToken = fn<{ orgId: string }, string>(
  'meetings/getMeetingsToken'
)

export const sendMeetingStartedNotification = fn<{
  meetingId: string
  recipientMemberIds: string[]
}>('meetings/sendMeetingStartedNotification')

export const startMembersMeeting = fn<{
  membersIds: string[]
  meetingId: string
}>('members/startMembersMeeting')

export const stopMembersMeeting = fn<{ meetingId: string }>(
  'members/stopMembersMeeting'
)

export const subscribeOrg = fn<
  {
    orgId: string
    planType: Subscription_Plan_Type_Enum
    address: Stripe.Address | null
    promotionCode?: string
  },
  SubscriptionIntentResponse
>('subscriptions/subscribeOrg')

export const unsubscribeOrg = fn<
  {
    orgId: string
  },
  { cancelAt: string }
>('subscriptions/unsubscribeOrg')

export const getSubscriptionInvoices = fn<
  {
    orgId: string
  },
  Invoice[]
>('subscriptions/getSubscriptionInvoices')

export const getSubscription = fn<
  {
    orgId: string
  },
  Subscription
>('subscriptions/getSubscription')

export const updateSubscriptionBillingEmail = fn<
  {
    orgId: string
    email: string
  },
  string
>('subscriptions/updateSubscriptionBillingEmail')

export const updateSubscriptionBillingDetails = fn<
  {
    orgId: string
    billingDetails: CustomerBillingDetails
  },
  string
>('subscriptions/updateSubscriptionBillingDetails')

export const updateSubscriptionPaymentMethodIntent = fn<
  {
    orgId: string
  },
  { clientSecret: string }
>('subscriptions/updateSubscriptionPaymentMethodIntent')

export const resumeSubscription = fn<{
  orgId: string
}>('subscriptions/resumeSubscription')

export const archiveOrg = fn<{
  orgId: string
}>('orgs/archiveOrg')

export const retrieveCouponToSubscription = fn<
  {
    orgId: string
    promotionCode: string
  },
  PromotionCode
>('subscriptions/retrieveCouponToSubscription')

export const getPricePreview = fn<
  {
    orgId: string
    promotionCode?: string
    address: Stripe.Address | null
    planType: Subscription_Plan_Type_Enum
  },
  PricePreview
>('subscriptions/getPricePreview')

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

export const archiveMember = fn<{ memberId: string }>('members/archiveMember')

export const replaceOldIds = fn<{ text: string }, string>('replaceOldIds')

export const importOrg = fn<{ provider: string; fileId: string }, string>(
  'orgs/importOrg'
)

// Generate properties for a role with AI
export const generateRole = fn<{ name: string; lang: string }, RoleAiFragment>(
  'generateRole'
)

// Generate a meeting summary with AI
export const generateMeetingSummary = fn<
  { meetingId: string; lang: string },
  string
>('meetings/generateMeetingSummary')

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
