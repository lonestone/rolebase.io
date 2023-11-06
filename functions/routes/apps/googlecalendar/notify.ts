import { RouteError, route } from '@utils/route'
import { loadAppById } from '..'
import GoogleCalendarApp from './_GoogleCalendarApp'

export default route(async (context) => {
  // Get params from headers
  const subscriptionState = context.req.headers['x-goog-resource-state']
  const userAppId = context.req.headers['x-goog-channel-token']
  const subscriptionId = context.req.headers['x-goog-channel-id']
  const expiryDate = context.req.headers['x-goog-channel-expiration']

  // Validate params
  if (
    typeof subscriptionState !== 'string' ||
    typeof userAppId !== 'string' ||
    typeof subscriptionId !== 'string' ||
    typeof expiryDate !== 'string'
  ) {
    throw new RouteError(400, 'Invalid headers')
  }

  // Subscription first notification
  if (subscriptionState === 'sync') {
    return 'sync'
  }

  if (subscriptionState !== 'exists') {
    return
  }

  // Load user app
  const app = await loadAppById(userAppId)
  if (!(app instanceof GoogleCalendarApp)) {
    return
  }

  // Handle notification
  await app.onSubscriptionNotification(subscriptionId, expiryDate)

  return 'OK'
})
