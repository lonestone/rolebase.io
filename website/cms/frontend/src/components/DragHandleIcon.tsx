import React from 'react'

interface Props {
  style?: React.CSSProperties
}

export function DragHandleIcon({ style }: Props) {
  return (
    <svg
      width="10"
      height="14"
      viewBox="0 0 10 14"
      fill="currentColor"
      style={style}
      aria-hidden
    >
      <circle cx="3" cy="2" r="1.2" />
      <circle cx="7" cy="2" r="1.2" />
      <circle cx="3" cy="7" r="1.2" />
      <circle cx="7" cy="7" r="1.2" />
      <circle cx="3" cy="12" r="1.2" />
      <circle cx="7" cy="12" r="1.2" />
    </svg>
  )
}
