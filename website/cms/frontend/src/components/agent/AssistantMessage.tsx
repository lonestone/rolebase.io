import React from 'react'
import { MessagePrimitive, ThreadPrimitive } from '@assistant-ui/react'
import { TextBlock, ThinkingBlock, ToolCallBlock } from './messages/index.js'
import { TypingIndicator } from './messages/TypingIndicator.js'

export function AssistantMessage() {
  return (
    <MessagePrimitive.Root>
      <MessagePrimitive.Content
        components={{
          Text: ({ text }) => <TextBlock text={text} variant="assistant" />,
          Reasoning: ({ text }) => <ThinkingBlock text={text} />,
          tools: {
            Fallback: ({ toolName, args, result, isError }) => (
              <ToolCallBlock
                name={toolName}
                input={args}
                result={result}
                isError={isError}
              />
            ),
          },
        }}
      />
      <MessagePrimitive.If last>
        <ThreadPrimitive.If running>
          <TypingIndicator />
        </ThreadPrimitive.If>
      </MessagePrimitive.If>
    </MessagePrimitive.Root>
  )
}
