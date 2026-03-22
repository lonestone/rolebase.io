import React, { useMemo, useState } from 'react'
import { MdArrowRight } from 'react-icons/md'
import { useLocation } from 'react-router'
import type { TreeNode } from '../api.js'
import { useResizablePanel } from '../hooks/useResizablePanel.js'
import { ResizeHandle } from './ResizeHandle.js'
import { getFolderTarget } from '../utils/folderTarget.js'

function hasMdxFiles(node: TreeNode): boolean {
  if (node.type === 'file') {
    return node.name.endsWith('.mdx') || node.name.endsWith('.md')
  }
  return node.children?.some(hasMdxFiles) === true
}

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

  const { width, handleMouseDown } = useResizablePanel({
    storageKey: 'cms-sidebar-width',
    defaultWidth: 260,
    minWidth: 150,
    maxWidth: 500,
    side: 'right',
  })

  return (
    <>
      <aside
        style={{ width }}
        className="bg-bg-panel overflow-auto shrink-0 text-xs"
      >
        <div className="py-3">
          {tree.map((node) => (
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
      <ResizeHandle side="right" onMouseDown={handleMouseDown} />
    </>
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

  // Detect folders that should act as direct file links
  const folderTarget = !isFile ? getFolderTarget(node) : null
  const isCollapsedFolder = folderTarget !== null

  // For collapsed folders, check if the selected file is one of the children
  const isSelected = isFile
    ? selectedFile === node.path
    : isCollapsedFolder &&
      node.children?.some((c) => c.path === selectedFile) === true

  if (isFile && !isMdx) return null
  if (!isFile && !hasMdxFiles(node)) return null

  const handleClick = () => {
    if (isFile && isMdx) {
      onSelectFile(node.path)
    } else if (isCollapsedFolder) {
      onSelectFile(folderTarget)
    } else if (!isFile) {
      setManualToggle(!expanded)
    }
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-label={node.name}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleClick()
          }
        }}
        style={{ paddingLeft: `${12 + depth * 16}px` }}
        className={`py-1 pr-3 flex items-center gap-1 select-none ${
          isSelected ? 'bg-primary text-white' : 'text-text'
        } ${
          isFile && isMdx
            ? 'cursor-pointer'
            : isFile
            ? 'cursor-default'
            : 'cursor-pointer'
        } ${isFile || isCollapsedFolder ? 'font-normal' : 'font-medium'}`}
      >
        {!isFile && !isCollapsedFolder && (
          <MdArrowRight
            className="w-5 h-5 shrink-0 transition-transform duration-150"
            style={{ transform: expanded ? 'rotate(90deg)' : undefined }}
          />
        )}
        {(isFile || isCollapsedFolder) && <span className="w-3" />}
        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
          {isFile ? node.name.replace(/\.mdx?$/, '') : node.name}
        </span>
      </div>
      {!isFile && !isCollapsedFolder && expanded && node.children && (
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
