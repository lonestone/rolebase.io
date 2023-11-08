import { Crisp } from 'crisp-sdk-web'
import settings from 'src/settings'

export function configureCrisp() {
  Crisp.configure(settings.crisp.websiteId, {
    // safeMode: true
  })

  // Hide icon and chat by default
  Crisp.chat.hide()

  // Hide icon when chat is closed
  Crisp.chat.onChatClosed(() => Crisp.chat.hide())

  // Show chat when a message is received
  Crisp.message.onMessageReceived(() => Crisp.chat.show())
}
