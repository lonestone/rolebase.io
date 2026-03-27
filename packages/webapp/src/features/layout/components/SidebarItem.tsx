import {
  Box,
  Button,
  ButtonProps,
  HTMLChakraProps,
  Spacer,
  forwardRef,
} from '@chakra-ui/react'
import { Icon } from 'iconsax-react'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { AddIcon } from 'src/icons'
import SidebarIcon from './SidebarIcon'

export interface SidebarItemProps extends ButtonProps {
  icon?: Icon
  iconNode?: React.ReactNode
  isPathExact?: boolean
  isPathStart?: boolean
  alert?: boolean
  onAdd?: () => void
}

export default forwardRef(function SidebarItem(
  {
    icon,
    iconNode,
    isPathExact,
    isPathStart,
    alert,
    children,
    onAdd,
    ...buttonProps
  }: SidebarItemProps,
  ref
) {
  const { t } = useTranslation()

  const handleAddClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      event.preventDefault()
      onAdd?.()
    },
    [onAdd]
  )

  return (
    <Button
      ref={ref}
      variant="unstyled"
      w="100%"
      h="auto"
      py={3}
      fontWeight="normal"
      display="flex"
      justifyContent="start"
      textAlign="left"
      borderRadius="xl"
      _hover={{ bg: 'whiteAlpha.600' }}
      _active={{
        fontWeight: 'semibold',
        bg: 'white',
      }}
      _dark={{
        color: 'whiteAlpha.800',
        _hover: {
          bg: 'whiteAlpha.50',
        },
        _active: {
          color: 'white',
          bg: 'whiteAlpha.100',
        },
      }}
      isActive={isPathExact}
      {...buttonProps}
    >
      {icon ? (
        <SidebarIcon
          icon={icon}
          isActive={isPathStart}
          alert={alert}
          ml={4}
          mr={3}
        />
      ) : (
        iconNode
      )}

      {children}

      <Spacer />
      {onAdd && (
        <Box
          as="span"
          role="button"
          tabIndex={0}
          aria-label={t('common.add')}
          onClick={handleAddClick}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onAdd()
            }
          }}
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="md"
          p={1}
          mr={2}
          color="gray"
          cursor="pointer"
          _hover={{
            color: 'black',
            bg: 'blackAlpha.100',
            _dark: {
              color: 'white',
              bg: 'whiteAlpha.200',
            },
          }}
        >
          <AddIcon size={20} />
        </Box>
      )}
    </Button>
  )
})

export const sidebarSubItemProps: HTMLChakraProps<any> = {
  pl: '50.25px',
  borderRadius: 'md',

  _hover: { bg: 'whiteAlpha.600' },
  _dark: {
    color: 'whiteAlpha.800',
    _hover: {
      bg: 'whiteAlpha.50',
    },
  },
  sx: {
    '&.active': {
      bg: 'white',
      _dark: {
        color: 'white',
        bg: 'whiteAlpha.100',
      },
    },
  },
}
