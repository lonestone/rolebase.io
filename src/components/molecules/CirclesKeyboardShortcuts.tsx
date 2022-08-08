import {
  Box,
  BoxProps,
  Button,
  Collapse,
  Kbd,
  StackItem,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

export default function CirclesKeyboardShortcuts(boxProps: BoxProps) {
  const { t } = useTranslation()
  const { isOpen, onToggle } = useDisclosure()

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
            <Kbd>⌘</Kbd> + <Kbd>Click</Kbd>
            {t('CirclesKeyboardShortcuts.CmdClick')}
          </StackItem>
          <StackItem>
            <Kbd>⌘</Kbd> + <Kbd size="xl">⇧</Kbd> + <Kbd>Click</Kbd>
            {t('CirclesKeyboardShortcuts.CmdShiftClick')}
          </StackItem>
        </VStack>
      </Collapse>
    </Box>
  )
}
