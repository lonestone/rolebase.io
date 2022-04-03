import React, { forwardRef, lazy, Suspense } from 'react'
// Types
import { Props } from './chunk/SimpleEditor'
import { MarkdownEditorHandle } from './chunk/useMarkdownEditor'

const Editor = lazy(() =>
  import('./chunk/editor').then((v) => ({ default: v.SimpleEditor }))
)

const MarkdownEditor = forwardRef<MarkdownEditorHandle, Props>((props, ref) => (
  <Suspense fallback={null}>
    <Editor ref={ref} {...props} />
  </Suspense>
))

MarkdownEditor.displayName = 'MarkdownEditor'

export default MarkdownEditor
