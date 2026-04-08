import React from 'react'

interface Props {
  open: boolean
}

export function Arrow({ open }: Props) {
  return (
    <span
      className="inline-block transition-transform text-[10px]"
      style={{ transform: open ? 'rotate(90deg)' : '' }}
    >
      &#9654;
    </span>
  )
}
