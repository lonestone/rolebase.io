import React, { useCallback, useRef, useState } from 'react'

interface StreamEvent {
  id: string
  type: 'init' | 'text' | 'tool_use' | 'tool_result' | 'result' | 'error'
  content: string
  toolName?: string
  toolInput?: string
}

let eventId = 0

function parseStreamEvent(data: any): StreamEvent | null {
  const id = String(++eventId)

  // system init
  if (data.type === 'system' && data.subtype === 'init') {
    return { id, type: 'init', content: `Model: ${data.model}` }
  }

  // assistant message with content blocks
  if (data.type === 'assistant' && data.message?.content) {
    for (const block of data.message.content) {
      if (block.type === 'text') {
        return { id, type: 'text', content: block.text }
      }
      if (block.type === 'tool_use') {
        const input =
          typeof block.input === 'string'
            ? block.input
            : JSON.stringify(block.input, null, 2)
        return {
          id,
          type: 'tool_use',
          content: input,
          toolName: block.name,
          toolInput: input,
        }
      }
      if (block.type === 'tool_result') {
        const content =
          typeof block.content === 'string'
            ? block.content
            : JSON.stringify(block.content, null, 2)
        return { id, type: 'tool_result', content }
      }
    }
    return null
  }

  // result
  if (data.type === 'result') {
    const cost = data.total_cost_usd
      ? ` ($${data.total_cost_usd.toFixed(4)})`
      : ''
    return {
      id,
      type: 'result',
      content: `Completed in ${data.num_turns} turn(s), ${data.duration_ms}ms${cost}`,
    }
  }

  // stderr / error
  if (data.type === 'stderr') {
    return { id, type: 'error', content: data.text }
  }
  if (data.error) {
    return { id, type: 'error', content: data.error }
  }

  return null
}

const eventStyles: Record<string, React.CSSProperties> = {
  init: { color: '#a0aec0', fontStyle: 'italic', marginBottom: 8 },
  text: { color: '#e2e8f0', marginBottom: 8 },
  tool_use: {
    color: '#fbd38d',
    backgroundColor: '#2d2d44',
    padding: 8,
    borderRadius: 6,
    marginBottom: 4,
    borderLeft: '3px solid #ecc94b',
  },
  tool_result: {
    color: '#9ae6b4',
    backgroundColor: '#1e2a1e',
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
    borderLeft: '3px solid #48bb78',
    maxHeight: 200,
    overflow: 'auto',
  },
  result: {
    color: '#90cdf4',
    fontStyle: 'italic',
    borderTop: '1px solid #2d3748',
    paddingTop: 8,
    marginTop: 8,
  },
  error: { color: '#fc8181', marginBottom: 4 },
}

function ClaudeScreen() {
  const [prompt, setPrompt] = useState('')
  const [events, setEvents] = useState<StreamEvent[]>([])
  const [running, setRunning] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  const autoResize = useCallback(() => {
    const el = textareaRef.current
    if (el) {
      el.style.height = 'auto'
      el.style.height = el.scrollHeight + 'px'
    }
  }, [])

  const handleSubmit = useCallback(async () => {
    if (!prompt.trim() || running) return
    setRunning(true)
    setEvents([])
    eventId = 0

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const res = await fetch('http://localhost:4002/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim() }),
        signal: controller.signal,
      })

      if (!res.ok || !res.body) {
        setEvents([
          { id: '0', type: 'error', content: `Error: ${res.statusText}` },
        ])
        setRunning(false)
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })

        const lines = buffer.split('\n')
        buffer = lines.pop() || ''
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue
            try {
              const parsed = JSON.parse(data)
              const event = parseStreamEvent(parsed)
              if (event) {
                setEvents((prev) => [...prev, event])
              }
            } catch {
              // ignore malformed lines
            }
          }
        }

        if (outputRef.current) {
          outputRef.current.scrollTop = outputRef.current.scrollHeight
        }
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setEvents((prev) => [
          ...prev,
          {
            id: String(++eventId),
            type: 'error',
            content: 'Connection error: ' + err.message,
          },
        ])
      }
    } finally {
      setRunning(false)
      abortRef.current = null
    }
  }, [prompt, running])

  const handleCancel = useCallback(() => {
    abortRef.current?.abort()
    setRunning(false)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        handleSubmit()
      }
    },
    [handleSubmit]
  )

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        gap: 24,
        padding: 24,
      }}
    >
      {/* Left column: prompt */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 600,
            marginBottom: 16,
            color: '#1a1a2e',
          }}
        >
          Claude AI Assistant
        </h2>

        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value)
            autoResize()
          }}
          onKeyDown={handleKeyDown}
          placeholder="Describe the changes you want to make to the project..."
          disabled={running}
          rows={4}
          style={{
            padding: 12,
            fontSize: 14,
            lineHeight: 1.5,
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            border: '2px solid #e2e8f0',
            borderRadius: 8,
            resize: 'none',
            overflow: 'hidden',
            outline: 'none',
            transition: 'border-color 0.2s',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#667eea')}
          onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
          aria-label="Prompt for Claude AI"
        />

        <div
          style={{
            display: 'flex',
            gap: 8,
            marginTop: 16,
            alignItems: 'center',
          }}
        >
          <button
            onClick={handleSubmit}
            disabled={running || !prompt.trim()}
            style={{
              padding: '8px 20px',
              fontSize: 14,
              fontWeight: 500,
              color: '#fff',
              backgroundColor:
                running || !prompt.trim() ? '#a0aec0' : '#667eea',
              border: 'none',
              borderRadius: 6,
              cursor: running || !prompt.trim() ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
            }}
            aria-label="Send prompt to Claude"
          >
            {running ? 'Running...' : 'Send to Claude'}
          </button>

          {running && (
            <button
              onClick={handleCancel}
              style={{
                padding: '8px 20px',
                fontSize: 14,
                fontWeight: 500,
                color: '#e53e3e',
                backgroundColor: '#fff',
                border: '1px solid #e53e3e',
                borderRadius: 6,
                cursor: 'pointer',
              }}
              aria-label="Cancel Claude execution"
            >
              Cancel
            </button>
          )}

          <span
            style={{
              fontSize: 12,
              color: '#a0aec0',
              marginLeft: 8,
            }}
          >
            {navigator.platform.includes('Mac') ? '\u2318' : 'Ctrl'}+Enter to
            send
          </span>
        </div>
      </div>

      {/* Right column: output */}
      <div
        ref={outputRef}
        style={{
          flex: 1,
          backgroundColor: '#1a1a2e',
          color: '#e2e8f0',
          padding: 16,
          borderRadius: 8,
          fontFamily: '"SF Mono", "Fira Code", "Consolas", monospace',
          fontSize: 13,
          lineHeight: 1.6,
          overflow: 'auto',
        }}
      >
        {events.length === 0 && !running && (
          <span style={{ color: '#4a5568' }}>Output will appear here...</span>
        )}
        {events.map((event) => (
          <div key={event.id} style={eventStyles[event.type] || {}}>
            {event.type === 'tool_use' && (
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: 4,
                  color: '#ecc94b',
                }}
              >
                {event.toolName}
              </div>
            )}
            {event.type === 'tool_result' && (
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: 4,
                  color: '#48bb78',
                }}
              >
                Result
              </div>
            )}
            <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {event.content}
            </div>
          </div>
        ))}
        {running && (
          <span
            style={{
              display: 'inline-block',
              width: 8,
              height: 16,
              backgroundColor: '#667eea',
              marginLeft: 2,
              animation: 'blink 1s step-end infinite',
            }}
          />
        )}
      </div>

      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default ClaudeScreen
