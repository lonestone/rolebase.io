import React, { useState } from 'react'
import {
  useGitStatus,
  useGitDiff,
  useGitCommit,
  useGitDiscard,
} from '../hooks/useGit.js'
import { useResizablePanel } from '../hooks/useResizablePanel.js'
import { ResizeHandle } from './ResizeHandle.js'

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
        style={{
          width,
          background: 'var(--bg-panel)',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>
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
      style={{
        width,
        background: 'var(--bg-panel)',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* File list */}
        <div style={{ padding: '12px 0' }}>
          {files.map((file) => (
            <div
              key={file.path}
              style={{
                padding: '6px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: 13,
                background: diffFile === file.path ? '#f0f0f0' : 'transparent',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color:
                      file.status === 'M'
                        ? 'var(--primary)'
                        : file.status === 'D'
                        ? 'var(--danger)'
                        : 'var(--success)',
                    width: 16,
                    textAlign: 'center',
                    flexShrink: 0,
                  }}
                >
                  {file.status}
                </span>
                <span
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {file.path}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                <button
                  onClick={() => handleViewDiff(file.path)}
                  style={{
                    padding: '2px 8px',
                    fontSize: 11,
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--border)',
                    background: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  Diff
                </button>
                <button
                  onClick={() => handleDiscard(file.path)}
                  style={{
                    padding: '2px 8px',
                    fontSize: 11,
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--danger)',
                    background: '#fff',
                    color: 'var(--danger)',
                    cursor: 'pointer',
                  }}
                >
                  Discard
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Diff view */}
        {diff && (
          <pre
            style={{
              margin: '0 16px 16px',
              padding: 12,
              background: '#1e1e1e',
              color: '#d4d4d4',
              borderRadius: 'var(--radius)',
              fontSize: 12,
              lineHeight: 1.5,
              overflow: 'auto',
              maxHeight: 300,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            }}
          >
            {diff || 'No diff'}
          </pre>
        )}
      </div>

      {/* Commit form */}
      <div
        style={{
          padding: 12,
          borderTop: '1px solid var(--border)',
          display: 'flex',
          gap: 8,
        }}
      >
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
          style={{
            flex: 1,
            padding: '6px 10px',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            fontSize: 13,
            outline: 'none',
          }}
        />
        <button
          onClick={handleCommit}
          disabled={!commitMsg.trim() || commitMutation.isPending}
          style={{
            padding: '6px 16px',
            borderRadius: 'var(--radius)',
            border: 'none',
            background: commitMsg.trim() ? 'var(--success)' : 'var(--border)',
            color: commitMsg.trim() ? '#fff' : 'var(--text-muted)',
            fontSize: 13,
            cursor: commitMsg.trim() ? 'pointer' : 'default',
          }}
        >
          {commitMutation.isPending ? '...' : 'Commit'}
        </button>
      </div>
      {commitMutation.error && (
        <div
          style={{ padding: '8px 12px', color: 'var(--danger)', fontSize: 12 }}
        >
          {commitMutation.error.message}
        </div>
      )}
    </aside>
    </>
  )
}
