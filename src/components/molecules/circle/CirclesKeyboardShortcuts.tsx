import {
  Box,
  BoxProps,
  Collapse,
  IconButton,
  Kbd,
  StackItem,
  useDisclosure,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react'
import useOrgMember from '@hooks/useOrgMember'
import { cmdOrCtrlKey } from '@utils/env'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaKeyboard } from 'react-icons/fa'

export default function CirclesKeyboardShortcuts(boxProps: BoxProps) {
  const { t } = useTranslation()
  const { isOpen, onToggle } = useDisclosure()
  const [isSmallScreen] = useMediaQuery('(max-width: 600px)')
  const isMember = useOrgMember()

  if (isSmallScreen || !isMember) {
    return null
  }

  return (
    <Box pointerEvents="none" {...boxProps}>
      <IconButton
        variant="ghost"
        aria-label={t('CirclesKeyboardShortcuts.label')}
        pointerEvents="auto"
        icon={<FaKeyboard />}
        onClick={onToggle}
      />
      <Collapse in={isOpen} animateOpacity>
        <VStack
          mt={2}
          spacing={2}
          align="stretch"
          fontSize="sm"
          pointerEvents="auto"
        >
          <StackItem>
            <Kbd>{cmdOrCtrlKey}</Kbd> + <Kbd>Click</Kbd>
            {t('CirclesKeyboardShortcuts.CmdClick')}
          </StackItem>
          <StackItem>
            <Kbd>{cmdOrCtrlKey}</Kbd> + <Kbd size="xl">⇧</Kbd> +{' '}
            <Kbd>Click</Kbd>
            {t('CirclesKeyboardShortcuts.CmdShiftClick')}
          </StackItem>
        </VStack>
      </Collapse>
    </Box>
  )
}
