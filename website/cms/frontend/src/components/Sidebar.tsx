import React, { useState } from 'react'
import type { TreeNode } from '../api.js'

interface Props {
  tree: TreeNode[]
  selectedFile: string | null
  onSelectFile: (path: string) => void
}

export function Sidebar({ tree, selectedFile, onSelectFile }: Props) {
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
  onSelectFile: (path: string) => void
}

function TreeItem({ node, depth, selectedFile, onSelectFile }: TreeItemProps) {
  const [expanded, setExpanded] = useState(depth < 1)
  const isFile = node.type === 'file'
  const isMdx = node.name.endsWith('.mdx') || node.name.endsWith('.md')
  const isSelected = selectedFile === node.path

  if (isFile && !isMdx && !node.name.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
    return null // Only show MDX and image files
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
            setExpanded(!expanded)
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            if (isFile && isMdx) {
              onSelectFile(node.path)
            } else if (!isFile) {
              setExpanded(!expanded)
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
              onSelectFile={onSelectFile}
            />
          ))}
        </div>
      )}
    </div>
  )
}
