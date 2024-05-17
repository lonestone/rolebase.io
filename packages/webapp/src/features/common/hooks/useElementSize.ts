import { RefObject, useEffect, useState } from 'react'

interface Size {
  width: number
  height: number
}

export function useElementSize(ref: RefObject<HTMLElement>): Size | undefined {
  const [size, setSize] = useState<Size | undefined>()

  useEffect(() => {
    // Observe content size to detect scrollHeight change
    const observer = new ResizeObserver(() => {
      if (ref.current) {
        setSize({
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight,
        })
      }
    })
    if (ref.current) {
      observer.observe(ref.current)
    } else {
      setTimeout(() => {
        if (ref.current) {
          observer.observe(ref.current)
        }
      }, 100)
    }
    return () => observer.disconnect()
  }, [])

  return size
}
