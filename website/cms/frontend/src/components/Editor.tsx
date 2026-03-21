import { useEffect, useState, useCallback, useRef, useMemo } from 'react'
import { ComponentMetaContext, FilePathContext } from './CustomJsxEditor.js'
import { useComponents } from '../hooks/useComponents.js'
import { useFile, useSaveFile } from '../hooks/useFile.js'
import { MDXEditor, type MDXEditorMethods } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { createPlugins } from './plugins.js'
import FrontmatterEditor, {
  type FrontmatterData,
  extractBody,
  extractRawFrontmatter,
  parseFrontmatterYaml,
  combineFrontmatterAndBody,
  extractEsmLines,
  combineEsmAndContent,
} from './FrontmatterEditor.js'
import React from 'react'
import Button from './Button.js'

interface Props {
  filePath: string
}

export function Editor({ filePath }: Props) {
  const { data: fileData, isLoading } = useFile(filePath)
  const saveFile = useSaveFile()
  const { jsxDescriptors, componentMeta } = useComponents()

  // Frontmatter and body are managed separately
  const [frontmatter, setFrontmatter] = useState<FrontmatterData>({})
  const [originalFrontmatter, setOriginalFrontmatter] =
    useState<FrontmatterData>({})
  const [body, setBody] = useState('')
  const [originalBody, setOriginalBody] = useState('')
  const [ready, setReady] = useState(false)
  const editorRef = useRef<MDXEditorMethods>(null)
  const bodyRef = useRef('')
  const frontmatterRef = useRef<FrontmatterData>({})
  // ESM (import/export) lines are stripped before passing to MDXEditor
  // and re-prepended on save, since MDXEditor does not preserve them
  const esmRef = useRef('')

  // Schema comes from the backend (parsed from content.config.ts)
  const schema = fileData?.frontmatterSchema

  // Sync loaded file content into local state
  useEffect(() => {
    if (fileData !== undefined) {
      const rawYaml = extractRawFrontmatter(fileData.content)
      const fm = rawYaml ? parseFrontmatterYaml(rawYaml) : {}
      const rawBody = extractBody(fileData.content)
      const { esm, content } = extractEsmLines(rawBody)

      setFrontmatter(fm)
      setOriginalFrontmatter(fm)
      frontmatterRef.current = fm
      esmRef.current = esm
      setBody(content)
      setOriginalBody(content)
      bodyRef.current = content
      setReady(true)
    }
  }, [fileData])

  const isDirty =
    body !== originalBody ||
    JSON.stringify(frontmatter) !== JSON.stringify(originalFrontmatter)

  const handleSave = useCallback(async () => {
    const fullBody = combineEsmAndContent(esmRef.current, bodyRef.current)
    const combined = combineFrontmatterAndBody(frontmatterRef.current, fullBody)
    await saveFile.mutateAsync({ path: filePath, content: combined })
    setOriginalBody(bodyRef.current)
    setOriginalFrontmatter(frontmatterRef.current)
  }, [filePath, saveFile])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        const currentFullBody = combineEsmAndContent(
          esmRef.current,
          bodyRef.current
        )
        const originalFullBody = combineEsmAndContent(
          esmRef.current,
          originalBody
        )
        const currentCombined = combineFrontmatterAndBody(
          frontmatterRef.current,
          currentFullBody
        )
        const originalCombined = combineFrontmatterAndBody(
          originalFrontmatter,
          originalFullBody
        )
        if (currentCombined !== originalCombined) handleSave()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [originalFrontmatter, originalBody, handleSave])

  const handleBodyChange = useCallback((markdown: string) => {
    setBody(markdown)
    bodyRef.current = markdown
  }, [])

  const handleFrontmatterChange = useCallback((data: FrontmatterData) => {
    setFrontmatter(data)
    frontmatterRef.current = data
  }, [])

  // Memoize plugins to avoid MDXEditor reinitialization on re-renders
  const plugins = useMemo(
    () =>
      jsxDescriptors
        ? createPlugins({
            filePath,
            jsxDescriptors,
            originalContent: originalBody,
          })
        : undefined,
    // Recreate plugins when ready flips to true (with correct originalBody).
    // MDXEditor isn't mounted until ready, so this doesn't cause reinitialization.
    [filePath, jsxDescriptors, ready]
  )

  if (isLoading || !ready || !plugins) {
    return <div className="p-5 text-text-muted">Loading...</div>
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xl font-bold">
          {filePath.replace(/\.mdx?$/, '').split('/').map((part, i, arr) => (
            <span key={i}>
              {i > 0 && <span className="text-text-muted/40 font-normal"> / </span>}
              {part}
            </span>
          ))}
          {isDirty && <span className="text-primary ml-2 text-sm font-normal">Modified</span>}
        </span>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={!isDirty || saveFile.isPending}
        >
          {saveFile.isPending ? 'Saving...' : 'Save'}
        </Button>
      </div>
      <div className="flex-1 flex flex-col border border-border rounded-md overflow-auto bg-white">
        {schema && (
          <FrontmatterEditor
            schema={schema}
            frontmatter={frontmatter}
            filePath={filePath}
            onChange={handleFrontmatterChange}
          />
        )}
        <FilePathContext.Provider value={filePath}>
          <ComponentMetaContext.Provider value={componentMeta}>
            <MDXEditor
              ref={editorRef}
              markdown={originalBody}
              onChange={handleBodyChange}
              contentEditableClassName="mdxeditor-rich-text"
              plugins={plugins}
            />
          </ComponentMetaContext.Provider>
        </FilePathContext.Provider>
      </div>
    </div>
  )
}
