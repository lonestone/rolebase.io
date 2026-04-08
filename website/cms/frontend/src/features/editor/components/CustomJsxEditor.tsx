import React, {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useState,
  useRef,
  useEffect,
} from 'react'
import {
  type JsxEditorProps,
  useMdastNodeUpdater,
  useLexicalNodeRemove,
  useNestedEditorContext,
  iconComponentFor$,
} from '@mdxeditor/editor'
import { useCellValue } from '@mdxeditor/gurx'
import {
  $createNodeSelection,
  $createParagraphNode,
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  $setSelection,
  BLUR_COMMAND,
  COMMAND_PRIORITY_LOW,
  KEY_ENTER_COMMAND,
} from 'lexical'
import type { ComponentDescriptor, PropSchema } from '../../../api.js'
import { PropInput } from './PropInput.js'
import JsonTableEditor from './JsonTableEditor.js'
import SlotEditor from './SlotEditor.js'
import {
  DRAG_DATA_FORMAT,
  startBlockDrag,
  endBlockDrag,
} from './BlockDragDropPlugin.js'

// Context to pass rich prop metadata from Editor to CustomJsxEditor
export const ComponentMetaContext = createContext<
  Record<string, ComponentDescriptor>
>({})

const isExpressionValue = (
  value: unknown
): value is { type: string; value: string } =>
  value !== null &&
  typeof value === 'object' &&
  'type' in (value as Record<string, unknown>) &&
  'value' in (value as Record<string, unknown>) &&
  typeof (value as Record<string, string>).value === 'string'

const isMdxJsxAttribute = (
  attr: unknown
): attr is { type: 'mdxJsxAttribute'; name: string; value: unknown } =>
  typeof attr === 'object' &&
  attr !== null &&
  (attr as Record<string, unknown>).type === 'mdxJsxAttribute' &&
  typeof (attr as Record<string, unknown>).name === 'string'

