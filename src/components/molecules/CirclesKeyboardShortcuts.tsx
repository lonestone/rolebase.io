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
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

export default function CirclesKeyboardShortcuts(boxProps: BoxProps) {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box {...boxProps}>
      <Button
        variant="link"
        colorScheme="gray"
        rightIcon={isOpen ? <FiChevronDown /> : <FiChevronUp />}
        onClick={onToggle}
      >
        Raccourcis clavier
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <VStack mt={2} spacing={2} align="stretch">
          <StackItem>
            <Kbd>⌘</Kbd> + <Kbd>Click</Kbd> : Déplacer un cercle
          </StackItem>
          <StackItem>
            <Kbd>⌘</Kbd> + <Kbd size="xl">⇧</Kbd> + <Kbd>Click</Kbd> : Copier un
            cercle
          </StackItem>
        </VStack>
      </Collapse>
    </Box>
  )
}
