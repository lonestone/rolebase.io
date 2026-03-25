import React, { useState } from 'react'
import { Arrow } from './Arrow.js'
import { DiffView } from './DiffView.js'
import { relativePath, formatResult } from './utils.js'

interface Props {
  name: string
  input: any
  result?: any
  isError?: boolean
}

export function ToolCallBlock({ name, input, result, isError }: Props) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [resultOpen, setResultOpen] = useState(false)
  const body = renderToolBody(name, input)
  const resultText = formatResult(result)

  return (
    <div className="mb-3 rounded-md border border-blue-200 bg-blue-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-1.5">
        <span className="text-[11px] font-semibold text-blue-800">{name}</span>
        {body.summary && (
          <span className="text-[10px] text-blue-600 truncate flex-1">
            {body.summary}
          </span>
        )}
      </div>

      {/* Readable content */}
      {body.content && (
        <div className="px-3 py-1.5 border-t border-blue-200 text-[10px] font-mono text-blue-900 whitespace-pre-wrap break-words max-h-60 overflow-auto">
          {body.content}
        </div>
      )}

      {/* Raw JSON details (collapsible) */}
      {body.hasRawDetails && (
        <>
          <button
            onClick={() => setDetailsOpen(!detailsOpen)}
            className="w-full flex items-center gap-1 px-3 py-1 text-[10px] text-blue-700 hover:bg-blue-100 cursor-pointer border-t border-blue-200"
            aria-label={detailsOpen ? 'Collapse details' : 'Expand details'}
            tabIndex={0}
          >
            <Arrow open={detailsOpen} />
            Details
          </button>
          {detailsOpen && (
            <pre className="px-3 py-2 text-[10px] text-blue-900 font-mono whitespace-pre-wrap break-words max-h-48 overflow-auto border-t border-blue-200">
              {typeof input === 'string' ? input : JSON.stringify(input, null, 2)}
            </pre>
          )}
        </>
      )}

      {/* Result (collapsible) */}
      {resultText && (
        <>
          <button
            onClick={() => setResultOpen(!resultOpen)}
            className={`w-full flex items-center gap-1 px-3 py-1 text-[10px] cursor-pointer border-t border-blue-200 ${
              isError
                ? 'text-red-600 hover:bg-red-50'
                : 'text-blue-700 hover:bg-blue-100'
            }`}
            aria-label={resultOpen ? 'Collapse result' : 'Expand result'}
            tabIndex={0}
          >
            <Arrow open={resultOpen} />
            {isError ? 'Error' : 'Result'}
          </button>
          {resultOpen && (
            <div
              className={`px-3 py-2 text-[10px] font-mono whitespace-pre-wrap break-words max-h-48 overflow-auto border-t border-blue-200 ${
                isError ? 'bg-red-50 text-red-800' : 'text-blue-900'
              }`}
            >
              {resultText}
            </div>
          )}
        </>
      )}
    </div>
  )
}

// --- Tool body rendering ---

interface ToolBody {
  summary: string
  content: React.ReactNode | null
  hasRawDetails: boolean
}

function renderToolBody(name: string, input: any): ToolBody {
  if (!input || typeof input !== 'object') {
    return { summary: '', content: null, hasRawDetails: false }
  }

  const path = relativePath(input.file_path)

  if (name === 'Read') {
    return { summary: path, content: null, hasRawDetails: false }
  }

  if (name === 'Edit' && input.old_string != null) {
    return {
      summary: path,
      content: <DiffView oldStr={input.old_string} newStr={input.new_string} />,
      hasRawDetails: false,
    }
  }

  if (name === 'Write' && input.content != null) {
    return {
      summary: path,
      content: <AdditionView text={input.content} />,
      hasRawDetails: false,
    }
  }

  if (name === 'Glob') {
    return { summary: input.pattern || '', content: null, hasRawDetails: false }
  }

  if (name === 'Grep') {
    return { summary: input.pattern || '', content: null, hasRawDetails: false }
  }

  if (name === 'Bash') {
    return {
      summary: input.description || '',
      content: input.command || null,
      hasRawDetails: false,
    }
  }

  if (name === 'Agent') {
    return {
      summary: input.description || '',
      content: input.prompt || null,
      hasRawDetails: false,
    }
  }

  if (name === 'WebFetch') {
    return {
      summary: input.url || '',
      content: input.prompt || null,
      hasRawDetails: false,
    }
  }

  if (name === 'WebSearch') {
    return { summary: input.query || '', content: null, hasRawDetails: false }
  }

  return { summary: '', content: null, hasRawDetails: true }
}

function AdditionView({ text }: { text: string }) {
  const lines = text.replace(/\n$/, '').split('\n')
  return (
    <div className="font-mono text-[10px] leading-relaxed">
      {lines.map((line, i) => (
        <div key={i} className="bg-green-100 text-green-900">
          <span className="select-none inline-block w-3 text-center opacity-60">+</span>
          {line}
        </div>
      ))}
    </div>
  )
}
