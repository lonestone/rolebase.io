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
  NestedLexicalEditor,
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
import type { ComponentDescriptor, PropSchema } from '../api.js'
import { inputClassName, PropInput } from './PropInput.js'
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

// ---------------------------------------------------------------------------
// JSON Table Editor for array-of-objects props (e.g. EntityFields.fields)
// ---------------------------------------------------------------------------

interface JsonTableEditorProps {
  value: string
  schema: PropSchema[]
  onChange: (value: string) => void
}

// Parse JS expression (unquoted keys) or JSON into an array
function parseJsArray(value: string): Record<string, string>[] {
  try {
    // Try JSON first
    const parsed = JSON.parse(value)
    if (Array.isArray(parsed)) return parsed
  } catch {
    // Fall back to eval for JS object syntax (unquoted keys)
    try {
      const parsed = new Function(`return ${value}`)()
      if (Array.isArray(parsed)) return parsed
    } catch {
      // ignore
    }
  }
  return []
}

// Serialize rows back as JS expression (unquoted keys, double-quoted values)
function serializeJsArray(rows: Record<string, string>[]): string {
  if (rows.length === 0) return '[]'
  const items = rows.map((row) => {
    const fields = Object.entries(row)
      .filter(([, v]) => v !== '')
      .map(
        ([k, v]) => `${k}: "${v.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
      )
      .join(', ')
    return `  { ${fields} }`
  })
  return `[\n${items.join(',\n')}\n]`
}

function JsonTableEditor({ value, schema, onChange }: JsonTableEditorProps) {
  const rows: Record<string, string>[] = useMemo(
    () => parseJsArray(value),
    [value]
  )

  const commit = useCallback(
    (newRows: Record<string, string>[]) => {
      onChange(serializeJsArray(newRows))
    },
    [onChange]
  )

  const handleCellChange = useCallback(
    (rowIndex: number, field: string, cellValue: string) => {
      const newRows = rows.map((row, i) =>
        i === rowIndex ? { ...row, [field]: cellValue } : row
      )
      commit(newRows)
    },
    [rows, commit]
  )

  const handleAddRow = useCallback(() => {
    const empty = Object.fromEntries(schema.map((s) => [s.name, '']))
    commit([...rows, empty])
  }, [rows, schema, commit])

  const handleRemoveRow = useCallback(
    (index: number) => {
      commit(rows.filter((_, i) => i !== index))
    },
    [rows, commit]
  )

  return (
    <div className="py-1">
      <table className="w-full border-collapse m-0 text-xs font-mono">
        <thead>
          <tr>
            {schema.map((s) => (
              <th
                key={s.name}
                className="text-left px-1 py-0.5 border-b border-gray-300 text-gray-400 font-medium"
              >
                {s.name}
              </th>
            ))}
            <th className="w-6" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {schema.map((s) => (
                <td key={s.name} className="px-1 py-0.5">
                  <input
                    type="text"
                    value={row[s.name] ?? ''}
                    onChange={(e) =>
                      handleCellChange(rowIndex, s.name, e.target.value)
                    }
                    className={`${inputClassName} w-full`}
                    style={{ flex: undefined }}
                  />
                </td>
              ))}
              <td className="py-0.5">
                <button
                  onClick={() => handleRemoveRow(rowIndex)}
                  title="Remove row"
                  className="bg-transparent border-none cursor-pointer text-gray-300 text-sm leading-none px-0.5 hover:text-gray-500"
                >
                  ×
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleAddRow}
        className="mt-1 bg-transparent border border-dashed border-gray-300 rounded-sm cursor-pointer text-gray-400 text-2xs px-2 py-px hover:border-gray-400 hover:text-gray-600"
      >
        + Add row
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// CustomJsxEditor
// ---------------------------------------------------------------------------

// Check if children need wrapping in a paragraph for the block editor.
// When a component is written as <Comp>text</Comp> on one line, mdast
// parses the children as phrasing (inline) nodes without a wrapping
// paragraph, which the block NestedLexicalEditor can't render.
function needsBlockWrapping(children: any[]): boolean {
  return children.length > 0 && !children.some((c) => c.type === 'paragraph')
}

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
      // Use the whole component block as the drag ghost
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
          // Boolean attribute without value (e.g. `fullWidth`) means true
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
          // Boolean attributes: serialize as valueless attribute (e.g. `fullWidth`)
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
  const hasProps = descriptor.props.length > 0

  // Separate simple props (rendered in header) from complex ones (rendered below)
  const simpleProps: { name: string; rich?: PropSchema }[] = []
  const complexProps: { name: string; rich: PropSchema }[] = []

  if (hasProps) {
    for (const { name } of descriptor.props) {
      const rich = componentMeta?.props.find((p) => p.name === name)
      if (rich?.type === 'json' && rich.itemSchema) {
        complexProps.push({ name, rich })
      } else {
        simpleProps.push({ name, rich })
      }
    }
  }

  return (
    <div ref={blockRef} className="relative my-1">
      <div
        className={`border rounded transition-colors duration-150 ${
          selected ? 'border-gray-400' : 'border-gray-200'
        }`}
      >
        {/* Header: component name + actions, serves as drag handle */}
        <div
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onClick={handleSelect}
          className={`flex items-center justify-between px-2 py-1 bg-gray-100 text-xs font-mono cursor-grab ${
            simpleProps.length > 0 ||
            descriptor.hasChildren ||
            complexProps.length > 0
              ? 'border-b border-gray-200 rounded-t'
              : 'rounded'
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
        {simpleProps.length > 0 && (
          <div
            className={`flex flex-col gap-0.5 px-2 py-1 text-xs font-mono ${
              descriptor.hasChildren || complexProps.length > 0
                ? 'border-b border-gray-200'
                : ''
            }`}
          >
            {simpleProps.map(({ name, rich }) => {
              const value = properties[name] ?? ''
              const schema = rich ?? { name, type: 'string' as const }

              return (
                <PropInput
                  key={name}
                  schema={schema}
                  value={value}
                  onChange={(v) => handlePropChange(name, v)}
                />
              )
            })}
          </div>
        )}

        {/* Complex props (json table editors) */}
        {complexProps.map(({ name, rich }) => (
          <div
            key={name}
            className={`px-2 py-1 ${
              descriptor.hasChildren ? 'border-b border-gray-200' : ''
            }`}
          >
            <JsonTableEditor
              value={properties[name] ?? '[]'}
              schema={rich.itemSchema!}
              onChange={(v) => handlePropChange(name, v)}
            />
          </div>
        ))}

        {/* Children */}
        {descriptor.hasChildren ? (
          <div className="px-2 py-1">
            <NestedLexicalEditor
              block
              getContent={(node: any) => {
                // If all children are inline (phrasing) content, wrap in a
                // paragraph so the block-level NestedLexicalEditor can render them
                if (needsBlockWrapping(node.children)) {
                  return [{ type: 'paragraph', children: node.children }]
                }
                return node.children
              }}
              getUpdatedMdastNode={(node: any, children: any) => {
                // Unwrap: if the original node had inline children and we get
                // back a single paragraph, unwrap it to preserve the original
                // compact MDX format (<Comp>text</Comp>)
                if (
                  needsBlockWrapping(node.children) &&
                  children.length === 1 &&
                  children[0].type === 'paragraph'
                ) {
                  return { ...node, children: children[0].children }
                }
                return { ...node, children }
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}
