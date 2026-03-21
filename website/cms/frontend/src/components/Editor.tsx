import { useEffect, useState, useCallback, useRef, useMemo } from 'react'
import { ComponentMetaContext } from './CustomJsxEditor.js'
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
import EditorHeader from './EditorHeader.js'
import { useFilePath } from '../contexts/FilePathContext.js'
import type { TreeNode } from '../api.js'
import { getLocaleSiblings } from '../utils/folderTarget.js'

interface Props {
  tree: TreeNode[]
  onSelectFile: (path: string) => void
}

export function Editor({ tree, onSelectFile }: Props) {
  const filePath = useFilePath()!
  const localeSiblings = useMemo(
    () => getLocaleSiblings(tree, filePath),
    [tree, filePath]
  )

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

  const loading = isLoading || !ready || !plugins

  return (
    <div className="flex flex-col h-full">
      <EditorHeader
        isDirty={isDirty}
        isSaving={saveFile.isPending}
        localeSiblings={localeSiblings}
        onSave={handleSave}
        onSelectFile={onSelectFile}
      />
      <div className="flex-1 flex flex-col border border-border rounded-md overflow-auto bg-bg">
        {loading ? (
          <div className="p-5 text-text-muted">Loading...</div>
        ) : (
          <>
            {schema && (
              <FrontmatterEditor
                schema={schema}
                frontmatter={frontmatter}
                onChange={handleFrontmatterChange}
              />
            )}
            <ComponentMetaContext.Provider value={componentMeta}>
              <MDXEditor
                ref={editorRef}
                markdown={originalBody}
                onChange={handleBodyChange}
                contentEditableClassName="mdxeditor-rich-text"
                plugins={plugins}
                className="bg-white"
              />
            </ComponentMetaContext.Provider>
          </>
        )}
      </div>
    </div>
  )
}
