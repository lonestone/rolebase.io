import { NotificationCategories } from '@shared/model/notification'
import { resources } from '@i18n'
import { Novu, TriggerRecipientsPayload } from '@novu/node'
import settings from '@utils/settings'
import { OrgFragment } from '@gql'
import { getOrgPath } from '@shared/helpers/getOrgPath'

const mappingActionUrl = new Map([
  [NotificationCategories.meetingstarted, 'meetings'],
  [NotificationCategories.meetinginvited, 'meetings'],
  [NotificationCategories.taskassigned, 'tasks'],
  [NotificationCategories.thread, 'threads'],
  [NotificationCategories.threadActivity, 'threads'],
])

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

  // Get actionUrl
  getActionUrl(
    category: NotificationCategories,
    orgId: string,
    org?: OrgFragment,
    id?: string
  ): string {
    return `${settings.url}${
      org ? getOrgPath(org) : `/orgs/${orgId}`
    }/${mappingActionUrl.get(category)}/${id}`
  }

  // Send notification
  async send(to: TriggerRecipientsPayload) {
    await this.novu
      .trigger(this.category, {
        to,
        payload: {
          ...this.payload,
        },
        overrides: {
          fcm: {
            // Current workaround to not have duplicate push notification
            // TODO : refacto when version 0.14.x (some changes on overrides and FCM integration coming)
            type: 'data',
          },
        },
      })
      .catch((err) => console.error(err))
  }
}
