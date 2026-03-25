import React from 'react'
import {
  TextBlock,
  ThinkingBlock,
  ToolCallBlock,
  ToolResultBlock,
} from './messages/index.js'

interface Props {
  messages: any[]
}

export function LoadedMessages({ messages }: Props) {
  // Build a map of tool_use_id → tool_result for pairing
  const resultMap = buildResultMap(messages)

  return (
    <>
      {messages.map((msg, i) => (
        <MessageItem key={i} msg={msg} resultMap={resultMap} />
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
}: {
  msg: any
  resultMap: Map<string, { content: any; isError?: boolean }>
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
        />
      ))}
    </>
  )
}

function ContentBlock({
  block,
  role,
  resultMap,
}: {
  block: any
  role: string
  resultMap: Map<string, { content: any; isError?: boolean }>
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

/** Strip Claude Code internal noise */
function cleanText(text: string | undefined): string {
  if (!text) return ''
  let cleaned = text.replace(
    /<(?:task-notification|system-reminder|local-command-[^>]*)>[\s\S]*?<\/(?:task-notification|system-reminder|local-command-[^>]*)>/g,
    ''
  )
  cleaned = cleaned
    .split('\n')
    .filter((line) => !line.includes('/private/tmp/claude-'))
    .join('\n')
  // Strip "Human: " / "Assistant: " prefixes added by the SDK
  cleaned = cleaned.replace(/^(Human|Assistant):\s*/i, '')
  return cleaned.trim()
}
