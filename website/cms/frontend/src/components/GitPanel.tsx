import React, { useState } from 'react'
import {
  useGitStatus,
  useGitDiff,
  useGitCommit,
  useGitDiscard,
} from '../hooks/useGit.js'
import { useResizablePanel } from '../hooks/useResizablePanel.js'
import { ResizeHandle } from './ResizeHandle.js'
import Button from './Button.js'

export function GitPanel() {
  const { width, handleMouseDown } = useResizablePanel({
    storageKey: 'cms-git-panel-width',
    defaultWidth: 380,
    minWidth: 250,
    maxWidth: 800,
    side: 'left',
  })
  const { data: files = [] } = useGitStatus()
  const [diffFile, setDiffFile] = useState<string | null>(null)
  const { data: diff } = useGitDiff(diffFile)
  const [commitMsg, setCommitMsg] = useState('')
  const commitMutation = useGitCommit()
  const discardMutation = useGitDiscard()

  function handleViewDiff(path: string) {
    setDiffFile(diffFile === path ? null : path)
  }

  async function handleDiscard(path: string) {
    await discardMutation.mutateAsync(path)
    if (diffFile === path) {
      setDiffFile(null)
    }
  }

  async function handleCommit() {
    if (!commitMsg.trim()) return
    try {
      await commitMutation.mutateAsync(commitMsg)
      setCommitMsg('')
      setDiffFile(null)
    } catch {
      // Error is available via commitMutation.error
    }
  }

  if (files.length === 0) {
    return (
      <>
      <ResizeHandle side="left" onMouseDown={handleMouseDown} />
      <aside
        style={{ width }}
        className="bg-bg-panel shrink-0 flex items-center justify-center"
      >
        <span className="text-text-muted text-xs">
          No changes
        </span>
      </aside>
      </>
    )
  }

  return (
    <>
    <ResizeHandle side="left" onMouseDown={handleMouseDown} />
    <aside
      style={{ width }}
      className="bg-bg-panel shrink-0 flex flex-col overflow-hidden"
    >
      <div className="flex-1 overflow-auto">
        {/* File list */}
        <div className="py-3">
          {files.map((file) => (
            <div
              key={file.path}
              className={`px-4 py-1.5 flex items-center justify-between text-xs ${
                diffFile === file.path ? 'bg-gray-100' : ''
              }`}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span
                  className={`text-2xs font-semibold w-4 text-center shrink-0 ${
                    file.status === 'M'
                      ? 'text-primary'
                      : file.status === 'D'
                      ? 'text-danger'
                      : 'text-success'
                  }`}
                >
                  {file.status}
                </span>
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {file.path}
                </span>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button size="sm" onClick={() => handleViewDiff(file.path)}>
                  Diff
                </Button>
                <Button
                  size="sm"
                  className="border-danger! text-danger! hover:bg-red-50!"
                  onClick={() => handleDiscard(file.path)}
                >
                  Discard
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Diff view */}
        {diff && (
          <pre className="mx-4 mb-4 p-3 bg-[#1e1e1e] text-[#d4d4d4] rounded-md text-xs leading-relaxed overflow-auto max-h-75 font-mono">
            {diff || 'No diff'}
          </pre>
        )}
      </div>

      {/* Commit form */}
      <div className="p-3 border-t border-border flex gap-2">
        <input
          value={commitMsg}
          onChange={(e) => setCommitMsg(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleCommit()
            }
          }}
          placeholder="Commit message..."
          className="flex-1 px-2.5 py-1.5 border border-border rounded-md text-xs outline-none"
        />
        <Button
          variant="success"
          onClick={handleCommit}
          disabled={!commitMsg.trim() || commitMutation.isPending}
        >
          {commitMutation.isPending ? '...' : 'Commit'}
        </Button>
      </div>
      {commitMutation.error && (
        <div className="px-3 py-2 text-danger text-xs">
          {commitMutation.error.message}
        </div>
      )}
    </aside>
    </>
  )
}
