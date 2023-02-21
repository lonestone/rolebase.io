import { NotificationCategories } from '@shared/model/notification'
import { resources } from '@i18n'
import { Novu, TriggerRecipientsPayload } from '@novu/node'
import settings from '@utils/settings'

export abstract class Notification<
  T extends NotificationCategories,
  Payload extends Record<string, any>
> {
  // Novu config
  private readonly novu = new Novu(settings.novu.apiKey)

  constructor(
    // Notification category (comes from Novu notification identifier which can be found in the admin panel)
    private readonly category: T,
    protected readonly locale: keyof typeof resources
  ) {}

  // Get notification payload
  abstract get payload(): Payload

  // Send notification
  async send(to: TriggerRecipientsPayload) {
    await this.novu
      .trigger(this.category, {
        to,
        payload: {
          ...this.payload,
        },
      })
      .catch((err) => console.error(err))
  }
}
