import React, { useMemo, useState } from 'react'
import { useLocation } from 'react-router'
import type { TreeNode } from '../api.js'

interface Props {
  tree: TreeNode[]
  onSelectFile: (path: string) => void
}

function buildExpandedPaths(selectedFile: string | null): Set<string> {
  if (!selectedFile) return new Set()
  const parts = selectedFile.split('/')
  const paths = new Set<string>()
  for (let i = 1; i < parts.length; i++) {
    paths.add(parts.slice(0, i).join('/'))
  }
  return paths
}

export function Sidebar({ tree, onSelectFile }: Props) {
  const location = useLocation()
  const selectedFile = location.pathname.startsWith('/edit/')
    ? decodeURIComponent(location.pathname.slice('/edit/'.length))
    : null

  const expandedPaths = useMemo(
    () => buildExpandedPaths(selectedFile),
    [selectedFile]
  )

  return (
    <aside
      style={{
        width: 'var(--sidebar-width)',
        borderRight: '1px solid var(--border)',
        background: 'var(--bg-sidebar)',
        overflow: 'auto',
        flexShrink: 0,
        fontSize: 13,
      }}
    >
      <div style={{ padding: '12px 0' }}>
        {tree
          .filter((node) => node.type === 'directory')
          .map((node) => (
            <TreeItem
              key={node.path}
              node={node}
              depth={0}
              selectedFile={selectedFile}
              expandedPaths={expandedPaths}
              onSelectFile={onSelectFile}
            />
          ))}
      </div>
    </aside>
  )
}

interface TreeItemProps {
  node: TreeNode
  depth: number
  selectedFile: string | null
  expandedPaths: Set<string>
  onSelectFile: (path: string) => void
}

function TreeItem({
  node,
  depth,
  selectedFile,
  expandedPaths,
  onSelectFile,
}: TreeItemProps) {
  const [manualToggle, setManualToggle] = useState<boolean | null>(null)
  const expanded = manualToggle ?? expandedPaths.has(node.path)
  const isFile = node.type === 'file'
  const isMdx = node.name.endsWith('.mdx') || node.name.endsWith('.md')
  const isSelected = selectedFile === node.path

  if (isFile && !isMdx) {
    return null // Only show MDX files
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-label={node.name}
        onClick={() => {
          if (isFile && isMdx) {
            onSelectFile(node.path)
          } else if (!isFile) {
            setManualToggle(!expanded)
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            if (isFile && isMdx) {
              onSelectFile(node.path)
            } else if (!isFile) {
              setManualToggle(!expanded)
            }
          }
        }}
        style={{
          padding: '4px 12px',
          paddingLeft: `${12 + depth * 16}px`,
          cursor: isFile && isMdx ? 'pointer' : isFile ? 'default' : 'pointer',
          background: isSelected ? 'var(--primary)' : 'transparent',
          color: isSelected ? '#fff' : isFile ? 'var(--text)' : 'var(--text)',
          fontWeight: isFile ? 400 : 500,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          borderRadius: 0,
          userSelect: 'none',
        }}
      >
        {!isFile && (
          <span style={{ fontSize: 10, width: 12 }}>
            {expanded ? '▼' : '▶'}
          </span>
        )}
        {isFile && <span style={{ width: 12 }} />}
        <span
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {node.name}
        </span>
      </div>
      {!isFile && expanded && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeItem
              key={child.path}
              node={child}
              depth={depth + 1}
              selectedFile={selectedFile}
              expandedPaths={expandedPaths}
              onSelectFile={onSelectFile}
            />
          ))}
        </div>
      )}
    </div>
  )
}
