import { Box, BoxProps } from '@chakra-ui/react'
import { UserLocalStorageKeys } from '@utils/localStorage'
import debounce from 'lodash.debounce'
import React, { useContext } from 'react'
import {
  SidebarContext,
  sidebarMaxWidth,
  sidebarMinWidth,
} from '../contexts/SidebarContext'

export default function SidebarResizeHandle(boxProps: BoxProps) {
  // Get Sidebar context
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('SidebarContext not found in Sidebar')
  }

  const { width, setWidth } = context

  const saveWidth = debounce((width: number) => {
    localStorage.setItem(UserLocalStorageKeys.SidebarWidth, `${width}`)
  }, 500)

  const changeWidth = (width: number) => {
    width = Math.max(sidebarMinWidth, Math.min(sidebarMaxWidth, width))
    setWidth(width)
    saveWidth(width)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    const startX = e.clientX
    const startWidth = width

    const handleMouseMove = (e: MouseEvent) => {
      const diff = e.clientX - startX
      changeWidth(startWidth + diff)
    }

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    const startX = e.touches[0].clientX
    const startWidth = width

    const handleTouchMove = (e: TouchEvent) => {
      const diff = e.touches[0].clientX - startX
      changeWidth(startWidth + diff)
    }

    const handleTouchEnd = () => {
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
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
