import React, { useRef } from 'react'
import Button from '../Button.js'

interface Props {
  input: string
  running: boolean
  onInputChange: (value: string) => void
  onSubmit: () => void
  onStop: () => void
}

export function AgentInput({
  input,
  running,
  onInputChange,
  onSubmit,
  onStop,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <div className="p-3 border-t border-border flex gap-2">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask Claude... (Enter to send, Shift+Enter for new line)"
        rows={3}
        className="flex-1 p-2 border border-border rounded-md resize-none outline-none text-sm font-[inherit] bg-white"
      />
      {running && (
        <div className="flex flex-col gap-1">
          <Button variant="danger" size="sm" onClick={onStop}>
            Stop
          </Button>
        </div>
      )}
    </div>
  )
}
