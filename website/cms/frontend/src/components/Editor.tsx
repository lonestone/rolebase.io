import React, { useEffect, useState, useCallback, useRef } from 'react'
import { fetchFile, saveFile, fetchComponents } from '../api.js'
import {
  MDXEditor,
  type MDXEditorMethods,
  type JsxComponentDescriptor,
  GenericJsxEditor,
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

// Known props for common components
const knownProps: Record<string, JsxComponentDescriptor['props']> = {
  Callout: [{ name: 'type', type: 'string' }],
  Youtube: [{ name: 'videoId', type: 'string' }],
  TellaVideo: [
    { name: 'videoId', type: 'string' },
    { name: 'aspect', type: 'string' },
  ],
  LoomVideo: [
    { name: 'loomId', type: 'string' },
    { name: 'aspect', type: 'string' },
  ],
  Button: [
    { name: 'href', type: 'string' },
    { name: 'variant', type: 'string' },
    { name: 'size', type: 'string' },
    { name: 'block', type: 'string' },
    { name: 'slot', type: 'string' },
  ],
  Section: [
    { name: 'class', type: 'string' },
    { name: 'full', type: 'string' },
  ],
  SplitSection: [
    { name: 'reverse', type: 'string' },
    { name: 'align', type: 'string' },
  ],
  EntityFields: [{ name: 'fields', type: 'expression' }],
  PricingCard: [
    { name: 'title', type: 'string' },
    { name: 'featured', type: 'string' },
  ],
  PartnerCard: [
    { name: 'name', type: 'string' },
    { name: 'logo', type: 'string' },
    { name: 'url', type: 'string' },
  ],
  CtaBanner: [{ name: 'riveUrl', type: 'string' }],
  ProblemItem: [
    { name: 'icon', type: 'string' },
    { name: 'title', type: 'string' },
  ],
  OfferCard: [
    { name: 'icon', type: 'string' },
    { name: 'title', type: 'string' },
    { name: 'href', type: 'string' },
  ],
}

// Inline (text) components vs block (flow) components
const inlineComponents = new Set(['Button'])

function buildDescriptors(names: string[]): JsxComponentDescriptor[] {
  return names.map((name) => ({
    name,
    kind: inlineComponents.has(name) ? ('text' as const) : ('flow' as const),
    props: knownProps[name] ?? [],
    hasChildren: true,
    Editor: GenericJsxEditor,
  }))
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
  const editorRef = useRef<MDXEditorMethods>(null)
  const contentRef = useRef('')

  const isDirty = content !== originalContent

  useEffect(() => {
    fetchComponents().then((names) => setJsxDescriptors(buildDescriptors(names)))
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
        <MDXEditor
          ref={editorRef}
          key={filePath}
          markdown={originalContent}
          onChange={handleChange}
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
              codeBlockLanguages: {
                '': 'Plain text',
                js: 'JavaScript',
                ts: 'TypeScript',
                tsx: 'TSX',
                jsx: 'JSX',
                css: 'CSS',
                html: 'HTML',
                json: 'JSON',
                bash: 'Bash',
                graphql: 'GraphQL',
                yaml: 'YAML',
                mdx: 'MDX',
              },
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
      </div>
    </div>
  )
}
