import React, { useState } from 'react'
import { Arrow } from './Arrow.js'

interface Props {
  text: string
}

export function ThinkingBlock({ text }: Props) {
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
        <Arrow open={open} />
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
