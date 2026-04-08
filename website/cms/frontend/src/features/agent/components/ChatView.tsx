import React, { useMemo } from 'react'
import { AssistantRuntimeProvider } from '@assistant-ui/react'
import {
  useChatRuntime,
  AssistantChatTransport,
} from '@assistant-ui/react-ai-sdk'
import { AgentThread } from './AgentThread.js'
import type { Conversation } from '../../../api.js'

interface Props {
  sessionId: string | null
  loadedMessages: any[] | null
  conversations: Conversation[]
  onSelectConversation: (id: string) => void
}

export function ChatView({
  sessionId,
  loadedMessages,
  conversations,
  onSelectConversation,
}: Props) {
  const transport = useMemo(
    () =>
      new AssistantChatTransport({
        api: sessionId
          ? `/api/claude/chat?sessionId=${encodeURIComponent(sessionId)}`
          : '/api/claude/chat',
      }),
    [sessionId]
  )

  const runtime = useChatRuntime({ transport })

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <AgentThread
        loadedMessages={loadedMessages}
        conversations={conversations}
        onSelectConversation={onSelectConversation}
      />
    </AssistantRuntimeProvider>
  )
}
