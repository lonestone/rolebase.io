import { Box, BoxProps } from '@chakra-ui/react'
import React from 'react'

interface Props extends BoxProps {
  width: number
  onResizing(resizing: boolean): void
  onWidthChange(width: number): void
}

export default function SidebarResizeHandle({
  width,
  onResizing,
  onWidthChange,
  ...boxProps
}: Props) {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    const startX = e.clientX
    const startWidth = width
    onResizing(true)

    const handleMouseMove = (e: MouseEvent) => {
      const diff = e.clientX - startX
      onWidthChange(startWidth + diff)
    }

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      onResizing(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    const startX = e.touches[0].clientX
    const startWidth = width
    onResizing(true)

    const handleTouchMove = (e: TouchEvent) => {
      const diff = e.touches[0].clientX - startX
      onWidthChange(startWidth + diff)
    }

    const handleTouchEnd = () => {
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      onResizing(false)
    }

    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)
  }

  if (!width) return null

  return (
    <Box
      position="absolute"
      top={0}
      left={`${width}px`}
      ml="-6px"
      w="12px"
      h="100%"
      cursor="ew-resize"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      {...boxProps}
    ></Box>
  )
}
