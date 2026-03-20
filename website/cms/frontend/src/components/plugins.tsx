import {
  headingsPlugin,
  listsPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  thematicBreakPlugin,
  quotePlugin,
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
  InsertCodeBlock,
  ListsToggle,
  Separator,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  type JsxComponentDescriptor,
} from '@mdxeditor/editor'
import { CustomImageDialog } from './ImageDialog.js'
import { InsertComponent } from './InsertComponent.js'
import { blockDragDropPlugin } from './BlockDragDropPlugin.js'
import { resolvePreviewSrc } from '../utils/resolvePreviewSrc.js'
import { graphqlLanguageSupport } from 'cm6-graphql'
import { languages } from '@codemirror/language-data'
import React from 'react'

// Build codeBlockLanguages from @codemirror/language-data, deduplicated:
// keep only the shortest alias per language name.
const codeBlockLanguages: Record<string, string> = {
  '': 'Plain text',
  graphql: 'GraphQL',
}
const seen = new Map<string, string>() // label -> shortest key
for (const lang of languages) {
  const keys = [lang.name.toLowerCase(), ...lang.alias]
  const label = lang.name
  const prev = seen.get(label)
  const shortest = keys.reduce((a, b) => (a.length <= b.length ? a : b))
  if (prev === undefined || shortest.length < prev.length) {
    if (prev !== undefined) delete codeBlockLanguages[prev]
    seen.set(label, shortest)
    codeBlockLanguages[shortest] = label
  }
}

interface CreatePluginsParams {
  filePath: string
  jsxDescriptors: JsxComponentDescriptor[]
  originalContent: string
}

export function createPlugins({
  filePath,
  jsxDescriptors,
  originalContent,
}: CreatePluginsParams) {
  return [
    headingsPlugin(),
    listsPlugin(),
    linkPlugin(),
    linkDialogPlugin(),
    imagePlugin({
      ImageDialog: CustomImageDialog,
      imagePreviewHandler: async (src) => {
        return resolvePreviewSrc(src, filePath) ?? src
      },
    }),
    tablePlugin(),
    thematicBreakPlugin(),
    quotePlugin(),

    markdownShortcutPlugin(),
    codeBlockPlugin({ defaultCodeBlockLanguage: '' }),
    codeMirrorPlugin({
      codeBlockLanguages,
      codeMirrorExtensions: [graphqlLanguageSupport()],
    }),
    jsxPlugin({ jsxComponentDescriptors: jsxDescriptors }),
    blockDragDropPlugin(),
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
          <InsertCodeBlock />
          <InsertThematicBreak />
          <Separator />
          <InsertComponent />
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
  ]
}
