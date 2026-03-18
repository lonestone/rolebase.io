import React, { useEffect, useState, useCallback, useRef } from 'react'
import { CustomJsxEditor, ComponentMetaContext, FilePathContext } from './CustomJsxEditor.js'
import { useComponents } from '../hooks/useComponents.js'
import { useFile, useSaveFile } from '../hooks/useFile.js'
import {
  MDXEditor,
  type MDXEditorMethods,
  headingsPlugin,
  listsPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  thematicBreakPlugin,
  quotePlugin,
  frontmatterPlugin,
  markdownShortcutPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  jsxPlugin,
  toolbarPlugin,
  DiffSourceToggleWrapper,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CodeToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  InsertFrontmatter,
  ListsToggle,
  Separator,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { graphqlLanguageSupport } from 'cm6-graphql'
import { languages } from '@codemirror/language-data'

// Build codeBlockLanguages from @codemirror/language-data (all names + aliases)
const codeBlockLanguages: Record<string, string> = { '': 'Plain text', graphql: 'GraphQL' }
for (const lang of languages) {
  codeBlockLanguages[lang.name.toLowerCase()] = lang.name
  for (const alias of lang.alias) {
    codeBlockLanguages[alias] = lang.name
  }
}

interface Props {
  filePath: string
}

export function Editor({ filePath }: Props) {
  const { data: fileContent, isLoading } = useFile(filePath)
  const saveFile = useSaveFile()
  const { jsxDescriptors, componentMeta } = useComponents()

  const [content, setContent] = useState('')
  const [originalContent, setOriginalContent] = useState('')
  const editorRef = useRef<MDXEditorMethods>(null)
  const contentRef = useRef('')

  // Sync loaded file content into local state
  useEffect(() => {
    if (fileContent !== undefined) {
      setContent(fileContent)
      setOriginalContent(fileContent)
      contentRef.current = fileContent
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

  if (isLoading || !jsxDescriptors) {
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
          key={filePath}
          markdown={originalContent}
          onChange={handleChange}
          contentEditableClassName="mdxeditor-rich-text"
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            linkPlugin(),
            linkDialogPlugin(),
            imagePlugin({
              imagePreviewHandler: async (src) => {
                // Resolve relative paths (e.g. ./image.png) to /content/ route
                if (src.startsWith('./') || (!src.startsWith('/') && !src.startsWith('http'))) {
                  const dir = filePath.replace(/^src\/content\//, '').replace(/\/[^/]+$/, '')
                  const name = src.replace(/^\.\//, '')
                  return `/content/${dir}/${name}`
                }
                return src
              },
            }),
            tablePlugin(),
            thematicBreakPlugin(),
            quotePlugin(),
            frontmatterPlugin(),
            markdownShortcutPlugin(),
            codeBlockPlugin({ defaultCodeBlockLanguage: '' }),
            codeMirrorPlugin({
              codeBlockLanguages,
              codeMirrorExtensions: [graphqlLanguageSupport()],
            }),
            jsxPlugin({ jsxComponentDescriptors: jsxDescriptors }),
            diffSourcePlugin({
              diffMarkdown: originalContent,
              viewMode: 'rich-text',
            }),
            toolbarPlugin({
              toolbarContents: () => (
                <DiffSourceToggleWrapper>
                  <UndoRedo />
                  <Separator />
                  <BoldItalicUnderlineToggles />
                  <CodeToggle />
                  <Separator />
                  <BlockTypeSelect />
                  <Separator />
                  <ListsToggle />
                  <Separator />
                  <CreateLink />
                  <InsertImage />
                  <InsertTable />
                  <InsertThematicBreak />
                  <Separator />
                  <InsertFrontmatter />
                  <ConditionalContents
                    options={[
                      {
                        when: (editor) => editor?.editorType === 'codeblock',
                        contents: () => <ChangeCodeMirrorLanguage />,
                      },
                    ]}
                  />
                </DiffSourceToggleWrapper>
              ),
            }),
          ]}
        />
        </ComponentMetaContext.Provider>
        </FilePathContext.Provider>
      </div>
    </div>
  )
}
