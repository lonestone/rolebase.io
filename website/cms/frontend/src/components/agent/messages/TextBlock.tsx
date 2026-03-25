import React, { useMemo } from 'react'
import { marked } from 'marked'

marked.setOptions({ breaks: true })

interface Props {
  text: string
  variant: 'user' | 'assistant'
}

export function TextBlock({ text, variant }: Props) {
  if (variant === 'assistant') {
    return <MarkdownBlock text={text} />
  }

  return (
    <div className="mb-3 px-3 py-2 rounded-md whitespace-pre-wrap break-words text-xs leading-relaxed bg-primary text-white">
      {text}
    </div>
  )
}

function MarkdownBlock({ text }: { text: string }) {
  const html = useMemo(() => marked.parse(text) as string, [text])

  return (
    <div
      className="mb-3 px-3 py-2 rounded-md break-words text-xs leading-relaxed bg-white text-text border border-border prose-agent"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
