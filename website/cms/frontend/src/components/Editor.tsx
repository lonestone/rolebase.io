import { useEffect, useState, useCallback, useRef, useMemo } from 'react'
import { CustomJsxEditor, ComponentMetaContext, FilePathContext } from './CustomJsxEditor.js'
import { useComponents } from '../hooks/useComponents.js'
import { useFile, useSaveFile } from '../hooks/useFile.js'
import { MDXEditor, type MDXEditorMethods } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { createPlugins } from './plugins.js'

interface Props {
  filePath: string
}

export function Editor({ filePath }: Props) {
  const { data: fileContent, isLoading } = useFile(filePath)
  const saveFile = useSaveFile()
  const { jsxDescriptors, componentMeta } = useComponents()

  const [content, setContent] = useState('')
  const [originalContent, setOriginalContent] = useState('')
  const [ready, setReady] = useState(false)
  const editorRef = useRef<MDXEditorMethods>(null)
  const contentRef = useRef('')

  // Sync loaded file content into local state
  useEffect(() => {
    if (fileContent !== undefined) {
      setContent(fileContent)
      setOriginalContent(fileContent)
      contentRef.current = fileContent
      setReady(true)
    }
  }, [fileContent])

  const isDirty = content !== originalContent

  const handleSave = useCallback(async () => {
    const current = contentRef.current
    await saveFile.mutateAsync({ path: filePath, content: current })
    setOriginalContent(current)
  }, [filePath, saveFile])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        if (contentRef.current !== originalContent) handleSave()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [originalContent, handleSave])

  const handleChange = useCallback((markdown: string) => {
    setContent(markdown)
    contentRef.current = markdown
  }, [])

  // Memoize plugins to avoid MDXEditor reinitialization on re-renders
  const plugins = useMemo(
    () =>
      jsxDescriptors
        ? createPlugins({ filePath, jsxDescriptors, originalContent })
        : undefined,
    // Recreate plugins when ready flips to true (with correct originalContent).
    // MDXEditor isn't mounted until ready, so this doesn't cause reinitialization.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filePath, jsxDescriptors, ready]
  )

  if (isLoading || !ready || !plugins) {
    return (
      <div style={{ padding: 20, color: 'var(--text-muted)' }}>Loading...</div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
      >
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          {filePath}
          {isDirty && (
            <span style={{ color: 'var(--primary)', marginLeft: 8 }}>
              Modified
            </span>
          )}
        </span>
        <button
          onClick={handleSave}
          disabled={!isDirty || saveFile.isPending}
          style={{
            padding: '4px 16px',
            borderRadius: 'var(--radius)',
            border: 'none',
            background: isDirty ? 'var(--primary)' : 'var(--border)',
            color: isDirty ? '#fff' : 'var(--text-muted)',
            fontSize: 13,
            cursor: isDirty ? 'pointer' : 'default',
          }}
        >
          {saveFile.isPending ? 'Saving...' : 'Save'}
        </button>
      </div>
      <div
        style={{
          flex: 1,
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          overflow: 'auto',
          background: '#fff',
        }}
      >
        <FilePathContext.Provider value={filePath}>
        <ComponentMetaContext.Provider value={componentMeta}>
        <MDXEditor
          ref={editorRef}
          markdown={originalContent}
          onChange={handleChange}
          contentEditableClassName="mdxeditor-rich-text"
          plugins={plugins}
        />
        </ComponentMetaContext.Provider>
        </FilePathContext.Provider>
      </div>
    </div>
  )
}
