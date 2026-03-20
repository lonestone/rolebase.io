import React from 'react'
import { FiExternalLink } from 'react-icons/fi'
import Button from './Button.js'

interface Props {
  gitOpen: boolean
  onToggleGit: () => void
  agentOpen: boolean
  onToggleAgent: () => void
}

export function Header({
  gitOpen,
  onToggleGit,
  agentOpen,
  onToggleAgent,
}: Props) {
  const astroUrl = 'http://localhost:4321'

  return (
    <header className="h-12 border-b border-border flex items-center justify-between px-4 bg-white shrink-0">
      <span className="font-semibold text-sm">CMS</span>
      <div className="flex gap-2">
        <a
          href={astroUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 rounded-md border border-border bg-white text-text no-underline text-xs cursor-pointer hover:bg-gray-100 inline-flex items-center"
        >
          Preview <FiExternalLink className="ml-1 align-middle" />
        </a>
        <Button active={gitOpen} onClick={onToggleGit}>
          Git
        </Button>
        <Button active={agentOpen} onClick={onToggleAgent}>
          Agent
        </Button>
      </div>
    </header>
  )
}
