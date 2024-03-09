import { TRPCError } from '@trpc/server'
import settings from '../settings'
import { Context } from '../trpc/context'

export function guardWebhookSecret(context: Context) {
  const { headers } = context.req

  const nhostWebhookSecretFromHeader = headers['x-nhost-webhook-secret']
  const nhostWebhookSecret = settings.webhookSecret

  if (nhostWebhookSecretFromHeader !== nhostWebhookSecret) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Invalid webhook secret',
    })
  }
}
