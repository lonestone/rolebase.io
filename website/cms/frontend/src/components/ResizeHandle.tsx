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
      style={{
        width: 4,
        cursor: 'col-resize',
        background: 'transparent',
        flexShrink: 0,
        position: 'relative',
        [`border${side === 'left' ? 'Left' : 'Right'}`]: '1px solid var(--border)',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLElement).style.background = 'var(--primary)'
        ;(e.currentTarget as HTMLElement).style.opacity = '0.3'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLElement).style.background = 'transparent'
        ;(e.currentTarget as HTMLElement).style.opacity = '1'
      }}
    />
  )
}
