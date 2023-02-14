import { chakra, List, ListItem, Text } from '@chakra-ui/react'
import { diffChars } from 'diff'
import isEqual from 'lodash.isequal'
import React, { ReactNode, useMemo } from 'react'
import { FiArrowRight } from 'react-icons/fi'

type Value = Object | Value[] | string | number | boolean | null

interface CompareProps<T> {
  value: T
  compareValue?: T
}

const priorityKeys = ['id', 'name']

// Show the properties of an object recursively
// With highlighted changes (optional)

export function ObjectDiff({
  value: obj,
  compareValue: compareObj,
}: CompareProps<Object>) {
  // Sort keys by priority
  const keys = useMemo(
    () =>
      Object.keys(obj)
        // Push priority keys to the top
        .sort((a, b) => {
          let i = priorityKeys.indexOf(a)
          let j = priorityKeys.indexOf(b)
          if (i === -1) i = priorityKeys.length
          if (j === -1) j = priorityKeys.length
          return i - j
        })
        // Add keys that have been deleted
        .concat(
          compareObj ? Object.keys(compareObj).filter((k) => !(k in obj)) : []
        ),
    [obj, compareObj]
  )

  return (
    <List ml={3}>
      {keys.map((key) => {
        const value = obj[key as keyof typeof obj]
        const compareValue = compareObj?.[key as keyof typeof compareObj]
        const hasValue = key in obj
        const hasCompareValue = compareObj && key in compareObj
        if (isEqual(value, compareValue)) return null

        return (
          <DiffItem
            key={key}
            objKey={key}
            change={
              compareObj
                ? hasValue && !hasCompareValue
                  ? 'added'
                  : !hasValue && hasCompareValue
                  ? 'removed'
                  : undefined
                : undefined
            }
          >
            {!hasValue && compareValue ? (
              <ValueDiff value={compareValue} />
            ) : (
              <ValueDiff value={value} compareValue={compareValue} />
            )}
          </DiffItem>
        )
      })}
    </List>
  )
}

function ArrayDiff({ value, compareValue }: CompareProps<Value[]>) {
  if (!compareValue) compareValue = []
  const items = []
  let i = 0
  let j = 0
  while (i < value.length || j < compareValue.length) {
    const item = value[i]
    const compareItem = compareValue[j]
    if (isEqual(item, compareItem)) {
      i++
      j++
    } else if (j < compareValue.length) {
      const key = `${j}`
      items.push(
        <DiffItem key={key} objKey={key} change="removed">
          <ValueDiff value={compareItem} />
        </DiffItem>
      )
      j++
    } else if (i < value.length) {
      const key = `${i}`
      items.push(
        <DiffItem key={key} objKey={key} change="added">
          <ValueDiff value={item} />
        </DiffItem>
      )
      i++
    }
  }

  return <List ml={3}>{items}</List>
}

interface DiffItemProps {
  objKey: string
  change?: 'added' | 'removed'
  children: ReactNode
}

function DiffItem({ objKey, change, children }: DiffItemProps) {
  return (
    <ListItem
      color={
        change === 'removed' ? 'red' : change === 'added' ? 'green' : undefined
      }
    >
      <Text display="inline">
        {objKey}
        {': '}
      </Text>

      {children}
    </ListItem>
  )
}

function ValueDiff({ value, compareValue }: CompareProps<Value>) {
  return value === null ? (
    <i>null</i>
  ) : Array.isArray(value) ? (
    <ArrayDiff
      value={value}
      compareValue={Array.isArray(compareValue) ? compareValue : undefined}
    />
  ) : typeof value === 'object' ? (
    <ObjectDiff
      value={value}
      compareValue={
        typeof compareValue === 'object' &&
        !Array.isArray(compareValue) &&
        compareValue !== null
          ? compareValue
          : undefined
      }
    />
  ) : typeof value === 'string' && typeof compareValue === 'string' ? (
    <TextDiff value={value} compareValue={compareValue} />
  ) : (
    <JsonDiff value={value} compareValue={compareValue} />
  )
}

function TextDiff({ value, compareValue }: CompareProps<string>) {
  if (!compareValue) return <JsonDiff value={value} />

  const diffParts = diffChars(compareValue, value)
  const tooManyChanges =
    diffParts.reduce(
      (sum, part) =>
        sum + part.value.length * (part.added || part.removed ? -1 : 1),
      0
    ) > 0

  return tooManyChanges ? (
    <>
      "
      {diffParts.map((part, index) => {
        const color = part.added ? 'green' : part.removed ? 'red' : undefined
        return (
          <chakra.span key={index} color={color}>
            {part.value}
          </chakra.span>
        )
      })}
      "
    </>
  ) : (
    <JsonDiff value={value} compareValue={compareValue} />
  )
}

function JsonDiff({ value, compareValue }: CompareProps<Value>) {
  return compareValue !== undefined ? (
    <>
      <chakra.span color="red">{JSON.stringify(compareValue)}</chakra.span>
      <chakra.span whiteSpace="nowrap">
        <FiArrowRight
          style={{
            display: 'inline',
            margin: '-3px 5px 0 5px',
            verticalAlign: 'middle',
          }}
        />
        <chakra.span color="green">{JSON.stringify(value)}</chakra.span>
      </chakra.span>
    </>
  ) : (
    <>{JSON.stringify(value)}</>
  )
}
