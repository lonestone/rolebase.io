import React, { useState } from 'react'
import type { PendingPermission } from '../../../api.js'
import { respondToPermission } from '../../../api.js'

interface Props {
  permission: PendingPermission
  onResolved: () => void
}

function formatInput(toolName: string, input: Record<string, unknown>): string | null {
  if (!input || Object.keys(input).length === 0) return null

  // Show the most relevant field for known tools
  if (toolName === 'WebSearch' && input.query) return String(input.query)
  if (toolName === 'WebFetch' && input.url) return String(input.url)
  if (toolName === 'Bash' && input.command) return String(input.command)
  if ((toolName === 'Read' || toolName === 'Write' || toolName === 'Edit') && input.file_path)
    return String(input.file_path)

  // Generic: show all key=value pairs
  return Object.entries(input)
    .map(([k, v]) => {
      const val = typeof v === 'string' ? v : JSON.stringify(v)
      return `${k}: ${val}`
    })
    .join('\n')
}

export function PermissionRequest({ permission, onResolved }: Props) {
  const [responding, setResponding] = useState(false)

  async function handleRespond(behavior: 'allow' | 'deny') {
    setResponding(true)
    await respondToPermission(permission.id, behavior)
    onResolved()
  }

  const summary = permission.title || `Use ${permission.toolName}`
  const inputDetails = formatInput(permission.toolName, permission.input)

  return (
    <div className="mx-3 mb-3 rounded-md border border-amber-300 bg-amber-50 overflow-hidden">
      <div className="px-3 py-2 flex items-start gap-2">
        <span className="text-amber-600 text-sm mt-0.5">&#9888;</span>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-semibold text-amber-900">
            {summary}
          </div>
          {permission.decisionReason && (
            <div className="text-[10px] text-amber-700 mt-0.5">
              {permission.decisionReason}
            </div>
          )}
          {inputDetails && (
            <pre className="mt-1.5 px-2 py-1.5 rounded bg-amber-100 text-[10px] font-mono text-amber-900 whitespace-pre-wrap break-words max-h-32 overflow-auto">
              {inputDetails}
            </pre>
          )}
        </div>
      </div>
      <div className="px-3 py-2 border-t border-amber-200 flex gap-2">
        <button
          onClick={() => handleRespond('allow')}
          disabled={responding}
          className="px-3 py-1 text-[11px] font-semibold rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 cursor-pointer"
          aria-label="Allow tool"
          tabIndex={0}
        >
          Allow
        </button>
        <button
          onClick={() => handleRespond('deny')}
          disabled={responding}
          className="px-3 py-1 text-[11px] font-semibold rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 cursor-pointer"
          aria-label="Deny tool"
          tabIndex={0}
        >
          Deny
        </button>
      </div>
    </div>
  )
}
