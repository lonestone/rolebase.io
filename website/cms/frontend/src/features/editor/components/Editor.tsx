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
import type { TreeNode } from '../../../api.js'
import { getLocaleSiblings } from '../../common/utils/folderTarget.js'
import {
  getDataFormat,
  isDataFormat,
  parseDataContent,
  serializeDataContent,
  inferSchemaFromData,
} from '../utils/dataFormats.js'

interface Props {
  tree: TreeNode[]
  onSelectFile: (path: string) => void
}

export function Editor({ tree, onSelectFile }: Props) {
  const filePath = useFilePath()!
  const format = useMemo(() => getDataFormat(filePath), [filePath])
  const dataOnly = isDataFormat(format)

  const localeSiblings = useMemo(
    () => getLocaleSiblings(tree, filePath),
    [tree, filePath]
  )

  const { data: fileData, isLoading } = useFile(filePath)
  const saveFile = useSaveFile()
  const { jsxDescriptors, componentMeta } = useComponents()

  // Frontmatter/data and body are managed separately
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
  const serverSchema = fileData?.frontmatterSchema

  // For data files without an explicit schema, infer fields from data
  const schema = useMemo(() => {
    if (serverSchema && serverSchema.length > 0) return serverSchema
    if (dataOnly) return inferSchemaFromData(frontmatter)
    return serverSchema
  }, [serverSchema, dataOnly, frontmatter])

  // Sync loaded file content into local state
  useEffect(() => {
    if (fileData !== undefined) {
      if (dataOnly) {
        const data = parseDataContent(fileData.content, format)
        setFrontmatter(data)
        setOriginalFrontmatter(data)
        frontmatterRef.current = data
        esmRef.current = ''
        setBody('')
        setOriginalBody('')
        bodyRef.current = ''
      } else {
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
      }
      setReady(true)
    }
  }, [fileData, dataOnly, format])

  const isDirty =
    body !== originalBody ||
    JSON.stringify(frontmatter) !== JSON.stringify(originalFrontmatter)

  const handleSave = useCallback(async () => {
    let content: string
    if (dataOnly) {
      content = serializeDataContent(frontmatterRef.current, format)
    } else {
      const fullBody = combineEsmAndContent(esmRef.current, bodyRef.current)
      content = combineFrontmatterAndBody(frontmatterRef.current, fullBody)
    }
    await saveFile.mutateAsync({ path: filePath, content })
    setOriginalBody(bodyRef.current)
    setOriginalFrontmatter(frontmatterRef.current)
  }, [filePath, saveFile, dataOnly, format])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        const fmDirty =
          JSON.stringify(frontmatterRef.current) !==
          JSON.stringify(originalFrontmatter)
        const bodyDirty = bodyRef.current !== originalBody
        if (fmDirty || bodyDirty) handleSave()
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

  const loading = dataOnly
    ? isLoading || !ready
    : isLoading || !ready || !plugins

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
            {schema && schema.length > 0 && (
              <FrontmatterEditor
                schema={schema}
                frontmatter={frontmatter}
                onChange={handleFrontmatterChange}
              />
            )}
            {!dataOnly && (
              <ComponentMetaContext.Provider value={componentMeta}>
                <MDXEditor
                  ref={editorRef}
                  markdown={originalBody}
                  onChange={handleBodyChange}
                  contentEditableClassName="mdxeditor-rich-text"
                  plugins={plugins!}
                  className="bg-white"
                />
              </ComponentMetaContext.Provider>
            )}
          </>
        )}
      </div>
    </div>
  )
}
