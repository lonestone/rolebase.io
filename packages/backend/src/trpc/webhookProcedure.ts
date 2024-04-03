import { guardWebhookSecret } from 'src/guards/guardWebhookSecret'
import { publicProcedure } from '.'

export const webhookProcedure = publicProcedure.use((opts) => {
  guardWebhookSecret(opts.ctx)
  return opts.next()
})
