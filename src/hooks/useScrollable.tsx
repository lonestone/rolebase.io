import React, { useCallback, useEffect, useRef, useState } from 'react'

export enum ScrollPosition {
  None, // Not enough content to scroll
  Top,
  Bottom,
  Middle,
}

export default function useScrollable() {
  // Scroll handling
  const [isScrollable, setIsScrollable] = useState(false)
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>(
    ScrollPosition.Bottom
  )

  // Elements should be there at first render for their refs to be available
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleScroll: React.UIEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
      if (scrollTop === 0) {
        setScrollPosition(ScrollPosition.Top)
      } else if (scrollTop + clientHeight < scrollHeight) {
        if (scrollPosition !== ScrollPosition.Middle) {
          setScrollPosition(ScrollPosition.Middle)
        }
      } else {
        setScrollPosition(ScrollPosition.Bottom)
      }
    },
    [scrollPosition]
  )

  // Scroll to end when activities change and scroll position in set to bottom
  useEffect(() => {
    const content = contentRef?.current
    const container = containerRef?.current
    if (!content || !container) return

    const onResize = () =>
      // Wait for layout to be done
      setTimeout(() => {
        // Keep scroll position at bottom
        if (container && scrollPosition === ScrollPosition.Bottom) {
          if (container.scrollHeight === container.clientHeight) {
            setIsScrollable(false)
          } else {
            setIsScrollable(true)
            container.scrollTop =
              container.scrollHeight - container.clientHeight
          }
        }
      }, 0)

    // Observe content size to detect scrollHeight change
    const observer = new ResizeObserver(onResize)
    observer.observe(content)
    return () => observer.disconnect()
  }, [scrollPosition])

  return {
    containerRef,
    contentRef,
    isScrollable,
    scrollPosition,
    handleScroll,
  }
}
