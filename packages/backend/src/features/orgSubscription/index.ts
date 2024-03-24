import { registerRestRoutes } from '../../rest/registerRestRoutes'
import { router } from '../../trpc'
import getPricePreview from './getPricePreview'
import getSubscription from './getSubscription'
import getSubscriptionInvoices from './getSubscriptionInvoices'
import getSubscriptionUpcomingInvoice from './getSubscriptionUpcomingInvoice'
import resumeSubscription from './resumeSubscription'
import retrieveCouponToSubscription from './retrieveCouponToSubscription'
import stripeWebhook from './stripeWebhook'
import subscribeOrg from './subscribeOrg'
import unsubscribeOrg from './unsubscribeOrg'
import updateSubscriptionBillingDetails from './updateSubscriptionBillingDetails'
import updateSubscriptionBillingEmail from './updateSubscriptionBillingEmail'
import updateSubscriptionPaymentMethodIntent from './updateSubscriptionPaymentMethodIntent'

export default router({
  getPricePreview,
  getSubscription,
  getSubscriptionInvoices,
  getSubscriptionUpcomingInvoice,
  resumeSubscription,
  retrieveCouponToSubscription,
  subscribeOrg,
  unsubscribeOrg,
  updateSubscriptionBillingDetails,
  updateSubscriptionBillingEmail,
  updateSubscriptionPaymentMethodIntent,
})

registerRestRoutes(stripeWebhook)
