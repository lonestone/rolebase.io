import React, { useState, useEffect, useCallback } from 'react'
import { Sidebar } from './components/Sidebar.js'
import { Editor } from './components/Editor.js'
import { AgentPanel } from './components/AgentPanel.js'
import { GitPanel } from './components/GitPanel.js'
import { Header } from './components/Header.js'
import { fetchTree, type TreeNode } from './api.js'

type Tab = 'editor' | 'git'

export function App() {
  const [tree, setTree] = useState<TreeNode[]>([])
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [panelOpen, setPanelOpen] = useState(true)
  const [tab, setTab] = useState<Tab>('editor')

  const loadTree = useCallback(async () => {
    const data = await fetchTree()
    setTree(data)
  }, [])

  useEffect(() => {
    loadTree()
  }, [loadTree])

  return (
    <>
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
            <GitPanel onRefresh={loadTree} />
          ) : selectedFile ? (
            <Editor filePath={selectedFile} onSave={loadTree} />
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
        {panelOpen && <AgentPanel onFileChanged={loadTree} />}
      </div>
    </>
  )
}
