import React, { forwardRef, lazy, Suspense } from 'react'
import { Props } from './SimpleEditor'
import { MarkdownEditorHandle } from './useMarkdownEditor'

const Editor = lazy(() =>
  import('./editor').then((v) => ({ default: v.SimpleEditor }))
)

const MarkdownEditor = forwardRef<MarkdownEditorHandle, Props>((props, ref) => {
  return (
    <Suspense fallback={null}>
      <Editor ref={ref} {...props} />
    </Suspense>
  )
})

MarkdownEditor.displayName = 'MarkdownEditor'

export default MarkdownEditor
