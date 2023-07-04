import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $getRoot,
  $getSelection,
  $isParagraphNode,
  $isRangeSelection,
} from 'lexical'
import { useEffect, useRef } from 'react'

type ParagraphPlaceholderPluginProps = {
  placeholder: string
  hideOnEmptyEditor?: boolean
}

export const ParagraphPlaceholderPlugin = ({
  placeholder,
  hideOnEmptyEditor,
}: ParagraphPlaceholderPluginProps) => {
  const [editor] = useLexicalComposerContext()
  const paragraphRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const removeUpdateListener = editor.registerUpdateListener(
      ({ editorState }) => {
        const nativeSelection = window.getSelection()

        editorState.read(() => {
          // Cleanup
          if (paragraphRef?.current) {
            paragraphRef.current.removeAttribute('data-placeholder')
            paragraphRef.current.classList.remove('paragraph-placeholder')
            paragraphRef.current = null
          }

          const selection = $getSelection()

          if (!nativeSelection || !selection || !$isRangeSelection(selection))
            return

          if (hideOnEmptyEditor) {
            // Prevent from showing when editor is empty
            // Showing a placeholder in the first empty paragraph might conflict with the RichTextPlugin placeholder
            const textContentSize = $getRoot().getTextContentSize()

            if (!textContentSize) return
          }

          const parentNode = selection.anchor.getNode()

          if (!$isParagraphNode(parentNode) || !parentNode.isEmpty()) return

          // It's a paragraph node, it's empty, and it's selected

          // Now switch over to the native selection to get the paragraph DOM element

          const paragraphDOMElement = nativeSelection.anchorNode

          if (!paragraphDOMElement) return

          if (paragraphDOMElement instanceof HTMLParagraphElement) {
            paragraphRef.current = paragraphDOMElement
            paragraphRef.current.setAttribute('data-placeholder', placeholder)
            paragraphRef.current.classList.add('paragraph-placeholder')
          }
        })
      }
    )

    return () => {
      removeUpdateListener()
    }
  }, [editor, hideOnEmptyEditor, placeholder])

  return null
}
