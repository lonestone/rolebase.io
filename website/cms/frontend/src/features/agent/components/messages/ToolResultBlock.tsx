import React, { useState } from 'react'
import { Arrow } from './Arrow.js'
import { formatResult } from './utils.js'

interface Props {
  content: any
  isError?: boolean
}

export function ToolResultBlock({ content, isError }: Props) {
  const [open, setOpen] = useState(false)
  const text = formatResult(content)
  if (!text) return null

  return (
    <div className="mb-3">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 text-[10px] cursor-pointer ${
          isError
            ? 'text-red-600 hover:text-red-800'
            : 'text-text-muted hover:text-text'
        }`}
        aria-label={open ? 'Collapse result' : 'Expand result'}
        tabIndex={0}
      >
        <Arrow open={open} />
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
}
