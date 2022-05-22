import { Box, Heading, useColorMode } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { Droppable } from 'react-beautiful-dnd'

interface Props {
  id: string
  title: string
  children: ReactNode
}

export function KanbanColumn({ id, title, children }: Props) {
  const { colorMode } = useColorMode()

  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <Box
          w="17em"
          minW="17em"
          bg={
            snapshot.isDraggingOver
              ? colorMode === 'light'
                ? 'gray.100'
                : 'whiteAlpha.100'
              : colorMode === 'light'
              ? 'gray.50'
              : 'whiteAlpha.50'
          }
          transition="background-color 0.2s ease"
          borderRadius="md"
          userSelect="none"
        >
          <Heading as="h3" size="sm" my={4} ml={3}>
            {title}
          </Heading>
          <Box
            ref={provided.innerRef}
            minH={150}
            p={2}
            pt={0}
            {...provided.droppableProps}
          >
            {children}
            {provided.placeholder}
          </Box>
        </Box>
      )}
    </Droppable>
  )
}
