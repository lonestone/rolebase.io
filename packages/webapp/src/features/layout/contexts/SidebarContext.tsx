import { useDisclosure, useMediaQuery } from '@chakra-ui/react'
import { UserLocalStorageKeys } from '@utils/localStorage'
import debounce from 'lodash.debounce'
import React, { createContext, useCallback, useMemo, useState } from 'react'

// Width of sidebar
const sidebarMinWidth = 250
const sidebarMaxWidth = 600
export const defaultSidebarWidth = 336

export const getSidebarWidth = () => {
  const retrievedSidebarWidth = localStorage.getItem(
    UserLocalStorageKeys.SidebarWidth
  )
  return retrievedSidebarWidth
    ? parseInt(retrievedSidebarWidth, 0)
    : defaultSidebarWidth
}

// Top bar height on mobile
export const defaultSidebarHeight = 50

interface SidebarContextValue {
  isMobile: boolean
  expand: ReturnType<typeof useDisclosure>
  minimize: ReturnType<typeof useDisclosure>
  width: number
  height: number
  setWidth(width: number): void
  setHeight(height: number): void
}

export const SidebarContext = createContext<SidebarContextValue | undefined>(
  undefined
)

interface SidebarProviderProps {
  children: React.ReactNode
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const expand = useDisclosure()
  const minimize = useDisclosure()
  const [width, setWidth] = useState<number>(getSidebarWidth)
  const [height, setHeight] = useState<number>(0)

  const saveWidth = debounce((width: number) => {
    localStorage.setItem(UserLocalStorageKeys.SidebarWidth, `${width}`)
  }, 500)

  const handleSetWidth = useCallback((width: number) => {
    if (width > 0) {
      width = Math.max(sidebarMinWidth, Math.min(sidebarMaxWidth, width))
      saveWidth(width)
    }
    setWidth(width)
  }, [])

  // Show different layout for small screens
  // Options are then hidden by default
  const [isMobile] = useMediaQuery('(max-width: 768px)')

  const value = useMemo(
    () => ({
      isMobile,
      expand,
      minimize,
      width: isMobile || minimize.isOpen ? 0 : width,
      height: isMobile ? defaultSidebarHeight : 0,
      setWidth: handleSetWidth,
      setHeight,
    }),
    [expand.isOpen, minimize.isOpen, isMobile, width, height]
  )

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  )
}
