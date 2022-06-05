import { Box, BoxProps } from '@chakra-ui/react'
import { useElementSize } from '@hooks/useElementSize'
import React, { useEffect, useRef, useState } from 'react'

export interface OverflowContainerProps extends BoxProps {
  expandRight?: boolean
  expandLeft?: boolean
  expandBottom?: boolean
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
  ...boxProps
}: OverflowContainerProps) {
  const placeholderRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const contentSize = useElementSize(contentRef)
  const [position, setPosition] = useState<Position | undefined>()

  useEffect(() => {
    const placeholder = placeholderRef.current
    if (!placeholder) return
    setPosition({
      top: placeholder.offsetTop,
      left: placeholder.offsetLeft,
      width: placeholder.offsetWidth,
    })
  }, [contentSize?.width, contentSize?.height])

  return (
    <Box
      ref={placeholderRef}
      h={expandBottom ? undefined : contentSize?.height}
    >
      <Box
        {...boxProps}
        overflowX="auto"
        overflowY={expandBottom ? 'auto' : 'hidden'}
        position="absolute"
        width={
          !expandRight && position
            ? position.width + (expandLeft ? position.left : 0)
            : undefined
        }
        top={expandBottom ? position?.top : undefined}
        right={expandRight ? 0 : undefined}
        left={expandLeft ? 0 : position?.left}
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
