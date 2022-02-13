import { Box, Tag, Text } from '@chakra-ui/react'
import { EntityChange, EntityChangeType } from '@shared/log'
import React from 'react'
import { ObjectProperties } from './ObjectProperties'

interface Props<Entity> {
  type: string
  entityChange: EntityChange<Entity>
}

export default function LogEntityChanges<Entity>({
  type,
  entityChange,
}: Props<Entity>) {
  return (
    <Box>
      <Text fontSize="sm" color="gray.500">
        <Tag
          size="sm"
          colorScheme={
            entityChange.type === EntityChangeType.Create
              ? 'green'
              : entityChange.type === EntityChangeType.Update
              ? 'blue'
              : 'red'
          }
        >
          {entityChange.type}
        </Tag>{' '}
        {type} / {entityChange.id}
      </Text>

      {entityChange.type === EntityChangeType.Create && (
        <ObjectProperties obj={entityChange.data} />
      )}

      {entityChange.type === EntityChangeType.Update && (
        <ObjectProperties
          obj={entityChange.newData}
          compareObj={entityChange.prevData}
        />
      )}
    </Box>
  )
}
