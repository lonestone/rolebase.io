import { Box } from '@chakra-ui/react'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { useElementSize } from '../hooks/useElementSize'
import useWindowSize from '../hooks/useWindowSize'

export interface OverflowContainerParams {
  expandRight?: boolean
  expandLeft?: boolean
  expandBottom?: boolean
}

interface Props extends OverflowContainerParams {
  children: ReactNode
}

interface Position {
  top: number
  left: number
  width: number
}

export default function OverflowContainer({
  expandRight,
  expandLeft,
  expandBottom,
  children,
}: Props) {
  const placeholderRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const contentSize = useElementSize(contentRef)
  const windowSize = useWindowSize()
  const [position, setPosition] = useState<Position | undefined>()

  // Update box position when content or window size changes
  useEffect(() => {
    const placeholder = placeholderRef.current
    if (!placeholder) return
    setPosition({
      top: placeholder.offsetTop,
      left: placeholder.offsetLeft,
      width: placeholder.offsetWidth,
    })
  }, [
    contentSize?.width,
    contentSize?.height,
    windowSize.width,
    windowSize.height,
  ])

  if (!expandRight && !expandLeft && !expandBottom) {
    return <>{children}</>
  }

  return (
    <Box
      ref={placeholderRef}
      h={expandBottom ? undefined : contentSize?.height}
    >
      <Box
        overflowX="auto"
        overflowY={expandBottom ? 'auto' : 'hidden'}
        position="absolute"
        width={
          !expandRight && position
            ? position.width + (expandLeft ? position.left : 0)
            : undefined
        }
        top={expandBottom ? `${position?.top}px` : undefined}
        right={expandRight ? 0 : undefined}
        left={expandLeft ? 0 : `${position?.left}px`}
        bottom={expandBottom ? 0 : undefined}
      >
        <Box
          ref={contentRef}
          pl={expandLeft ? 5 : 0}
          pr={expandRight ? 5 : 0}
          minW="min-content"
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
