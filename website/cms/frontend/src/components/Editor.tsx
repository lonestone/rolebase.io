import React, { useEffect, useState, useCallback, useRef } from 'react'
import { fetchFile, saveFile, fetchComponents, type ComponentDescriptor } from '../api.js'
import { CustomJsxEditor, ComponentMetaContext } from './CustomJsxEditor.js'
import {
  MDXEditor,
  type MDXEditorMethods,
  type JsxComponentDescriptor,
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

// Inline (text) components vs block (flow) components
const inlineComponents = new Set(['Button'])

function buildDescriptors(components: ComponentDescriptor[]): JsxComponentDescriptor[] {
  return components.map(({ name, props, hasChildren }) => ({
    name,
    kind: inlineComponents.has(name) ? ('text' as const) : ('flow' as const),
    // Map to mdxeditor's limited type system (string | number | expression)
    props: props.map((p) => ({
      name: p.name,
      type: (p.type === 'json' ? 'expression' : 'string') as 'string' | 'number' | 'expression',
    })),
    hasChildren,
    Editor: CustomJsxEditor,
  }))
}

// Build a lookup map from component name to its rich prop metadata
function buildComponentMeta(
  components: ComponentDescriptor[]
): Record<string, ComponentDescriptor> {
  return Object.fromEntries(components.map((c) => [c.name, c]))
}

interface Props {
  filePath: string
  onSave: () => void
}

export function Editor({ filePath, onSave }: Props) {
  const [content, setContent] = useState('')
  const [originalContent, setOriginalContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [jsxDescriptors, setJsxDescriptors] = useState<
    JsxComponentDescriptor[]
  >([])
  const [componentMeta, setComponentMeta] = useState<
    Record<string, ComponentDescriptor>
  >({})
  const editorRef = useRef<MDXEditorMethods>(null)
  const contentRef = useRef('')

  const isDirty = content !== originalContent

  useEffect(() => {
    fetchComponents().then((components) => {
      setJsxDescriptors(buildDescriptors(components))
      setComponentMeta(buildComponentMeta(components))
    })
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchFile(filePath).then((data) => {
      setContent(data.content)
      setOriginalContent(data.content)
      contentRef.current = data.content
      setLoading(false)
    })
  }, [filePath])

  const handleSave = useCallback(async () => {
    const current = contentRef.current
    setSaving(true)
    await saveFile(filePath, current)
    setOriginalContent(current)
    setSaving(false)
    onSave()
  }, [filePath, onSave])

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

  if (loading) {
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
          disabled={!isDirty || saving}
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
          {saving ? 'Saving...' : 'Save'}
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
            imagePlugin(),
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
      </div>
    </div>
  )
}
