import { FunctionContext } from "@utils/getContext"
import { RouteError } from "@utils/route"


export function guardWebhookSecret(context: FunctionContext) {
  const { headers } = context.req

  const nhostWebhookSecretFromHeader = headers['x-nhost-webhook-secret']
  const nhostWebhookSecret = process.env.NHOST_WEBHOOK_SECRET

  if (nhostWebhookSecretFromHeader !== nhostWebhookSecret) {
    throw new RouteError(401, 'Unauthorized')
  }
}
