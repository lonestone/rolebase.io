import {
  Button,
  ButtonProps,
  HTMLChakraProps,
  IconButton,
  Spacer,
  forwardRef,
} from '@chakra-ui/react'
import { Icon } from 'iconsax-react'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { AddIcon } from 'src/icons'
import SidebarIcon from './SidebarIcon'

export interface SidebarItemProps extends ButtonProps {
  icon: Icon
  isPathExact?: boolean
  isPathStart?: boolean
  alert?: boolean
  onAdd?: () => void
}

export default forwardRef(function SidebarItem(
  {
    icon,
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
      <SidebarIcon
        icon={icon}
        isActive={isPathStart}
        alert={alert}
        ml={4}
        mr={3}
      />

      {children}

      <Spacer />
      {onAdd && (
        <IconButton
          aria-label={t('common.add')}
          icon={<AddIcon size={20} />}
          onClick={handleAddClick}
          variant="ghost"
          size="sm"
          color="gray"
          mr={2}
          _hover={{
            color: 'black',
            _dark: {
              color: 'white',
            },
          }}
        />
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
