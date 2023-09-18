import { Crisp } from 'crisp-sdk-web'

export function configureCrisp() {
  Crisp.configure('652544cd-14f6-4c8c-9a04-2a56676dd4a0', {
    // safeMode: true
  })

  // Hide icon and chat by default
  Crisp.chat.hide()

  // Hide icon when chat is closed
  Crisp.chat.onChatClosed(() => Crisp.chat.hide())

  // Show chat when a message is received
  Crisp.message.onMessageReceived(() => Crisp.chat.show())
}
