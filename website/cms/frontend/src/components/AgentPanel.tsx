import React, { useState, useRef, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { sendPrompt, stopClaude } from '../api.js'
import { useResizablePanel } from '../hooks/useResizablePanel.js'
import { ResizeHandle } from './ResizeHandle.js'
import Button from './Button.js'

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
        <div className="px-3 py-2.5 border-b border-border font-semibold text-xs">
          Agent
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-3 text-xs leading-relaxed">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-3 px-3 py-2 rounded-md whitespace-pre-wrap wrap-break-words ${
                msg.role === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-white text-text border border-border font-mono'
              }`}
            >
              {msg.content}
            </div>
          ))}
          {running && messages[messages.length - 1]?.role === 'user' && (
            <div className="text-text-muted text-xs">Thinking...</div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-border flex gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Claude... (Cmd+Enter)"
            rows={3}
            className="flex-1 p-2 border border-border rounded-md resize-none outline-none text-xs font-[inherit]"
          />
          <div className="flex flex-col gap-1">
            {running ? (
              <Button variant="danger" size="sm" onClick={handleStop}>
                Stop
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={handleSubmit}
                disabled={!input.trim()}
              >
                Send
              </Button>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