export function CustomJsxEditor({ mdastNode, descriptor }: JsxEditorProps) {
  const updateMdastNode = useMdastNodeUpdater()
  const removeNode = useLexicalNodeRemove()
  const { parentEditor, lexicalNode } = useNestedEditorContext()
  const iconComponentFor = useCellValue(iconComponentFor$)
  const meta = useContext(ComponentMetaContext)
  const componentMeta = mdastNode.name ? meta[mdastNode.name] : undefined

  const [selected, setSelected] = useState(false)
  const blockRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const unregisterUpdate = parentEditor.registerUpdateListener(
      ({ editorState }) => {
        editorState.read(() => {
          const selection = $getSelection()
          if ($isNodeSelection(selection)) {
            setSelected(selection.has(lexicalNode.getKey()))
          } else {
            setSelected(false)
          }
        })
      }
    )

    const unregisterEnter = parentEditor.registerCommand(
      KEY_ENTER_COMMAND,
      (event) => {
        const selection = $getSelection()
        if (
          $isNodeSelection(selection) &&
          selection.has(lexicalNode.getKey())
        ) {
          event?.preventDefault()
          const node = $getNodeByKey(lexicalNode.getKey())
          if (node) {
            const paragraph = $createParagraphNode()
            node.insertAfter(paragraph)
            paragraph.selectStart()
          }
          return true
        }
        return false
      },
      COMMAND_PRIORITY_LOW
    )

    const unregisterBlur = parentEditor.registerCommand(
      BLUR_COMMAND,
      () => {
        setSelected(false)
        return false
      },
      COMMAND_PRIORITY_LOW
    )

    return () => {
      unregisterUpdate()
      unregisterEnter()
      unregisterBlur()
    }
  }, [parentEditor, lexicalNode])

  const handleDuplicate = useCallback(() => {
    parentEditor.update(() => {
      const node = $getNodeByKey(lexicalNode.getKey())
      if (!node) return
      const serialized = node.exportJSON()
      const clone = (node.constructor as any).importJSON(serialized)
      node.insertAfter(clone)
    })
  }, [parentEditor, lexicalNode])

  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      e.dataTransfer.setData(DRAG_DATA_FORMAT, lexicalNode.getKey())
      e.dataTransfer.effectAllowed = 'move'
      startBlockDrag(parentEditor, lexicalNode.getKey())
      if (blockRef.current) {
        const rect = blockRef.current.getBoundingClientRect()
        e.dataTransfer.setDragImage(
          blockRef.current,
          e.clientX - rect.left,
          e.clientY - rect.top
        )
      }
    },
    [parentEditor, lexicalNode]
  )

  const handleDragEnd = useCallback(() => {
    endBlockDrag()
  }, [])

  const handleDelete = useCallback(() => {
    removeNode()
  }, [removeNode])

  const properties = useMemo(
    () =>
      descriptor.props.reduce<Record<string, string>>((acc, { name }) => {
        const attribute = mdastNode.attributes.find(
          (attr) => isMdxJsxAttribute(attr) && attr.name === name
        )
        if (attribute && isMdxJsxAttribute(attribute)) {
          if (isExpressionValue(attribute.value)) {
            acc[name] = attribute.value.value
            return acc
          }
          if (typeof attribute.value === 'string') {
            acc[name] = attribute.value
            return acc
          }
          if (attribute.value === null) {
            acc[name] = 'true'
            return acc
          }
        }
        acc[name] = ''
        return acc
      }, {}),
    [mdastNode, descriptor]
  )

  const handlePropChange = useCallback(
    (propName: string, value: string) => {
      const newValues = { ...properties, [propName]: value }
      const updatedAttributes = Object.entries(newValues)
        .filter(([, v]) => v !== '')
        .map(([name, value]) => {
          const richProp = componentMeta?.props.find((p) => p.name === name)
          if (richProp?.type === 'json') {
            return {
              type: 'mdxJsxAttribute' as const,
              name,
              value: {
                type: 'mdxJsxAttributeValueExpression' as const,
                value,
              },
            }
          }
          if (richProp?.type === 'boolean' && value === 'true') {
            return { type: 'mdxJsxAttribute' as const, name, value: null }
          }
          return { type: 'mdxJsxAttribute' as const, name, value }
        })
      updateMdastNode({ attributes: updatedAttributes })
    },
    [properties, componentMeta, updateMdastNode]
  )

  const handleSelect = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      parentEditor.update(() => {
        const selection = $createNodeSelection()
        selection.add(lexicalNode.getKey())
        $setSelection(selection)
      })
    },
    [parentEditor, lexicalNode]
  )

  const componentName = mdastNode.name ?? 'Fragment'
  const slots = componentMeta?.slots ?? (descriptor.hasChildren ? [''] : [])
  const hasNamedSlots = slots.some((s) => s !== '')
  const hasBody = descriptor.props.length > 0 || slots.length > 0

  return (
    <div ref={blockRef} className="relative my-1">
      <div
        className={`border rounded transition-colors duration-150 ${
          selected ? 'border-gray-400' : 'border-gray-200'
        }`}
      >
        {/* Header */}
        <div
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onClick={handleSelect}
          className={`flex items-center justify-between px-2 py-1 bg-gray-100 text-xs font-mono cursor-grab ${
            hasBody ? 'border-b border-gray-200 rounded-t' : 'rounded'
          }`}
        >
          <span className="font-semibold text-gray-500 select-none">
            {componentName}
          </span>
          <span className="flex gap-0.5">
            <button
              onClick={handleDuplicate}
              title="Duplicate"
              aria-label="Duplicate component"
              tabIndex={0}
              className="bg-transparent border-none cursor-pointer text-gray-400 text-xs leading-none p-0.5 rounded-sm hover:text-gray-700"
            >
              {iconComponentFor('content_copy')}
            </button>
            <button
              onClick={handleDelete}
              title="Delete"
              aria-label="Delete component"
              tabIndex={0}
              className="bg-transparent border-none cursor-pointer text-gray-400 text-xs leading-none p-0.5 rounded-sm hover:text-red-600"
            >
              {iconComponentFor('delete_small')}
            </button>
          </span>
        </div>

        {/* Props */}
        {descriptor.props.length > 0 && (
          <div
            className={`flex flex-col gap-0.5 px-2 py-1 text-xs font-mono ${
              slots.length > 0 ? 'border-b border-gray-200' : ''
            }`}
          >
            {descriptor.props.map(({ name }) => {
              const rich = componentMeta?.props.find((p) => p.name === name)
              const value = properties[name] ?? ''

              if (rich?.type === 'json' && rich.itemSchema) {
                return (
                  <JsonTableEditor
                    key={name}
                    value={value || '[]'}
                    schema={rich.itemSchema}
                    onChange={(v) => handlePropChange(name, v)}
                  />
                )
              }

              return (
                <PropInput
                  key={name}
                  schema={rich ?? { name, type: 'string' }}
                  value={value}
                  onChange={(v) => handlePropChange(name, v)}
                />
              )
            })}
          </div>
        )}

        {/* Slots */}
        {slots.map((slotName, i) => (
          <div
            key={slotName}
            className={`px-2 py-1 ${
              i < slots.length - 1 ? 'border-b border-gray-200' : ''
            } ${slotName ? '[&>div:last-child]:pt-8!' : ''}`}
          >
            {slots.length > 1 && (
              <div className="text-2xs text-gray-400 font-mono mb-0.5 absolute pointer-events-none">
                {slotName || 'children'}
              </div>
            )}
            <SlotEditor slotName={slotName} hasNamedSlots={hasNamedSlots} />
          </div>
        ))}
      </div>
    </div>
  )
}
