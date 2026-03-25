import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router'
import { Sidebar } from './components/Sidebar.js'
import { Editor } from './components/Editor.js'
import { AgentPanel } from './components/agent/AgentPanel.js'
import { GitPanel } from './components/GitPanel.js'
import { Header } from './components/Header.js'
import { useTree } from './hooks/useTree.js'
import { MediaModalProvider } from './components/MediaModal.js'
import { FilePathProvider } from './contexts/FilePathContext.js'

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

function useCurrentFilePath(): string | null {
  const location = useLocation()
  if (!location.pathname.startsWith('/edit/')) return null
  const path = decodeURIComponent(location.pathname.slice('/edit/'.length))
  return path || null
}

function Placeholder() {
  return (
    <div className="text-text-muted p-10 text-center">
      Select a file from the sidebar to edit
    </div>
  )
}

export function App() {
  const { tree } = useTree()
  const navigate = useNavigate()
  const filePath = useCurrentFilePath()
  const [gitOpen, setGitOpen] = usePersistedPanel('cms-git-panel-open')
  const [agentOpen, setAgentOpen] = usePersistedPanel('cms-agent-panel-open')

  function handleToggleGit() {
    if (!gitOpen) setAgentOpen(false)
    setGitOpen(!gitOpen)
  }

  function handleToggleAgent() {
    if (!agentOpen) setGitOpen(false)
    setAgentOpen(!agentOpen)
  }

  function handleSelectFile(path: string) {
    navigate(`/edit/${path}`)
  }

  return (
    <FilePathProvider filePath={filePath}>
      <MediaModalProvider>
        <Header
          gitOpen={gitOpen}
          onToggleGit={handleToggleGit}
          agentOpen={agentOpen}
          onToggleAgent={handleToggleAgent}
        />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar tree={tree} onSelectFile={handleSelectFile} />
          <main className="flex-1 overflow-auto p-4 bg-bg-main">
            <Routes>
              <Route path="/" element={<Placeholder />} />
              <Route
                path="/edit/*"
                element={
                  <Editor
                    key={filePath}
                    tree={tree}
                    onSelectFile={handleSelectFile}
                  />
                }
              />
            </Routes>
          </main>
          {gitOpen && <GitPanel />}
          {agentOpen && <AgentPanel />}
        </div>
      </MediaModalProvider>
    </FilePathProvider>
  )
}
