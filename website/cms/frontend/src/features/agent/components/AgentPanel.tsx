import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useResizablePanel } from '../../common/hooks/useResizablePanel.js'
import { ResizeHandle } from '../../common/components/ResizeHandle.js'
import { ChatView } from './ChatView.js'
import { AgentAuthError } from './AgentAuthError.js'
import {
  fetchConversations,
  fetchConversationMessages,
  fetchClaudeStatus,
} from '../../../api.js'
import { RiAddLine } from 'react-icons/ri'

export function AgentPanel() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [loadedMessages, setLoadedMessages] = useState<any[] | null>(null)

  const {
    data: status,
    isLoading: statusLoading,
    refetch: refetchStatus,
  } = useQuery({
    queryKey: ['claude-status'],
    queryFn: () => fetchClaudeStatus(),
    retry: false,
    staleTime: 60_000,
  })

  const { data: conversations = [] } = useQuery({
    queryKey: ['conversations'],
    queryFn: () => fetchConversations(20),
    enabled: status?.authenticated === true,
  })

  const { width, handleMouseDown } = useResizablePanel({
    storageKey: 'cms-agent-panel-width',
    defaultWidth: 380,
    minWidth: 250,
    maxWidth: 800,
    side: 'left',
  })

  function handleNewConversation() {
    setSessionId(null)
    setLoadedMessages(null)
  }

  async function handleSelectConversation(id: string) {
    setSessionId(id)
    const messages = await fetchConversationMessages(id)
    setLoadedMessages(messages)
  }

  const isAuthenticated = status?.authenticated === true

  return (
    <>
      <ResizeHandle side="left" onMouseDown={handleMouseDown} />
      <aside style={{ width }} className="bg-bg-panel flex flex-col shrink-0">
        <div className="px-3 py-2.5 border-b border-border font-semibold text-xs flex items-center justify-between">
          <span>Agent</span>
          {isAuthenticated && (
            <button
              onClick={handleNewConversation}
              className="p-1 rounded hover:bg-bg-hover text-text-muted hover:text-text cursor-pointer"
              aria-label="New conversation"
              tabIndex={0}
            >
              <RiAddLine size={14} />
            </button>
          )}
        </div>

        {statusLoading ? (
          <div className="flex-1 flex items-center justify-center text-text-muted text-xs">
            Connecting to Claude...
          </div>
        ) : !isAuthenticated ? (
          <AgentAuthError
            error={status?.error}
            onRetry={() => refetchStatus()}
          />
        ) : (
          <ChatView
            key={sessionId}
            sessionId={sessionId}
            loadedMessages={loadedMessages}
            conversations={conversations}
            onSelectConversation={handleSelectConversation}
          />
        )}
      </aside>
    </>
  )
}
