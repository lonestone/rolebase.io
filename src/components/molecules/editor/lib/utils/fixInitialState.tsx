import { $convertFromMarkdownString } from '@lexical/markdown'
import { InitialEditorStateType } from '@lexical/react/LexicalComposer'
import { markdownTransformers } from '../plugins/MarkdownTransformers'

export function fixInitialState(
  value?: InitialEditorStateType
): InitialEditorStateType | undefined {
  if (!value) return undefined
  // Markdown
  if (typeof value === 'string' && value[0] !== '{') {
    return () => $convertFromMarkdownString(value, markdownTransformers)
  }
  // Other types: EditorState, string, function
  return value
}
