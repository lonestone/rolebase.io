import { loadAppById } from '..'
import { RestError, route } from '../../../rest/route'
import GoogleCalendarApp from './GoogleCalendarApp'

export default route(async (context) => {
  try {
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
      throw new RestError(400, 'Invalid headers')
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
  } catch (error) {
    // console.error(error)
    // captureError(error)
  }

  return 'OK'
})
