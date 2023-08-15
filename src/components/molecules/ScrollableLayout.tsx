import GlassBox from '@atoms/GlassBox'
import { Box, BoxProps, IconButton } from '@chakra-ui/react'
import { useElementSize } from '@hooks/useElementSize'
import useScrollable, { ScrollPosition } from '@hooks/useScrollable'
import React, { useRef } from 'react'
import { FiArrowDown, FiArrowUp } from 'react-icons/fi'

interface Props extends BoxProps {
  header?: React.ReactElement
  content: React.ReactElement
  footer?: React.ReactElement
}

export default function ScrollableLayout({
  header,
  content,
  footer,
  ...boxProps
}: Props) {
  // Scrollable content
  const topRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const topSize = useElementSize(topRef)
  const bottomSize = useElementSize(bottomRef)
  const {
    containerRef,
    contentRef,
    isScrollable,
    scrollPosition,
    handleScroll,
  } = useScrollable()

  return (
    <Box
      bg="gray.50"
      _dark={{ bg: 'gray.800' }}
      position="relative"
      display="flex"
      flexDirection="column"
      {...boxProps}
    >
      {content && (
        <Box
          ref={containerRef}
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          my="5px"
          overflowY="scroll"
          onScroll={handleScroll}
        >
          <Box h={`${(topSize?.height || 0) - 5}px`} />
          <Box ref={contentRef}>{content}</Box>
          <Box h={`${(bottomSize?.height || 0) - 5}px`} />
        </Box>
      )}

      {/* Buttons to scroll to top/bottom */}
      {isScrollable && scrollPosition !== ScrollPosition.Top && (
        <IconButton
          aria-label="Scroll to top"
          position="absolute"
          top={`${(topSize?.height || 0) + 10}px`}
          right="30px"
          icon={<FiArrowUp />}
          onClick={() => {
            containerRef.current?.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }}
        />
      )}
      {isScrollable && scrollPosition !== ScrollPosition.Bottom && (
        <IconButton
          aria-label="Scroll to bottom"
          position="absolute"
          bottom={`${(bottomSize?.height || 0) + 10}px`}
          right="30px"
          icon={<FiArrowDown />}
          onClick={() => {
            containerRef.current?.scrollTo({
              top: containerRef.current?.scrollHeight,
              behavior: 'smooth',
            })
          }}
        />
      )}

      <GlassBox
        ref={topRef}
        visibility={header ? 'visible' : 'hidden'}
        zIndex={10}
        display="flex"
        w="100%"
        px={5}
        py={2}
        borderTopRadius="lg"
        borderBottomWidth={1}
      >
        {header}
      </GlassBox>

      <Box flex={1} />

      <GlassBox
        ref={bottomRef}
        visibility={footer ? 'visible' : 'hidden'}
        zIndex={10}
        p={5}
        borderBottomRadius="lg"
        borderTopWidth={
          isScrollable && scrollPosition !== ScrollPosition.Bottom ? 3 : 1
        }
      >
        {footer}
      </GlassBox>
    </Box>
  )
}
