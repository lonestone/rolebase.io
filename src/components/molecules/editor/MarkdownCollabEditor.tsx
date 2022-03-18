import React, { forwardRef, lazy, Suspense } from 'react'
// Types
import { Props } from './chunk/CollabEditor'
import { MarkdownEditorHandle } from './chunk/useMarkdownEditor'

const Editor = lazy(() =>
  import('./chunk/editor').then((v) => ({ default: v.CollabEditor }))
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
