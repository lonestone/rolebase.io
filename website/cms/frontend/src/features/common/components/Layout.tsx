import React from 'react'
import { useNavigate } from 'react-router'
import { Sidebar } from '../../sidebar/components/Sidebar.js'
import { GitPanel } from '../../git/components/GitPanel.js'
import { AgentPanel } from '../../agent/components/AgentPanel.js'
import { useTree } from '../../sidebar/hooks/useTree.js'
import { FilePathProvider } from '../../editor/contexts/FilePathContext.js'
import { Header } from './Header.js'
import { AppRoutes } from './AppRoutes.js'
import { usePanelToggles } from '../hooks/usePanelToggles.js'
import { useCurrentFilePath } from '../hooks/useCurrentFilePath.js'

export function Layout() {
  const { tree } = useTree()
  const navigate = useNavigate()
  const filePath = useCurrentFilePath()
  const { gitOpen, agentOpen, toggleGit, toggleAgent } = usePanelToggles()

  function handleSelectFile(path: string) {
    navigate(`/edit/${path}`)
  }

  return (
    <FilePathProvider filePath={filePath}>
      <Header
        gitOpen={gitOpen}
        onToggleGit={toggleGit}
        agentOpen={agentOpen}
        onToggleAgent={toggleAgent}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar tree={tree} onSelectFile={handleSelectFile} />
        <main className="flex-1 overflow-auto p-4 bg-bg-main">
          <AppRoutes
            tree={tree}
            filePath={filePath}
            onSelectFile={handleSelectFile}
          />
        </main>
        {gitOpen && <GitPanel />}
        {agentOpen && <AgentPanel />}
      </div>
    </FilePathProvider>
  )
}
