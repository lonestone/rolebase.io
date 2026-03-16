import React, { useCallback, useRef, useState } from 'react'

function ClaudeScreen() {
  const [prompt, setPrompt] = useState('')
  const [output, setOutput] = useState('')
  const [running, setRunning] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)

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
    setOutput('')

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
        setOutput(`Error: ${res.statusText}`)
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

        // Parse SSE events
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue
            try {
              const parsed = JSON.parse(data)
              if (parsed.text) {
                setOutput((prev) => prev + parsed.text)
              }
              if (parsed.error) {
                setOutput((prev) => prev + '\n\nError: ' + parsed.error)
              }
            } catch {
              // ignore malformed lines
            }
          }
        }

        // Auto-scroll output
        if (outputRef.current) {
          outputRef.current.scrollTop = outputRef.current.scrollHeight
        }
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setOutput((prev) => prev + '\n\nConnection error: ' + err.message)
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
    <div style={{ padding: 24, maxWidth: 960, margin: '0 auto' }}>
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

      <div style={{ marginBottom: 16 }}>
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
            width: '100%',
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
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
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
            alignSelf: 'center',
            marginLeft: 8,
          }}
        >
          {navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}+Enter to send
        </span>
      </div>

      {output && (
        <div
          ref={outputRef}
          style={{
            backgroundColor: '#1a1a2e',
            color: '#e2e8f0',
            padding: 16,
            borderRadius: 8,
            fontFamily: '"SF Mono", "Fira Code", "Consolas", monospace',
            fontSize: 13,
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            maxHeight: '60vh',
            overflow: 'auto',
          }}
        >
          {output}
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
      )}

      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default ClaudeScreen
