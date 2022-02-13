import { chakra, List, ListItem, Text } from '@chakra-ui/react'
import { diffChars } from 'diff'
import React, { useMemo } from 'react'
import { FiArrowRight } from 'react-icons/fi'

interface Props {
  obj: Object
  compareObj?: Object
}

const priorityKeys = ['id', 'name']

// Show the properties of an object recursively
// With highlighted changes (optional)

export function ObjectProperties({ obj, compareObj }: Props) {
  // Sort keys by priority
  const keys = useMemo(
    () =>
      Object.keys(obj).sort((a, b) => {
        let i = priorityKeys.indexOf(a)
        let j = priorityKeys.indexOf(b)
        if (i === -1) i = priorityKeys.length
        if (j === -1) j = priorityKeys.length
        return i - j
      }),
    [obj]
  )

  return (
    <List ml={3}>
      {keys.map((key) => {
        const value = obj[key as keyof typeof obj]
        const compareValue = compareObj?.[key as keyof typeof compareObj]
        return (
          <ListItem key={key}>
            <Text color="gray.500" display="inline">
              {key}
              {': '}
            </Text>

            {value === null ? (
              <i>null</i>
            ) : typeof value === 'object' ? (
              <ObjectProperties
                obj={value}
                compareObj={compareObj?.[key as keyof typeof compareObj]}
              />
            ) : typeof value === 'string' &&
              typeof compareValue === 'string' ? (
              <>
                "
                {diffChars(compareValue, value).map((part, index) => {
                  const color = part.added
                    ? 'green'
                    : part.removed
                    ? 'red'
                    : undefined
                  return (
                    <chakra.span key={index} color={color}>
                      {part.value}
                    </chakra.span>
                  )
                })}
                "
              </>
            ) : compareValue !== undefined ? (
              <>
                {JSON.stringify(compareValue)}
                <FiArrowRight
                  style={{
                    display: 'inline',
                    margin: '-3px 5px 0 5px',
                    verticalAlign: 'middle',
                  }}
                />
                {JSON.stringify(value)}
              </>
            ) : (
              JSON.stringify(value)
            )}
          </ListItem>
        )
      })}
    </List>
  )
}
