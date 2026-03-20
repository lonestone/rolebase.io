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
  const [stagedPaths, setStagedPaths] = useState<Set<string>>(new Set())
  const [confirmDiscard, setConfirmDiscard] = useState<string | null>(null)
  const commitMutation = useGitCommit()
  const discardMutation = useGitDiscard()

  function handleViewDiff(path: string) {
    setDiffFile(diffFile === path ? null : path)
  }

  function handleDiscard(path: string) {
    if (confirmDiscard === path) {
      discardMutation.mutate(path, {
        onSuccess: () => {
          if (diffFile === path) setDiffFile(null)
          setStagedPaths((prev) => {
            const next = new Set(prev)
            next.delete(path)
            return next
          })
        },
      })
      setConfirmDiscard(null)
    } else {
      setConfirmDiscard(path)
    }
  }

  function handleToggleStaged(path: string) {
    setStagedPaths((prev) => {
      const next = new Set(prev)
      if (next.has(path)) {
        next.delete(path)
      } else {
        next.add(path)
      }
      return next
    })
  }

  function handleToggleAll() {
    if (stagedPaths.size === files.length) {
      setStagedPaths(new Set())
    } else {
      setStagedPaths(new Set(files.map((f) => f.path)))
    }
  }

  async function handleCommit() {
    if (!commitMsg.trim() || stagedPaths.size === 0) return
    try {
      await commitMutation.mutateAsync({
        message: commitMsg,
        paths: [...stagedPaths],
      })
      setCommitMsg('')
      setDiffFile(null)
      setStagedPaths(new Set())
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

  const allStaged = stagedPaths.size === files.length

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
          {/* Select all */}
          <div className="px-4 pb-2 mb-1 border-b border-border">
            <label className="flex items-center gap-2 text-xs text-text-muted cursor-pointer">
              <input
                type="checkbox"
                checked={allStaged}
                onChange={handleToggleAll}
                className="accent-primary"
              />
              Stage all
            </label>
          </div>

          {files.map((file) => (
            <div
              key={file.path}
              className={`px-4 py-1.5 flex items-center gap-2 text-xs ${
                diffFile === file.path ? 'bg-gray-100' : ''
              }`}
            >
              <input
                type="checkbox"
                checked={stagedPaths.has(file.path)}
                onChange={() => handleToggleStaged(file.path)}
                className="accent-primary shrink-0"
                aria-label={`Stage ${file.path}`}
              />
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
              <span className="overflow-hidden text-ellipsis whitespace-nowrap flex-1 min-w-0">
                {file.path}
              </span>
              <div className="flex gap-1 shrink-0">
                <Button size="sm" onClick={() => handleViewDiff(file.path)}>
                  Diff
                </Button>
                {confirmDiscard === file.path ? (
                  <>
                    <Button
                      size="sm"
                      className="border-danger! text-danger! hover:bg-red-50!"
                      onClick={() => handleDiscard(file.path)}
                    >
                      Confirm
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setConfirmDiscard(null)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    className="border-danger! text-danger! hover:bg-red-50!"
                    onClick={() => handleDiscard(file.path)}
                  >
                    Discard
                  </Button>
                )}
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
          disabled={!commitMsg.trim() || stagedPaths.size === 0 || commitMutation.isPending}
        >
          {commitMutation.isPending ? '...' : `Commit (${stagedPaths.size})`}
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
