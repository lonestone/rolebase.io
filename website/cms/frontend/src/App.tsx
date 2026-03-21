import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router'
import { Sidebar } from './components/Sidebar.js'
import { Editor } from './components/Editor.js'
import { AgentPanel } from './components/AgentPanel.js'
import { GitPanel } from './components/GitPanel.js'
import { Header } from './components/Header.js'
import { useTree } from './hooks/useTree.js'
import { MediaModalProvider } from './components/MediaModal.js'
import type { TreeNode } from './api.js'
import { getLocaleSiblings } from './utils/folderTarget.js'

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

function EditorPage({
  tree,
  onSelectFile,
}: {
  tree: TreeNode[]
  onSelectFile: (path: string) => void
}) {
  const location = useLocation()
  const filePath = decodeURIComponent(location.pathname.slice('/edit/'.length))
  if (!filePath) return <Placeholder />
  const localeSiblings = getLocaleSiblings(tree, filePath)
  return (
    <Editor
      key={filePath}
      filePath={filePath}
      localeSiblings={localeSiblings}
      onSelectFile={onSelectFile}
    />
  )
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

  return (
    <MediaModalProvider>
      <Header
        gitOpen={gitOpen}
        onToggleGit={handleToggleGit}
        agentOpen={agentOpen}
        onToggleAgent={handleToggleAgent}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          tree={tree}
          onSelectFile={(path) => navigate(`/edit/${path}`)}
        />
        <main className="flex-1 overflow-auto p-4">
          <Routes>
            <Route path="/" element={<Placeholder />} />
            <Route
              path="/edit/*"
              element={
                <EditorPage
                  tree={tree}
                  onSelectFile={(path) => navigate(`/edit/${path}`)}
                />
              }
            />
          </Routes>
        </main>
        {gitOpen && <GitPanel />}
        {agentOpen && <AgentPanel />}
      </div>
    </MediaModalProvider>
  )
}
