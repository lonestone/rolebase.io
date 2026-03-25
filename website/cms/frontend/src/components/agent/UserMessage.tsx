import React from 'react'
import { MessagePrimitive } from '@assistant-ui/react'
import { TextBlock } from './messages/index.js'

export function UserMessage() {
  return (
    <MessagePrimitive.Root>
      <MessagePrimitive.Content
        components={{
          Text: ({ text }) => <TextBlock text={text} variant="user" />,
        }}
      />
    </MessagePrimitive.Root>
  )
}
