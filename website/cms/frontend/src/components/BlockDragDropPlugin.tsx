import { useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  DRAGOVER_COMMAND,
  DRAGEND_COMMAND,
  DROP_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_HIGH,
  $getNodeByKey,
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

// Check if the editor's root element lives inside the dragged node's DOM.
// This prevents dropping a component into its own nested children,
// without blocking drops in the parent editor when the mouse happens
// to be over the dragged element's area.
function isEditorInsideDraggedNode(editor: LexicalEditor): boolean {
  if (!dragState) return false
  const draggedElem = dragState.sourceEditor.getElementByKey(dragState.nodeKey)
  if (!draggedElem) return false
  const editorRoot = editor.getRootElement()
  if (!editorRoot) return false
  return draggedElem.contains(editorRoot)
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

function showTargetLineAt(lineY: number, left: number, width: number) {
  const line = getTargetLine()
  line.style.top = `${lineY}px`
  line.style.left = `${left}px`
  line.style.width = `${width}px`
  line.style.opacity = '1'
}

function hideTargetLine() {
  if (targetLine) {
    targetLine.style.opacity = '0'
  }
}

// ---------------------------------------------------------------------------
// Find the closest drop target by scanning all top-level children's DOM rects.
// Uses the midpoint of each block to decide before/after, then picks the
// insertion edge closest to the mouse.
// ---------------------------------------------------------------------------

interface DropTarget {
  node: LexicalNode
  elem: HTMLElement
  position: 'before' | 'after'
}

function $findDropTarget(
  editor: LexicalEditor,
  mouseY: number
): DropTarget | null {
  const root = $getRoot()
  const children = root.getChildren()
  if (children.length === 0) return null

  // Build list of {node, elem, rect} for all visible children except the dragged one
  const blocks: { node: LexicalNode; elem: HTMLElement; rect: DOMRect }[] = []
  for (const child of children) {
    if (dragState && child.getKey() === dragState.nodeKey) continue
    const elem = editor.getElementByKey(child.getKey())
    if (!elem) continue
    blocks.push({ node: child, elem, rect: elem.getBoundingClientRect() })
  }

  if (blocks.length === 0) return null

  // If mouse is above the first block, insert before it
  if (mouseY <= blocks[0].rect.top + blocks[0].rect.height / 2) {
    return { node: blocks[0].node, elem: blocks[0].elem, position: 'before' }
  }

  // If mouse is below the last block, insert after it
  const last = blocks[blocks.length - 1]
  if (mouseY >= last.rect.top + last.rect.height / 2) {
    return { node: last.node, elem: last.elem, position: 'after' }
  }

  // Find the gap the mouse is in: between block[i] and block[i+1]
  for (let i = 0; i < blocks.length - 1; i++) {
    const current = blocks[i]
    const next = blocks[i + 1]
    const currentMid = current.rect.top + current.rect.height / 2
    const nextMid = next.rect.top + next.rect.height / 2

    if (mouseY >= currentMid && mouseY < nextMid) {
      // Decide: closer to current's bottom or next's top?
      const gapMid = (current.rect.bottom + next.rect.top) / 2
      if (mouseY < gapMid) {
        return { node: current.node, elem: current.elem, position: 'after' }
      } else {
        return { node: next.node, elem: next.elem, position: 'before' }
      }
    }
  }

  return { node: last.node, elem: last.elem, position: 'after' }
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

          // Block dropping into the dragged node's own nested editors
          if (isEditorInsideDraggedNode(editor)) {
            hideTargetLine()
            return true
          }

          // Find closest drop target by Y coordinate
          const dropTarget = $findDropTarget(editor, event.clientY)
          if (dropTarget) {
            const rect = dropTarget.elem.getBoundingClientRect()
            const lineY =
              dropTarget.position === 'before'
                ? rect.top - 1.5
                : rect.bottom + 1.5
            showTargetLineAt(lineY, rect.left, rect.width)
          } else {
            hideTargetLine()
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

          // Block dropping into the dragged node's own nested editors
          if (isEditorInsideDraggedNode(editor)) return true

          // Find drop target — command handlers run in an update context,
          // so $ functions work directly.
          const dropTarget = $findDropTarget(editor, event.clientY)
          if (!dropTarget) return true

          const sameEditor = dragState.sourceEditor === editor

          if (sameEditor) {
            const draggedNode = $getNodeByKey(dragData)
            if (!draggedNode) return true
            if (dropTarget.node.getKey() === draggedNode.getKey()) return true

            if (dropTarget.position === 'before') {
              dropTarget.node.insertBefore(draggedNode)
            } else {
              dropTarget.node.insertAfter(draggedNode)
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

            const registeredNodes = editor._nodes
            const nodeType = (serialized as any).type as string
            const nodeClass = registeredNodes.get(nodeType)
            if (!nodeClass) return true

            const clone = (nodeClass.klass as any).importJSON(serialized)

            if (dropTarget.position === 'before') {
              dropTarget.node.insertBefore(clone)
            } else {
              dropTarget.node.insertAfter(clone)
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
