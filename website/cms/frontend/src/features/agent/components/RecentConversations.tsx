import React, { useState } from 'react'
import type { Conversation } from '../../../api.js'
import { stripRolePrefix } from './messages/utils.js'

interface Props {
  conversations: Conversation[]
  onSelect: (id: string) => void
}

export function RecentConversations({ conversations, onSelect }: Props) {
  const [expanded, setExpanded] = useState(false)

  const visible = expanded ? conversations : conversations.slice(0, 3)

  return (
    <div className="flex flex-col gap-3 py-2">
      {visible.length > 0 && (
        <div>
          <div className="text-[10px] text-text-muted uppercase tracking-wide mb-2">
            Recent
          </div>
          {visible.map((conv) => {
            const label = stripRolePrefix(conv.customTitle || conv.summary)
            return (
              <button
                key={conv.id}
                onClick={() => onSelect(conv.id)}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-bg-hover cursor-pointer"
                tabIndex={0}
                aria-label={`Resume: ${label.slice(0, 50)}`}
              >
                <div className="text-xs text-text line-clamp-2 leading-relaxed">
                  {label}
                </div>
              </button>
            )
          })}
          {!expanded && conversations.length > 3 && (
            <button
              onClick={() => setExpanded(true)}
              className="w-full text-left px-3 py-1.5 text-[11px] text-primary hover:underline cursor-pointer"
              tabIndex={0}
              aria-label="Show more conversations"
            >
              See more...
            </button>
          )}
        </div>
      )}
      <div className="text-xs text-text-muted text-center px-4 pt-2">
        To start a new conversation, prompt below ⬇️
      </div>
    </div>
  )
}
