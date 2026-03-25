import React, { useMemo } from 'react'
import { diffLines } from 'diff'

interface Props {
  oldStr: string
  newStr: string
}

export function DiffView({ oldStr, newStr }: Props) {
  const changes = useMemo(() => diffLines(oldStr ?? '', newStr ?? ''), [oldStr, newStr])

  return (
    <div className="font-mono text-[10px] leading-relaxed">
      {changes.map((change, i) => {
        const lines = change.value.replace(/\n$/, '').split('\n')
        return lines.map((line, j) => (
          <div
            key={`${i}-${j}`}
            className={
              change.added
                ? 'bg-green-100 text-green-900'
                : change.removed
                  ? 'bg-red-100 text-red-900'
                  : 'text-blue-900 opacity-50'
            }
          >
            <span className="select-none inline-block w-3 text-center opacity-60">
              {change.added ? '+' : change.removed ? '-' : ' '}
            </span>
            {line}
          </div>
        ))
      })}
    </div>
  )
}
