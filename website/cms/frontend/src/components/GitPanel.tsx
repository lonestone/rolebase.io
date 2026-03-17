import React, { useState, useEffect, useCallback } from 'react'
import {
  fetchGitStatus,
  fetchGitDiff,
  gitCommit,
  gitDiscard,
  type GitFile,
} from '../api.js'

interface Props {
  onRefresh: () => void
}

export function GitPanel({ onRefresh }: Props) {
  const [files, setFiles] = useState<GitFile[]>([])
  const [diff, setDiff] = useState<string | null>(null)
  const [diffFile, setDiffFile] = useState<string | null>(null)
  const [commitMsg, setCommitMsg] = useState('')
  const [committing, setCommitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadStatus = useCallback(async () => {
    const data = await fetchGitStatus()
    setFiles(data.files)
  }, [])

  useEffect(() => {
    loadStatus()
  }, [loadStatus])

  async function handleViewDiff(path: string) {
    if (diffFile === path) {
      setDiff(null)
      setDiffFile(null)
      return
    }
    const data = await fetchGitDiff(path)
    setDiff(data.diff)
    setDiffFile(path)
  }

  async function handleDiscard(path: string) {
    await gitDiscard(path)
    await loadStatus()
    if (diffFile === path) {
      setDiff(null)
      setDiffFile(null)
    }
    onRefresh()
  }

  async function handleCommit() {
    if (!commitMsg.trim()) return
    setCommitting(true)
    setError(null)
    const result = await gitCommit(commitMsg)
    if (result.ok) {
      setCommitMsg('')
      await loadStatus()
      setDiff(null)
      setDiffFile(null)
      onRefresh()
    } else {
      setError(result.error || 'Commit failed')
    }
    setCommitting(false)
  }

  if (files.length === 0) {
    return (
      <div
        style={{ padding: 20, color: 'var(--text-muted)', textAlign: 'center' }}
      >
        No changes
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
          disabled={!commitMsg.trim() || committing}
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
          {committing ? '...' : 'Commit'}
        </button>
      </div>
      {error && (
        <div
          style={{ padding: '8px 12px', color: 'var(--danger)', fontSize: 12 }}
        >
          {error}
        </div>
      )}
    </div>
  )
}
