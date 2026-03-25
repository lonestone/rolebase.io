import React, { useState, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { sendPrompt, stopClaude, type Conversation } from '../../api.js'
import { useResizablePanel } from '../../hooks/useResizablePanel.js'
import { ResizeHandle } from '../ResizeHandle.js'
import { AgentEventList } from './AgentEventList.js'
import { AgentInput } from './AgentInput.js'
import { ConversationList } from './ConversationList.js'
import type { AgentEvent } from './types.js'

export function AgentPanel() {
  const queryClient = useQueryClient()
  const [events, setEvents] = useState<AgentEvent[]>([])
  const [input, setInput] = useState('')
  const [running, setRunning] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const hasConversation = events.length > 0

  function handleSubmit() {
    const prompt = input.trim()
    if (!prompt || running) return

    setInput('')
    setEvents((prev) => [...prev, { type: 'user_prompt', content: prompt }])
    setRunning(true)

    const controller = sendPrompt(
      prompt,
      (event) => {
        // Capture session_id from result event
        if (event.type === 'result' && event.session_id) {
          setSessionId(event.session_id)
        }
        setEvents((prev) => [...prev, event])
      },
      () => {
        setRunning(false)
        queryClient.invalidateQueries({ queryKey: ['tree'] })
        queryClient.invalidateQueries({ queryKey: ['gitStatus'] })
      },
      sessionId ?? undefined
    )

    abortRef.current = controller
  }

  function handleStop() {
    abortRef.current?.abort()
    stopClaude()
    setRunning(false)
  }

  function handleSelectConversation(conv: Conversation) {
    setSessionId(conv.id)
    setEvents([
      {
        type: 'user_prompt',
        content: conv.name || conv.firstMessage,
      },
      {
        type: 'system',
        subtype: 'resumed',
        message: 'Conversation resumed',
      },
    ])
  }

  function handleNewConversation() {
    setSessionId(null)
    setEvents([])
  }

  const { width, handleMouseDown } = useResizablePanel({
    storageKey: 'cms-agent-panel-width',
    defaultWidth: 380,
    minWidth: 250,
    maxWidth: 800,
    side: 'left',
  })

  return (
    <>
      <ResizeHandle side="left" onMouseDown={handleMouseDown} />
      <aside style={{ width }} className="bg-bg-panel flex flex-col shrink-0">
        <div className="px-3 py-2.5 border-b border-border font-semibold text-xs flex items-center justify-between">
          <span>Agent</span>
          {hasConversation && (
            <button
              onClick={handleNewConversation}
              className="text-[10px] text-text-muted hover:text-text cursor-pointer"
              aria-label="New conversation"
              tabIndex={0}
            >
              + New
            </button>
          )}
        </div>

        {hasConversation ? (
          <AgentEventList
            events={events}
            running={running}
            onPermissionResponse={() => {}}
          />
        ) : (
          <ConversationList onSelect={handleSelectConversation} />
        )}

        <AgentInput
          input={input}
          running={running}
          onInputChange={setInput}
          onSubmit={handleSubmit}
          onStop={handleStop}
        />
      </aside>
    </>
  )
}
