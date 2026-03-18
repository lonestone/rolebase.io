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
  ListsToggle,
  Separator,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  type JsxComponentDescriptor,
} from '@mdxeditor/editor'
import { CustomImageDialog } from './ImageDialog.js'
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

interface CreatePluginsParams {
  filePath: string
  jsxDescriptors: JsxComponentDescriptor[]
  originalContent: string
}

export function createPlugins({ filePath, jsxDescriptors, originalContent }: CreatePluginsParams) {
  return [
    headingsPlugin(),
    listsPlugin(),
    linkPlugin(),
    linkDialogPlugin(),
    imagePlugin({
      ImageDialog: CustomImageDialog,
      imagePreviewHandler: async (src) => {
        if (
          src.startsWith('./') ||
          (!src.startsWith('/') && !src.startsWith('http'))
        ) {
          const dir = filePath.replace(/\/[^/]+$/, '')
          const name = src.replace(/^\.\//, '')
          return `/content/${dir}/${name}`
        }
        return src
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
