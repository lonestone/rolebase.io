import React, { useState } from 'react'
import { Sidebar } from './components/Sidebar.js'
import { Editor } from './components/Editor.js'
import { AgentPanel } from './components/AgentPanel.js'
import { GitPanel } from './components/GitPanel.js'
import { Header } from './components/Header.js'
import { useTree } from './hooks/useTree.js'
import { MediaModalProvider } from './components/MediaModal.js'

type Tab = 'editor' | 'git'

export function App() {
  const { tree } = useTree()
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [panelOpen, setPanelOpen] = useState(true)
  const [tab, setTab] = useState<Tab>('editor')

  return (
    <MediaModalProvider>
      <Header
        panelOpen={panelOpen}
        onTogglePanel={() => setPanelOpen(!panelOpen)}
        tab={tab}
        onTabChange={setTab}
      />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar
          tree={tree}
          selectedFile={selectedFile}
          onSelectFile={(path) => {
            setSelectedFile(path)
            setTab('editor')
          }}
        />
        <main style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
          {tab === 'git' ? (
            <GitPanel />
          ) : selectedFile ? (
            <Editor filePath={selectedFile} />
          ) : (
            <div
              style={{
                color: 'var(--text-muted)',
                padding: '40px',
                textAlign: 'center',
              }}
            >
              Select a file from the sidebar to edit
            </div>
          )}
        </main>
        {panelOpen && <AgentPanel />}
      </div>
    </MediaModalProvider>
  )
}
