import { useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  DRAGOVER_COMMAND,
  DRAGEND_COMMAND,
  DROP_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_HIGH,
  $getNodeByKey,
  $getNearestNodeFromDOMNode,
  $getRoot,
  type LexicalEditor,
  type LexicalNode,
} from 'lexical'
import { mergeRegister } from '@lexical/utils'
import {
  realmPlugin,
  addComposerChild$,
  addNestedEditorChild$,
} from '@mdxeditor/editor'

export const DRAG_DATA_FORMAT = 'application/x-lexical-drag-block'

// Drag state shared between the drag handle and command handlers.
let dragState: {
  sourceEditor: LexicalEditor
  nodeKey: string
} | null = null

export function startBlockDrag(editor: LexicalEditor, nodeKey: string) {
  dragState = { sourceEditor: editor, nodeKey }
}

export function endBlockDrag() {
  dragState = null
  hideTargetLine()
}

// Check if the drop target is inside the dragged node (dropping into own children)
function isDropInsideDraggedNode(targetElement: HTMLElement): boolean {
  if (!dragState) return false
  const draggedElem = dragState.sourceEditor.getElementByKey(dragState.nodeKey)
  if (!draggedElem) return false
  return draggedElem.contains(targetElement)
}

// ---------------------------------------------------------------------------
// Target line indicator (singleton DOM element)
// ---------------------------------------------------------------------------

let targetLine: HTMLDivElement | null = null

function getTargetLine(): HTMLDivElement {
  if (!targetLine) {
    targetLine = document.createElement('div')
    targetLine.style.cssText =
      'position:fixed;height:3px;background:#4a90d9;border-radius:1px;' +
      'pointer-events:none;z-index:10000;opacity:0;transition:opacity 0.1s'
    document.body.appendChild(targetLine)
  }
  return targetLine
}

function showTargetLine(targetBlockElem: HTMLElement, mouseY: number) {
  const line = getTargetLine()
  const rect = targetBlockElem.getBoundingClientRect()
  const midY = rect.top + rect.height / 2
  const lineY = mouseY < midY ? rect.top - 1.5 : rect.bottom + 1.5

  line.style.top = `${lineY}px`
  line.style.left = `${rect.left}px`
  line.style.width = `${rect.width}px`
  line.style.opacity = '1'
}

function hideTargetLine() {
  if (targetLine) {
    targetLine.style.opacity = '0'
  }
}

// Walk up from a node to find a direct child of root
function $getTopLevelNode(node: ReturnType<typeof $getNearestNodeFromDOMNode>) {
  if (!node) return null
  const root = $getRoot()
  let topLevel = node
  while (topLevel.getParent() !== root && topLevel.getParent() !== null) {
    topLevel = topLevel.getParent()!
  }
  return topLevel
}

// ---------------------------------------------------------------------------
// Command handler component — registered on root AND nested editors
// ---------------------------------------------------------------------------

function BlockDragDropHandler() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        DRAGOVER_COMMAND,
        (event) => {
          if (!dragState) return false
          event.preventDefault()
          if (event.dataTransfer) {
            event.dataTransfer.dropEffect = 'move'
          }

          const target = event.target
          if (!(target instanceof HTMLElement)) return true

          // Block dropping into own children
          if (isDropInsideDraggedNode(target)) {
            hideTargetLine()
            return true
          }

          // Position target line indicator
          const topLevel = $getTopLevelNode($getNearestNodeFromDOMNode(target))
          if (topLevel) {
            const elem = editor.getElementByKey(topLevel.getKey())
            if (elem) {
              showTargetLine(elem, event.clientY)
            }
          }

          return true
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      editor.registerCommand(
        DRAGEND_COMMAND,
        () => {
          if (!dragState) return false
          hideTargetLine()
          return false
        },
        COMMAND_PRIORITY_HIGH
      ),
      editor.registerCommand(
        DROP_COMMAND,
        (event) => {
          if (!dragState) return false

          const dragData = event.dataTransfer?.getData(DRAG_DATA_FORMAT)
          if (!dragData) return false

          event.preventDefault()
          hideTargetLine()

          const target = event.target
          if (!(target instanceof HTMLElement)) return true

          // Block dropping into own children
          if (isDropInsideDraggedNode(target)) return true

          const topLevelTarget = $getTopLevelNode(
            $getNearestNodeFromDOMNode(target)
          )
          if (!topLevelTarget) return true

          const sameEditor = dragState.sourceEditor === editor

          if (sameEditor) {
            // Same editor: move the node directly
            const draggedNode = $getNodeByKey(dragData)
            if (!draggedNode) return true
            if (topLevelTarget.getKey() === draggedNode.getKey()) return true

            const targetElem = editor.getElementByKey(topLevelTarget.getKey())
            if (!targetElem) return true
            const midY =
              targetElem.getBoundingClientRect().top +
              targetElem.getBoundingClientRect().height / 2

            if (event.clientY < midY) {
              topLevelTarget.insertBefore(draggedNode)
            } else {
              topLevelTarget.insertAfter(draggedNode)
            }
          } else {
            // Cross-editor: export from source, import in target
            let serialized: ReturnType<LexicalNode['exportJSON']> | null = null

            dragState.sourceEditor.update(() => {
              const node = $getNodeByKey(dragData)
              if (!node) return
              serialized = node.exportJSON()
              node.remove()
            })

            if (!serialized) return true

            // Import the node in the current editor
            const registeredNodes = editor._nodes
            const nodeType = (serialized as any).type as string
            const nodeClass = registeredNodes.get(nodeType)
            if (!nodeClass) return true

            const clone = (nodeClass.klass as any).importJSON(serialized)

            const targetElem = editor.getElementByKey(topLevelTarget.getKey())
            if (!targetElem) return true
            const midY =
              targetElem.getBoundingClientRect().top +
              targetElem.getBoundingClientRect().height / 2

            if (event.clientY < midY) {
              topLevelTarget.insertBefore(clone)
            } else {
              topLevelTarget.insertAfter(clone)
            }
          }

          return true
        },
        COMMAND_PRIORITY_HIGH
      )
    )
  }, [editor])

  return null
}

export const blockDragDropPlugin = realmPlugin({
  init(realm) {
    realm.pubIn({
      [addComposerChild$]: BlockDragDropHandler,
      [addNestedEditorChild$]: BlockDragDropHandler,
    })
  },
})
