import React from 'react'
import { Routes, Route } from 'react-router'
import type { TreeNode } from '../../../api.js'
import { Editor } from '../../editor/components/Editor.js'
import { Placeholder } from './Placeholder.js'

interface Props {
  tree: TreeNode[]
  filePath: string | null
  onSelectFile: (path: string) => void
}

export function AppRoutes({ tree, filePath, onSelectFile }: Props) {
  return (
    <Routes>
      <Route path="/" element={<Placeholder />} />
      <Route
        path="/edit/*"
        element={
          <Editor key={filePath} tree={tree} onSelectFile={onSelectFile} />
        }
      />
    </Routes>
  )
}
