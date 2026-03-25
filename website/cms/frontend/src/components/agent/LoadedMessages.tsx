import React, { useState } from 'react'
import {
  TextBlock,
  ThinkingBlock,
  ToolCallBlock,
  ToolResultBlock,
} from './messages/index.js'
import { Arrow } from './messages/Arrow.js'
import { stripRolePrefix } from './messages/utils.js'

interface Props {
  messages: any[]
}

export function LoadedMessages({ messages }: Props) {
  // Build a map of tool_use_id → tool_result for pairing
  const resultMap = buildResultMap(messages)

  // Group subagent messages by parent_tool_use_id
  const subagentMessages = new Map<string, any[]>()
  const topLevelMessages: any[] = []
  for (const msg of messages) {
    const parentId = msg.parent_tool_use_id
    if (parentId) {
      const arr = subagentMessages.get(parentId) || []
      arr.push(msg)
      subagentMessages.set(parentId, arr)
    } else {
      topLevelMessages.push(msg)
    }
  }

  return (
    <>
      {topLevelMessages.map((msg, i) => (
        <MessageItem
          key={i}
          msg={msg}
          resultMap={resultMap}
          subagentMessages={subagentMessages}
        />
      ))}
      <div className="mb-3 text-[10px] text-text-muted text-center">
        — conversation resumed —
      </div>
    </>
  )
}

function MessageItem({
  msg,
  resultMap,
  subagentMessages,
}: {
  msg: any
  resultMap: Map<string, { content: any; isError?: boolean }>
  subagentMessages: Map<string, any[]>
}) {
  const content = msg?.message?.content
  if (!content) return null

  // Simple string content (user prompt)
  if (typeof content === 'string') {
    const cleaned = cleanText(content)
    if (!cleaned) return null
    return (
      <TextBlock
        text={cleaned}
        variant={msg.type === 'user' ? 'user' : 'assistant'}
      />
    )
  }

  if (!Array.isArray(content)) return null

  return (
    <>
      {content.map((block: any, i: number) => (
        <ContentBlock
          key={i}
          block={block}
          role={msg.type}
          resultMap={resultMap}
          subagentMessages={subagentMessages}
        />
      ))}
    </>
  )
}

function ContentBlock({
  block,
  role,
  resultMap,
  subagentMessages,
}: {
  block: any
  role: string
  resultMap: Map<string, { content: any; isError?: boolean }>
  subagentMessages: Map<string, any[]>
}) {
  if (block.type === 'text') {
    const cleaned = cleanText(block.text)
    if (!cleaned) return null
    return (
      <TextBlock
        text={cleaned}
        variant={role === 'user' ? 'user' : 'assistant'}
      />
    )
  }

  if (block.type === 'thinking') {
    return <ThinkingBlock text={block.thinking} />
  }

  if (block.type === 'tool_use') {
    const result = resultMap.get(block.id)
    const subSteps = subagentMessages.get(block.id)

    // For Agent tool calls, render subagent steps inline
    if (block.name === 'Agent' && subSteps && subSteps.length > 0) {
      const subResultMap = buildResultMap(subSteps)
      const resultText = result ? extractResultText(result.content) : ''
      return (
        <AgentBlock
          description={block.input?.description || ''}
          subSteps={subSteps}
          subResultMap={subResultMap}
          resultText={resultText}
        />
      )
    }

    return (
      <ToolCallBlock
        name={block.name}
        input={block.input}
        result={result?.content}
        isError={result?.isError}
      />
    )
  }

  // tool_result rendered as part of tool_use above — skip standalone
  if (block.type === 'tool_result') {
    // Only render if orphaned (no matching tool_use found)
    if (block.tool_use_id && resultMap.has(block.tool_use_id)) return null
    const cleaned =
      typeof block.content === 'string'
        ? cleanText(block.content)
        : block.content
    if (!cleaned) return null
    return <ToolResultBlock content={cleaned} isError={block.is_error} />
  }

  return null
}

