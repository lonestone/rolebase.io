import React, { useState } from 'react'
import { respondToPermission } from '../../api.js'
import type { AgentEvent } from './types.js'

interface Props {
  event: AgentEvent
  onPermissionResponse?: (requestId: string) => void
}

export function AgentEventItem({ event, onPermissionResponse }: Props) {
  if (event.type === 'user_prompt') {
    return (
      <div className="mb-3 px-3 py-2 rounded-md whitespace-pre-wrap break-words bg-primary text-white">
        {event.content}
      </div>
    )
  }

  if (event.type === 'system' && event.subtype === 'init') {
    return (
      <div className="mb-3 px-2 py-1 text-[10px] text-text-muted">
        Session started &middot; {event.model}
      </div>
    )
  }

  if (event.type === 'system' && event.subtype === 'resumed') {
    return (
      <div className="mb-3 px-2 py-1 text-[10px] text-text-muted">
        Conversation resumed
      </div>
    )
  }

  if (event.type === 'assistant') {
    return <AssistantEvent event={event} />
  }

  if (event.type === 'user') {
    return <ToolResultEvent event={event} />
  }

  if (event.type === 'result') {
    return <ResultEvent event={event} />
  }

  if (event.type === 'error') {
    return (
      <div className="mb-3 px-3 py-2 rounded-md text-red-700 bg-red-50 border border-red-200 text-[11px] font-mono whitespace-pre-wrap break-words">
        {event.error}
      </div>
    )
  }

  if (event.type === 'permission_request') {
    return (
      <PermissionRequestBlock
        event={event}
        onResponse={onPermissionResponse}
      />
    )
  }

  if (event.type === 'rate_limit_event') {
    return null
  }

  // Unknown events: skip
  return null
}

function AssistantEvent({ event }: { event: any }) {
  const content = event.message?.content
  if (!content || !Array.isArray(content)) return null

  return (
    <>
      {content.map((block: any, i: number) => {
        if (block.type === 'thinking') {
          return <ThinkingBlock key={i} text={block.thinking} />
        }
        if (block.type === 'text') {
          return (
            <div
              key={i}
              className="mb-3 px-3 py-2 rounded-md whitespace-pre-wrap break-words bg-white text-text border border-border"
            >
              {block.text}
            </div>
          )
        }
        if (block.type === 'tool_use') {
          return <ToolUseBlock key={i} block={block} />
        }
        return null
      })}
    </>
  )
}

function ThinkingBlock({ text }: { text: string }) {
  const [open, setOpen] = useState(false)

  if (!text) return null

  return (
    <div className="mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-[10px] text-text-muted hover:text-text cursor-pointer"
        aria-label={open ? 'Collapse thinking' : 'Expand thinking'}
        tabIndex={0}
      >
        <span className="inline-block transition-transform" style={{ transform: open ? 'rotate(90deg)' : '' }}>
          &#9654;
        </span>
        Thinking...
      </button>
      {open && (
        <div className="mt-1 px-3 py-2 rounded-md bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-mono whitespace-pre-wrap break-words max-h-48 overflow-auto">
          {text}
        </div>
      )}
    </div>
  )
}

function ToolUseBlock({ block }: { block: any }) {
  const [open, setOpen] = useState(false)
  const inputStr = JSON.stringify(block.input, null, 2)

  return (
    <div className="mb-3 rounded-md border border-blue-200 bg-blue-50 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-3 py-1.5 text-left cursor-pointer hover:bg-blue-100"
        aria-label={open ? 'Collapse tool details' : 'Expand tool details'}
        tabIndex={0}
      >
        <span className="inline-block transition-transform text-[10px]" style={{ transform: open ? 'rotate(90deg)' : '' }}>
          &#9654;
        </span>
        <span className="text-[11px] font-semibold text-blue-800">{block.name}</span>
      </button>
      {open && (
        <pre className="px-3 py-2 text-[10px] text-blue-900 font-mono whitespace-pre-wrap break-words max-h-48 overflow-auto border-t border-blue-200">
          {inputStr}
        </pre>
      )}
    </div>
  )
}

