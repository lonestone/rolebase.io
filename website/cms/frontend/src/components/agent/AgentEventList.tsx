import React, { useRef, useEffect } from 'react'
import type { AgentEvent } from './types.js'
import { AgentEventItem } from './AgentEventItem.js'

interface Props {
  events: AgentEvent[]
  running: boolean
  onPermissionResponse?: (requestId: string) => void
}

export function AgentEventList({
  events,
  running,
  onPermissionResponse,
}: Props) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [events])

  const lastEvent = events[events.length - 1]
  const showThinking = running && lastEvent?.type === 'user_prompt'

  return (
    <div className="flex-1 overflow-auto p-3 text-xs leading-relaxed">
      {events.map((event, i) => (
        <AgentEventItem
          key={i}
          event={event}
          onPermissionResponse={onPermissionResponse}
        />
      ))}
      {showThinking && (
        <div className="text-text-muted text-xs">Thinking...</div>
      )}
      <div ref={endRef} />
    </div>
  )
}