function AgentBlock({
  description,
  subSteps,
  subResultMap,
  resultText,
}: {
  description: string
  subSteps: any[]
  subResultMap: Map<string, { content: any; isError?: boolean }>
  resultText: string
}) {
  const [resultOpen, setResultOpen] = useState(false)

  return (
    <div className="mb-3 rounded-md border border-indigo-200 bg-indigo-50/50 overflow-hidden">
      <div className="px-3 py-1.5 flex items-center gap-2">
        <span className="text-[11px] font-semibold text-indigo-800">
          Agent
        </span>
        <span className="text-[10px] text-indigo-600 truncate">
          {description}
        </span>
      </div>
      <div className="px-2 py-1 border-t border-indigo-200">
        {subSteps.map((step: any, j: number) => (
          <SubagentStep key={j} msg={step} resultMap={subResultMap} />
        ))}
      </div>
      {resultText && (
        <>
          <button
            onClick={() => setResultOpen(!resultOpen)}
            className="w-full flex items-center gap-1 px-3 py-1 text-[10px] text-indigo-700 hover:bg-indigo-100 cursor-pointer border-t border-indigo-200"
            aria-label={resultOpen ? 'Collapse result' : 'Expand result'}
            tabIndex={0}
          >
            <Arrow open={resultOpen} />
            Result
          </button>
          {resultOpen && (
            <div className="border-t border-indigo-200">
              <TextBlock text={resultText} variant="assistant" />
            </div>
          )}
        </>
      )}
    </div>
  )
}

/** Render a single subagent step (assistant tool calls only, skip user tool_results) */
function SubagentStep({
  msg,
  resultMap,
}: {
  msg: any
  resultMap: Map<string, { content: any; isError?: boolean }>
}) {
  const content = msg?.message?.content
  if (!Array.isArray(content)) return null

  // Skip user messages (tool_results) — they're paired via resultMap
  if (msg.type === 'user') return null

  return (
    <>
      {content.map((block: any, i: number) => {
        if (block.type === 'tool_use') {
          const result = resultMap.get(block.id)
          return (
            <ToolCallBlock
              key={i}
              name={block.name}
              input={block.input}
              result={result?.content}
              isError={result?.isError}
            />
          )
        }
        if (block.type === 'text') {
          const cleaned = cleanText(block.text)
          if (!cleaned) return null
          return <TextBlock key={i} text={cleaned} variant="assistant" />
        }
        if (block.type === 'thinking') {
          return <ThinkingBlock key={i} text={block.thinking} />
        }
        return null
      })}
    </>
  )
}

/** Build a map from tool_use_id to its result across all messages */
function buildResultMap(
  messages: any[]
): Map<string, { content: any; isError?: boolean }> {
  const map = new Map<string, { content: any; isError?: boolean }>()
  for (const msg of messages) {
    const content = msg?.message?.content
    if (!Array.isArray(content)) continue
    for (const block of content) {
      if (block.type === 'tool_result' && block.tool_use_id) {
        const cleaned =
          typeof block.content === 'string'
            ? cleanText(block.content)
            : block.content
        map.set(block.tool_use_id, {
          content: cleaned,
          isError: block.is_error,
        })
      }
    }
  }
  return map
}

/** Extract readable text from a tool result (string or array of text blocks) */
function extractResultText(content: any): string {
  let text: string
  if (typeof content === 'string') {
    text = content
  } else if (Array.isArray(content)) {
    text = content
      .filter((b: any) => b.type === 'text' && b.text)
      .map((b: any) => b.text)
      .join('\n\n')
  } else {
    return ''
  }
  return cleanText(text)
}

/** Strip Claude Code internal noise */
function cleanText(text: string | undefined): string {
  if (!text) return ''
  let cleaned = text.replace(
    /<(?:task-notification|system-reminder|local-command-[^>]*|usage)>[\s\S]*?<\/(?:task-notification|system-reminder|local-command-[^>]*|usage)>/g,
    ''
  )
  cleaned = cleaned.replace(/^agentId:.*$/gm, '')
  cleaned = cleaned
    .split('\n')
    .filter((line) => !line.includes('/private/tmp/claude-'))
    .join('\n')
  cleaned = stripRolePrefix(cleaned)
  return cleaned.trim()
}
