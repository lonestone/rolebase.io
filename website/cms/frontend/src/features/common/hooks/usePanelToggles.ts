import { usePersistedPanel } from './usePersistedPanel.js'

export function usePanelToggles() {
  const [gitOpen, setGitOpen] = usePersistedPanel('cms-git-panel-open')
  const [agentOpen, setAgentOpen] = usePersistedPanel('cms-agent-panel-open')

  function toggleGit() {
    if (!gitOpen) setAgentOpen(false)
    setGitOpen(!gitOpen)
  }

  function toggleAgent() {
    if (!agentOpen) setGitOpen(false)
    setAgentOpen(!agentOpen)
  }

  return { gitOpen, agentOpen, toggleGit, toggleAgent }
}
