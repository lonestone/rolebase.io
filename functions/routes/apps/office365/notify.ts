import { ChangeNotification } from '@microsoft/microsoft-graph-types-beta'
import { RouteError, route } from '@utils/route'
import { loadAppById } from '..'
import Office365App from './_Office365App'

export default route(async (context) => {
  // Validate request on subscription creation
  if (context.req.query?.validationToken) {
    return context.req.query.validationToken
  }

  const notifications = context.req.body?.value as ChangeNotification[]
  if (!Array.isArray(notifications)) {
    throw new RouteError(
      400,
      `body.value is not an array. body=${JSON.stringify(context.req.body)}`
    )
  }

  for (const notification of notifications) {
    try {
      const {
        subscriptionId,
        clientState: userAppId,
        changeType,
        resourceData,
        lifecycleEvent,
      } = notification

      if (!userAppId) {
        throw new Error('Missing clientState (userAppId)')
      }
      if (!subscriptionId) {
        throw new Error('Missing subscriptionId')
      }

      // Load user app
      const app = await loadAppById(userAppId)
      if (!(app instanceof Office365App)) {
        return
      }

      // Lifecycle notification
      if (lifecycleEvent === 'missed') {
        // Reset subscription and stop here
        await app.onSubscriptionMissed(subscriptionId)
        break
      } else if (lifecycleEvent === 'reauthorizationRequired') {
        await app.onSubscriptionReauthorizationRequired(subscriptionId)
      } else if (lifecycleEvent === 'subscriptionRemoved') {
        // Reset subscription and stop here
        await app.onSubscriptionRemoved(subscriptionId)
        break
      } else if (subscriptionId && changeType && resourceData) {
        // Event notification
        const { id, '@odata.type': type } = resourceData as any

        if (type !== '#Microsoft.Graph.Event') {
          continue
        }

        if (changeType === 'created') {
          await app.onEventCreated(id, subscriptionId)
        } else if (changeType === 'updated') {
          await app.onEventUpdated(id, subscriptionId)
        } else if (changeType === 'deleted') {
          await app.onEventDeleted(id, subscriptionId)
        } else {
          throw new Error(`Invalid changeType "${changeType}"`)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  // Should always return 202 to avoid retry
  throw new RouteError(202, 'Accepted')
})
