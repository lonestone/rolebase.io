import React from 'react'
import { FiExternalLink } from 'react-icons/fi'

interface Props {
  gitOpen: boolean
  onToggleGit: () => void
  agentOpen: boolean
  onToggleAgent: () => void
}

function PanelButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '4px 12px',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        background: active ? 'var(--primary)' : '#fff',
        color: active ? '#fff' : 'var(--text)',
        fontSize: 13,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}

export function Header({
  gitOpen,
  onToggleGit,
  agentOpen,
  onToggleAgent,
}: Props) {
  const astroUrl = 'http://localhost:4321'

  return (
    <header
      style={{
        height: 'var(--header-height)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        background: '#fff',
        flexShrink: 0,
      }}
    >
      <span style={{ fontWeight: 600, fontSize: 14 }}>CMS</span>
      <div style={{ display: 'flex', gap: 8 }}>
        <a
          href={astroUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '4px 12px',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            background: '#fff',
            color: 'var(--text)',
            textDecoration: 'none',
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          Preview <FiExternalLink style={{ marginLeft: 4, verticalAlign: 'middle' }} />
        </a>
        <PanelButton active={gitOpen} onClick={onToggleGit}>
          Git
        </PanelButton>
        <PanelButton active={agentOpen} onClick={onToggleAgent}>
          Agent
        </PanelButton>
      </div>
    </header>
  )
}
