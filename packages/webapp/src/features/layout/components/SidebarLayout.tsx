import { Box, IconButton, Tooltip, useDisclosure } from '@chakra-ui/react'
import React, { useContext, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { ChevronRightIcon, MenuIcon } from 'src/icons'
import { SidebarContext, defaultSidebarWidth } from '../contexts/SidebarContext'

interface Props {
  children: React.ReactNode
}

export default function SidebarLayout({ children }: Props) {
  const { t } = useTranslation()
  const open = useDisclosure()

  // Get Sidebar context
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('SidebarContext not found in Sidebar')
  }
  const { isMobile, expand, minimize, width, height } = context

  const handleLock = () => {
    minimize.onClose()
    open.onClose()
  }

  // Close menu (mobile) on location change
  const location = useLocation()
  useEffect(() => {
    expand.onClose()
    open.onClose()
  }, [location.pathname])

  // Detect mouse on the left side to open sidebar when minimized
  const openRef = useRef(open)
  useEffect(() => {
    openRef.current = open
  }, [open])

  useEffect(() => {
    if (minimize.isOpen) {
      const handleMouseMove = (event: MouseEvent) => {
        const maxWidth = openRef.current.isOpen ? defaultSidebarWidth : 30
        if (event.clientX < maxWidth) {
          openRef.current.onOpen()
        } else {
          openRef.current.onClose()
        }
      }
      document.addEventListener('mousemove', handleMouseMove)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [minimize.isOpen])

  return (
    <>
      {minimize.isOpen && (
        <Box position="fixed" top={1} left={1} zIndex={1000}>
          <Tooltip label={t('Sidebar.lock')} placement="right">
            <IconButton
              aria-label="Lock sidebar open"
              variant="ghost"
              icon={open.isOpen ? <ChevronRightIcon size={18} /> : <MenuIcon />}
              onClick={handleLock}
            />
          </Tooltip>
        </Box>
      )}

      <Box
        position="fixed"
        display="flex"
        flexDirection="column"
        alignItems="stretch"
        top={!isMobile && minimize.isOpen ? 12 : 0}
        bottom={!isMobile && minimize.isOpen ? 12 : 0}
        left={0}
        zIndex={1000}
        w={
          isMobile
            ? '100%'
            : `${minimize.isOpen ? defaultSidebarWidth : width}px`
        }
        h={isMobile && !expand.isOpen ? height + 1 : undefined}
        transition="transform 0.2s ease-in-out, width 0.2s ease-in-out"
        transform={
          !isMobile && minimize.isOpen && !open.isOpen
            ? 'translateX(-100%)'
            : 'none'
        }
        borderRightRadius={!isMobile && minimize.isOpen ? 'lg' : 0}
        borderWidth={!isMobile && minimize.isOpen ? '1px' : 0}
        borderLeft={0}
        bg="menulight"
        _dark={{ bg: 'menudark' }}
        sx={{
          '@media print': {
            display: 'none',
          },
        }}
      >
        {children}
      </Box>
    </>
  )
}
