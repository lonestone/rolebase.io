import React, { forwardRef, lazy, Suspense } from 'react'
import { Props } from './CollabEditor'
import { MarkdownEditorHandle } from './useMarkdownEditor'

const Editor = lazy(() =>
  import('./editor').then((v) => ({ default: v.CollabEditor }))
)

const MarkdownCollabEditor = forwardRef<MarkdownEditorHandle, Props>(
  (props, ref) => {
    return (
      <Suspense fallback={null}>
        <Editor ref={ref} {...props} />
      </Suspense>
    )
  }
)

MarkdownCollabEditor.displayName = 'MarkdownCollabEditor'

export default MarkdownCollabEditor
