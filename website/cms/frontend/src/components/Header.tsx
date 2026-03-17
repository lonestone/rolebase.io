import React from 'react'

type Tab = 'editor' | 'git'

interface Props {
  panelOpen: boolean
  onTogglePanel: () => void
  tab: Tab
  onTabChange: (tab: Tab) => void
}

function TabButton({
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
        background: active ? 'var(--text)' : '#fff',
        color: active ? '#fff' : 'var(--text)',
        fontSize: 13,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}

export function Header({ panelOpen, onTogglePanel, tab, onTabChange }: Props) {
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontWeight: 600, fontSize: 14 }}>CMS</span>
        <div style={{ display: 'flex', gap: 4 }}>
          <TabButton
            active={tab === 'editor'}
            onClick={() => onTabChange('editor')}
          >
            Editor
          </TabButton>
          <TabButton active={tab === 'git'} onClick={() => onTabChange('git')}>
            Git
          </TabButton>
        </div>
      </div>
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
          Preview
        </a>
        <button
          onClick={onTogglePanel}
          style={{
            padding: '4px 12px',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            background: panelOpen ? 'var(--primary)' : '#fff',
            color: panelOpen ? '#fff' : 'var(--text)',
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          Agent
        </button>
      </div>
    </header>
  )
}
