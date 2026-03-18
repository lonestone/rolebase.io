import React, { useState, useRef, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { sendPrompt, stopClaude } from '../api.js'

interface AgentMessage {
  role: 'user' | 'agent'
  content: string
  type?: string
}

export function AgentPanel() {
  const queryClient = useQueryClient()
  const [messages, setMessages] = useState<AgentMessage[]>([])
  const [input, setInput] = useState('')
  const [running, setRunning] = useState(false)
  const abortRef = useRef<AbortController | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSubmit() {
    const prompt = input.trim()
    if (!prompt || running) return

    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: prompt }])
    setRunning(true)

    let agentOutput = ''

    const controller = sendPrompt(
      prompt,
      (event) => {
        // Handle stream-json events from Claude
        if (event.type === 'assistant' && event.message?.content) {
          for (const block of event.message.content) {
            if (block.type === 'text' && block.text) {
              agentOutput += block.text
              setMessages((prev) => {
                const last = prev[prev.length - 1]
                if (last?.role === 'agent') {
                  return [
                    ...prev.slice(0, -1),
                    { role: 'agent', content: agentOutput },
                  ]
                }
                return [...prev, { role: 'agent', content: agentOutput }]
              })
            }
            if (block.type === 'tool_use') {
              const toolInfo = `[${block.name}] ${JSON.stringify(
                block.input
              ).substring(0, 200)}`
              agentOutput += `\n${toolInfo}\n`
              setMessages((prev) => {
                const last = prev[prev.length - 1]
                if (last?.role === 'agent') {
                  return [
                    ...prev.slice(0, -1),
                    { role: 'agent', content: agentOutput },
                  ]
                }
                return [...prev, { role: 'agent', content: agentOutput }]
              })
            }
          }
        }
      },
      () => {
        setRunning(false)
        queryClient.invalidateQueries({ queryKey: ['tree'] })
        queryClient.invalidateQueries({ queryKey: ['gitStatus'] })
      }
    )

    abortRef.current = controller
  }

  function handleStop() {
    abortRef.current?.abort()
    stopClaude()
    setRunning(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <aside
      style={{
        width: 'var(--panel-width)',
        borderLeft: '1px solid var(--border)',
        background: 'var(--bg-panel)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          padding: '10px 12px',
          borderBottom: '1px solid var(--border)',
          fontWeight: 600,
          fontSize: 13,
        }}
      >
        Agent
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: 12,
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              marginBottom: 12,
              padding: '8px 12px',
              borderRadius: 'var(--radius)',
              background: msg.role === 'user' ? 'var(--primary)' : '#fff',
              color: msg.role === 'user' ? '#fff' : 'var(--text)',
              border: msg.role === 'agent' ? '1px solid var(--border)' : 'none',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              fontFamily:
                msg.role === 'agent'
                  ? 'ui-monospace, SFMono-Regular, Menlo, monospace'
                  : 'inherit',
            }}
          >
            {msg.content}
          </div>
        ))}
        {running && messages[messages.length - 1]?.role === 'user' && (
          <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>
            Thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        style={{
          padding: 12,
          borderTop: '1px solid var(--border)',
          display: 'flex',
          gap: 8,
        }}
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Claude... (Cmd+Enter)"
          rows={3}
          style={{
            flex: 1,
            padding: 8,
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            resize: 'none',
            outline: 'none',
            fontSize: 13,
            fontFamily: 'inherit',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {running ? (
            <button
              onClick={handleStop}
              style={{
                padding: '4px 12px',
                borderRadius: 'var(--radius)',
                border: 'none',
                background: 'var(--danger)',
                color: '#fff',
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              Stop
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!input.trim()}
              style={{
                padding: '4px 12px',
                borderRadius: 'var(--radius)',
                border: 'none',
                background: input.trim() ? 'var(--primary)' : 'var(--border)',
                color: input.trim() ? '#fff' : 'var(--text-muted)',
                fontSize: 12,
                cursor: input.trim() ? 'pointer' : 'default',
              }}
            >
              Send
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}