function ToolResultEvent({ event }: { event: any }) {
  const [open, setOpen] = useState(false)
  const content = event.message?.content
  if (!content || !Array.isArray(content)) return null

  return (
    <>
      {content.map((block: any, i: number) => {
        if (block.type !== 'tool_result') return null
        const text =
          typeof block.content === 'string'
            ? block.content
            : block.content?.toString?.() || JSON.stringify(block.content)
        const isError = block.is_error

        return (
          <div key={i} className="mb-3">
            <button
              onClick={() => setOpen(!open)}
              className={`flex items-center gap-1 text-[10px] cursor-pointer ${
                isError ? 'text-red-600 hover:text-red-800' : 'text-text-muted hover:text-text'
              }`}
              aria-label={open ? 'Collapse result' : 'Expand result'}
              tabIndex={0}
            >
              <span className="inline-block transition-transform" style={{ transform: open ? 'rotate(90deg)' : '' }}>
                &#9654;
              </span>
              {isError ? 'Error' : 'Result'}
            </button>
            {open && (
              <div
                className={`mt-1 px-3 py-2 rounded-md text-[10px] font-mono whitespace-pre-wrap break-words max-h-48 overflow-auto ${
                  isError
                    ? 'bg-red-50 border border-red-200 text-red-800'
                    : 'bg-gray-50 border border-gray-200 text-text'
                }`}
              >
                {text}
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}

function PermissionRequestBlock({
  event,
  onResponse,
}: {
  event: any
  onResponse?: (requestId: string) => void
}) {
  const [responded, setResponded] = useState(false)
  const [decision, setDecision] = useState<'allow' | 'deny' | null>(null)
  const [open, setOpen] = useState(false)

  const toolName = event.tool_name || 'Unknown tool'
  const toolInput = event.input
  const requestId = event.request_id
  const inputStr = toolInput ? JSON.stringify(toolInput, null, 2) : null

  async function handleResponse(behavior: 'allow' | 'deny') {
    setResponded(true)
    setDecision(behavior)
    await respondToPermission(requestId, behavior, toolInput)
    onResponse?.(requestId)
  }

  return (
    <div
      className={`mb-3 rounded-md border overflow-hidden ${
        decision === 'allow'
          ? 'border-green-300 bg-green-50'
          : decision === 'deny'
            ? 'border-red-300 bg-red-50'
            : 'border-amber-300 bg-amber-50'
      }`}
    >
      <div className="px-3 py-2 flex items-center gap-2">
        <span className="text-[11px] font-semibold text-amber-900 flex-1">
          {!responded ? '⏳' : decision === 'allow' ? '✅' : '❌'}{' '}
          {toolName}
        </span>
        {!responded && (
          <div className="flex gap-1">
            <button
              onClick={() => handleResponse('allow')}
              className="px-2 py-0.5 text-[10px] font-semibold rounded bg-green-600 text-white hover:bg-green-700 cursor-pointer"
              aria-label="Allow this tool"
              tabIndex={0}
            >
              Allow
            </button>
            <button
              onClick={() => handleResponse('deny')}
              className="px-2 py-0.5 text-[10px] font-semibold rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer"
              aria-label="Deny this tool"
              tabIndex={0}
            >
              Deny
            </button>
          </div>
        )}
        {responded && (
          <span
            className={`text-[10px] font-semibold ${decision === 'allow' ? 'text-green-700' : 'text-red-700'}`}
          >
            {decision === 'allow' ? 'Allowed' : 'Denied'}
          </span>
        )}
      </div>
      {inputStr && (
        <>
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center gap-1 px-3 py-1 text-[10px] text-amber-800 hover:bg-amber-100 cursor-pointer border-t border-amber-200"
            aria-label={open ? 'Collapse details' : 'Expand details'}
            tabIndex={0}
          >
            <span
              className="inline-block transition-transform"
              style={{ transform: open ? 'rotate(90deg)' : '' }}
            >
              &#9654;
            </span>
            Details
          </button>
          {open && (
            <pre className="px-3 py-2 text-[10px] font-mono whitespace-pre-wrap break-words max-h-48 overflow-auto border-t border-amber-200 text-amber-900">
              {inputStr}
            </pre>
          )}
        </>
      )}
    </div>
  )
}

function ResultEvent({ event }: { event: any }) {
  const durationSec = event.duration_ms ? (event.duration_ms / 1000).toFixed(1) : null
  const cost = event.total_cost_usd != null ? `$${event.total_cost_usd.toFixed(4)}` : null
  const isError = event.is_error

  return (
    <div
      className={`mb-3 px-3 py-1.5 rounded-md text-[10px] ${
        isError
          ? 'bg-red-50 border border-red-200 text-red-700'
          : 'bg-green-50 border border-green-200 text-green-800'
      }`}
    >
      {isError ? 'Failed' : 'Done'}
      {durationSec && <span> &middot; {durationSec}s</span>}
      {cost && <span> &middot; {cost}</span>}
      {event.num_turns && <span> &middot; {event.num_turns} turns</span>}
    </div>
  )
}
