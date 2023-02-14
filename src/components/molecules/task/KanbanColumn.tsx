import { Box, Heading, Tag, ThemingProps } from '@chakra-ui/react'
import { Droppable } from '@hello-pangea/dnd'
import React, { ReactNode } from 'react'

interface Props {
  id: string
  title: string
  count?: number
  colorScheme?: ThemingProps['colorScheme']
  children: ReactNode
}

export function KanbanColumn({
  id,
  title,
  colorScheme,
  count,
  children,
}: Props) {
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <Box>
          <Heading
            as="h3"
            size="sm"
            mb={2}
            ml={3}
            display="flex"
            alignItems="center"
          >
            {title}
            {count !== undefined && (
              <Tag
                variant="outline"
                size="sm"
                opacity={count ? 0.9 : 0.3}
                ml={2}
              >
                {count}
              </Tag>
            )}
          </Heading>

          <Box
            w="17em"
            minW="17em"
            transition="background-color 0.2s ease"
            borderRadius="md"
            userSelect="none"
            bg={
              snapshot.isDraggingOver
                ? `${colorScheme}.100`
                : `linear-gradient(170deg, var(--chakra-colors-${colorScheme}-100), transparent)`
            }
            _dark={{
              bg: snapshot.isDraggingOver
                ? `${colorScheme}.700`
                : `linear-gradient(170deg, var(--chakra-colors-${colorScheme}-700), transparent)`,
            }}
          >
            <Box
              h="6px"
              borderTopRadius="full"
              bg={`${colorScheme}.400`}
              _dark={{ bg: `${colorScheme}.700` }}
            />
            <Box
              ref={provided.innerRef}
              minH={150}
              p={2}
              {...provided.droppableProps}
            >
              {children}
              {provided.placeholder}
            </Box>
          </Box>
        </Box>
      )}
    </Droppable>
  )
}
