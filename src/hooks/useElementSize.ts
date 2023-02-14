import { RefObject, useEffect, useState } from 'react'

interface Size {
  width: number
  height: number
}

export function useElementSize(ref: RefObject<HTMLElement>): Size | undefined {
  const [size, setSize] = useState<Size | undefined>()

  useEffect(() => {
    const box = ref.current
    if (!box) return

    // Observe content size to detect scrollHeight change
    const observer = new ResizeObserver(() => {
      setSize({
        width: box.offsetWidth,
        height: box.offsetHeight,
      })
    })
    observer.observe(box)
    return () => observer.disconnect()
  }, [])

  return size
}
