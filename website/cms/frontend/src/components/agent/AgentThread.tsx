import React, { useEffect } from 'react'
import {
  ThreadPrimitive,
  ComposerPrimitive,
  useAuiState,
} from '@assistant-ui/react'
import { UserMessage } from './UserMessage.js'
import { AssistantMessage } from './AssistantMessage.js'
import { RecentConversations } from './RecentConversations.js'
import { LoadedMessages } from './LoadedMessages.js'
import { PermissionRequest } from './PermissionRequest.js'
import { useAutoScroll } from '../../hooks/useAutoScroll.js'
import { usePendingPermission } from '../../hooks/usePendingPermission.js'
import type { Conversation } from '../../api.js'

interface Props {
  loadedMessages: any[] | null
  conversations: Conversation[]
  onSelectConversation: (id: string) => void
}

export function AgentThread({
  loadedMessages,
  conversations,
  onSelectConversation,
}: Props) {
  const {
    ref: scrollRef,
    onScroll,
    scrollToBottom,
  } = useAutoScroll<HTMLDivElement>()
  const isRunning = useAuiState((s) => s.thread.isRunning)
  const { permission, clear: clearPermission } = usePendingPermission(isRunning)

  useEffect(() => {
    scrollToBottom()
  }, [loadedMessages, scrollToBottom])

  useEffect(() => {
    if (permission) scrollToBottom()
  }, [permission, scrollToBottom])

  const hasHistory = loadedMessages && loadedMessages.length > 0

  return (
    <ThreadPrimitive.Root className="flex flex-col flex-1 overflow-hidden">
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="flex-1 overflow-y-auto p-3"
      >
        {hasHistory ? (
          <LoadedMessages messages={loadedMessages} />
        ) : (
          <ThreadPrimitive.Empty>
            <RecentConversations
              conversations={conversations}
              onSelect={onSelectConversation}
            />
          </ThreadPrimitive.Empty>
        )}
        <ThreadPrimitive.Messages
          components={{
            UserMessage,
            AssistantMessage,
          }}
        />
        {permission && (
          <PermissionRequest
            permission={permission}
            onResolved={clearPermission}
          />
        )}
        <div className="h-2" />
      </div>
      <AgentComposer />
    </ThreadPrimitive.Root>
  )
}

function AgentComposer() {
  return (
    <ComposerPrimitive.Root className="p-3 border-t border-border flex gap-2">
      <ComposerPrimitive.Input
        placeholder={'Ask Claude...\nEnter to send, Shift+Enter for new line'}
        className="flex-1 p-2 border border-border rounded-md resize-none outline-none text-sm font-[inherit] bg-white min-h-[60px] max-h-[120px]"
        rows={3}
        autoFocus
      />
    </ComposerPrimitive.Root>
  )
}
