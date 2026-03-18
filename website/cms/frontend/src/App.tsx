import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router'
import { Sidebar } from './components/Sidebar.js'
import { Editor } from './components/Editor.js'
import { AgentPanel } from './components/AgentPanel.js'
import { GitPanel } from './components/GitPanel.js'
import { Header } from './components/Header.js'
import { useTree } from './hooks/useTree.js'
import { MediaModalProvider } from './components/MediaModal.js'

function usePersistedPanel(key: string, defaultValue = false) {
  const [open, setOpen] = useState(() => {
    const stored = localStorage.getItem(key)
    return stored !== null ? stored === 'true' : defaultValue
  })

  useEffect(() => {
    localStorage.setItem(key, String(open))
  }, [key, open])

  return [open, setOpen] as const
}

function EditorPage() {
  const location = useLocation()
  const filePath = decodeURIComponent(location.pathname.slice('/edit/'.length))
  if (!filePath) return <Placeholder />
  return <Editor key={filePath} filePath={filePath} />
}

function Placeholder() {
  return (
    <div
      style={{
        color: 'var(--text-muted)',
        padding: '40px',
        textAlign: 'center',
      }}
    >
      Select a file from the sidebar to edit
    </div>
  )
}

export function App() {
  const { tree } = useTree()
  const navigate = useNavigate()
  const [gitOpen, setGitOpen] = usePersistedPanel('cms-git-panel-open')
  const [agentOpen, setAgentOpen] = usePersistedPanel('cms-agent-panel-open')

  return (
    <MediaModalProvider>
      <Header
        gitOpen={gitOpen}
        onToggleGit={() => setGitOpen(!gitOpen)}
        agentOpen={agentOpen}
        onToggleAgent={() => setAgentOpen(!agentOpen)}
      />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar
          tree={tree}
          onSelectFile={(path) => navigate(`/edit/${path}`)}
        />
        <main style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
          <Routes>
            <Route path="/" element={<Placeholder />} />
            <Route path="/edit/*" element={<EditorPage />} />
          </Routes>
        </main>
        {gitOpen && <GitPanel />}
        {agentOpen && <AgentPanel />}
      </div>
    </MediaModalProvider>
  )
}
