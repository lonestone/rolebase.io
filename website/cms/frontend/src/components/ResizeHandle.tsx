import React from 'react'

interface Props {
  onMouseDown: (e: React.MouseEvent) => void
  side: 'left' | 'right'
}

export function ResizeHandle({ onMouseDown, side }: Props) {
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      onMouseDown={onMouseDown}
      className={`w-1 cursor-col-resize bg-bg-panel shrink-0 relative hover:bg-primary/30 ${
        side === 'left' ? 'border-l border-border' : 'border-r border-border'
      }`}
    />
  )
}
