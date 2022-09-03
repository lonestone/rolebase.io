import {
  Box,
  BoxProps,
  Button,
  Collapse,
  Kbd,
  StackItem,
  useDisclosure,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react'
import useOrgMember from '@hooks/useOrgMember'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { cmdOrCtrlKey } from 'src/utils'

export default function CirclesKeyboardShortcuts(boxProps: BoxProps) {
  const { t } = useTranslation()
  const { isOpen, onToggle } = useDisclosure()
  const [isSmallScreen] = useMediaQuery('(max-width: 600px)')
  const isMember = useOrgMember()

  if (isSmallScreen || !isMember) {
    return null
  }

  return (
    <Box {...boxProps}>
      <Button
        variant="link"
        colorScheme="gray"
        rightIcon={isOpen ? <FiChevronDown /> : <FiChevronUp />}
        onClick={onToggle}
      >
        {t('CirclesKeyboardShortcuts.label')}
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <VStack mt={2} spacing={2} align="stretch">
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
