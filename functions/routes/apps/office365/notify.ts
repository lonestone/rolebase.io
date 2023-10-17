import { ChangeNotification } from '@microsoft/microsoft-graph-types-beta'
import { RouteError, route } from '@utils/route'
import { loadAppById } from '..'

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

      // Lifecycle notification
      if (lifecycleEvent === 'missed') {
        // Reset subscription and stop here
        await app.onSubscriptionMissed(subscriptionId)
        throw new Error()
      } else if (lifecycleEvent === 'reauthorizationRequired') {
        await app.onSubscriptionReauthorizationRequired(subscriptionId)
      } else if (lifecycleEvent === 'subscriptionRemoved') {
        // Reset subscription and stop here
        await app.onSubscriptionRemoved(subscriptionId)
        throw new Error()
      }

      // Event notification
      if (subscriptionId && changeType && resourceData) {
        const { id, '@odata.type': type } = resourceData as any

        if (type !== '#Microsoft.Graph.Event') {
          throw new Error('Invalid resourceData type')
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
