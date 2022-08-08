import {
  Box,
  Button,
  ButtonProps,
  Circle,
  useColorMode,
} from '@chakra-ui/react'
import { headerHeight } from '@components/organisms/layout/Header'
import React, { ReactElement } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface Props extends ButtonProps {
  to: string
  exact?: boolean
  icon: ReactElement
  alert?: boolean
}

export default function HeaderButton({
  to,
  exact,
  icon,
  alert,
  children,
  ...buttonProps
}: Props) {
  const { colorMode } = useColorMode()
  const location = useLocation()

  const toPathname = to.match(/^[^?]*/)![0]
  const isActive = exact
    ? location.pathname === toPathname
    : location.pathname.startsWith(toPathname)

  return (
    <Link to={to} tabIndex={-1}>
      <Button
        size="sm"
        variant="ghost"
        isActive={isActive}
        fontWeight={600}
        display="inline-flex"
        flexDirection="column"
        justifyContent="space-evenly"
        h={`${headerHeight - 8}px`}
        px={4}
        color={colorMode === 'light' ? 'gray.500' : 'whiteAlpha.600'}
        _hover={{
          color: colorMode === 'light' ? 'gray.550' : 'whiteAlpha.800',
        }}
        _active={{
          color: colorMode === 'light' ? 'gray.900' : 'white',
          bg: colorMode === 'light' ? 'gray.100' : 'whiteAlpha.100',
        }}
        {...buttonProps}
      >
        <Box position="relative">
          {alert && (
            <Circle
              size="8px"
              position="absolute"
              top="-3px"
              right="-3px"
              bg="red.400"
              _dark={{ bg: 'red.600' }}
            />
          )}
          {icon}
        </Box>
        {children}
      </Button>
    </Link>
  )
}
