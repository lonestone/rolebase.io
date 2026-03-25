// Claude Code streaming event types

export interface ClaudeEvent {
  type: string
  subtype?: string
  [key: string]: any
}

export interface UserPrompt {
  type: 'user_prompt'
  content: string
}

export type AgentEvent = UserPrompt | ClaudeEvent
