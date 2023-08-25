import React, { useCallback, useEffect, useRef, useState } from 'react'

export enum ScrollPosition {
  None, // Not enough content to scroll
  Top,
  Bottom,
  Middle,
}

export default function useScrollable() {
  // Scroll state
  const [isScrollable, setIsScrollable] = useState(false)
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>(
    ScrollPosition.Top
  )

  // Ref to keep following functions deps empty
  const scrollPositionRef = useRef(scrollPosition)

  const setPosition = (position: ScrollPosition) => {
    setScrollPosition(position)
    scrollPositionRef.current = position
  }

  // Elements should be there at first render for their refs to be available
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleScroll: React.UIEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
      if (scrollTop === 0) {
        setPosition(ScrollPosition.Top)
      } else if (scrollTop + clientHeight + 1 < scrollHeight) {
        if (scrollPositionRef.current !== ScrollPosition.Middle) {
          setPosition(ScrollPosition.Middle)
        }
      } else {
        setPosition(ScrollPosition.Bottom)
      }
    },
    []
  )

  // Scroll to bottom when content size changes and scroll position in set to bottom
  useEffect(() => {
    const content = contentRef?.current
    const container = containerRef?.current
    if (!content || !container) {
      console.error('useScrollable: content or container ref is null')
      return
    }

    const onResize = () =>
      // Wait for layout to be done
      setTimeout(() => {
        // Keep scroll position at bottom
        const scrollable = container.scrollHeight !== container.clientHeight
        setIsScrollable(scrollable)
        if (scrollable && scrollPositionRef.current === ScrollPosition.Bottom) {
          container.scrollTop = container.scrollHeight - container.clientHeight
        }
      }, 0)

    // Observe content size to detect scrollHeight change
    const observer = new ResizeObserver(onResize)
    observer.observe(content)
    return () => observer.disconnect()
  }, [])

  return {
    containerRef,
    contentRef,
    isScrollable,
    scrollPosition,
    handleScroll,
  }
}
