import React, { useEffect, useState } from 'react'
import { fetchConversations, type Conversation } from '../../api.js'

interface Props {
  onSelect: (conversation: Conversation) => void
}

export function ConversationList({ onSelect }: Props) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchConversations()
      .then(setConversations)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center text-text-muted text-xs">
        Loading...
      </div>
    )
  }

  if (conversations.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-text-muted text-xs p-4 text-center">
        No conversations yet. Type a message below to start one.
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto">
      {conversations.map((conv) => (
        <button
          key={conv.id}
          onClick={() => onSelect(conv)}
          className="w-full text-left px-3 py-2.5 border-b border-border hover:bg-bg-hover cursor-pointer"
          tabIndex={0}
          aria-label={`Resume conversation: ${conv.firstMessage.slice(0, 50)}`}
        >
          <div className="text-xs text-text line-clamp-2 leading-relaxed">
            {conv.name || conv.firstMessage}
          </div>
          <div className="text-[10px] text-text-muted mt-1">
            {formatDate(conv.timestamp)}
          </div>
        </button>
      ))}
    </div>
  )
}

function formatDate(iso: string): string {
  if (!iso) return ''
  const date = new Date(iso)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString()
}
