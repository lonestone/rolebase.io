import React, { useState, useEffect, useCallback, useRef } from 'react'

interface UseResizablePanelOptions {
  storageKey: string
  defaultWidth: number
  minWidth?: number
  maxWidth?: number
  /** 'left' means the resize handle is on the left edge (right-side panels), 'right' means on the right edge (left-side panels like sidebar) */
  side: 'left' | 'right'
}

export function useResizablePanel({
  storageKey,
  defaultWidth,
  minWidth = 150,
  maxWidth = 800,
  side,
}: UseResizablePanelOptions) {
  const [width, setWidth] = useState(() => {
    const stored = localStorage.getItem(storageKey)
    return stored
      ? Math.max(minWidth, Math.min(maxWidth, Number(stored)))
      : defaultWidth
  })

  const draggingRef = useRef(false)
  const startXRef = useRef(0)
  const startWidthRef = useRef(0)

  useEffect(() => {
    localStorage.setItem(storageKey, String(width))
  }, [storageKey, width])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      draggingRef.current = true
      startXRef.current = e.clientX
      startWidthRef.current = width
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'

      function handleMouseMove(e: MouseEvent) {
        if (!draggingRef.current) return
        const delta = e.clientX - startXRef.current
        const newWidth =
          side === 'right'
            ? startWidthRef.current + delta
            : startWidthRef.current - delta
        setWidth(Math.max(minWidth, Math.min(maxWidth, newWidth)))
      }

      function handleMouseUp() {
        draggingRef.current = false
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    },
    [width, minWidth, maxWidth, side]
  )

  return { width, handleMouseDown }
}
