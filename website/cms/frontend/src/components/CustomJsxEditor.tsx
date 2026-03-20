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
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  $setSelection,
} from 'lexical'
import type { ComponentDescriptor, PropSchema } from '../api.js'
import { inputStyle, PropInput } from './PropInput.js'
import { DragHandleIcon } from './DragHandleIcon.js'
import {
  DRAG_DATA_FORMAT,
  startBlockDrag,
  endBlockDrag,
} from './BlockDragDropPlugin.js'

// Context to pass rich prop metadata from Editor to CustomJsxEditor
export const ComponentMetaContext = createContext<
  Record<string, ComponentDescriptor>
>({})

// Context to pass the current file path for image resolution
export const FilePathContext = createContext<string>('')

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
    <div style={{ padding: '4px 0' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          margin: 0,
          fontSize: 12,
          fontFamily: 'monospace',
        }}
      >
        <thead>
          <tr>
            {schema.map((s) => (
              <th
                key={s.name}
                style={{
                  textAlign: 'left',
                  padding: '2px 4px',
                  borderBottom: '1px solid #ddd',
                  color: '#888',
                  fontWeight: 500,
                }}
              >
                {s.name}
              </th>
            ))}
            <th style={{ width: 24 }} />
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {schema.map((s) => (
                <td key={s.name} style={{ padding: '2px 4px' }}>
                  <input
                    type="text"
                    value={row[s.name] ?? ''}
                    onChange={(e) =>
                      handleCellChange(rowIndex, s.name, e.target.value)
                    }
                    style={{
                      ...inputStyle,
                      width: '100%',
                      flex: undefined,
                    }}
                  />
                </td>
              ))}
              <td style={{ padding: '2px 0' }}>
                <button
                  onClick={() => handleRemoveRow(rowIndex)}
                  title="Remove row"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#bbb',
                    fontSize: 14,
                    lineHeight: 1,
                    padding: '0 2px',
                  }}
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
        style={{
          marginTop: 4,
          background: 'none',
          border: '1px dashed #ccc',
          borderRadius: 3,
          cursor: 'pointer',
          color: '#888',
          fontSize: 11,
          padding: '1px 8px',
        }}
      >
        + Add row
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// CustomJsxEditor
// ---------------------------------------------------------------------------

const actionButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: '#999',
  fontSize: 13,
  lineHeight: 1,
  padding: 2,
  borderRadius: 3,
}

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
  const filePath = useContext(FilePathContext)
  const componentMeta = mdastNode.name ? meta[mdastNode.name] : undefined

  const [hovered, setHovered] = useState(false)
  const [selected, setSelected] = useState(false)
  const blockRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    return parentEditor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection()
        if ($isNodeSelection(selection)) {
          setSelected(selection.has(lexicalNode.getKey()))
        } else {
          setSelected(false)
        }
      })
    })
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
    <div
      ref={blockRef}
      style={{ position: 'relative', margin: '4px 0' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Drag handle to the left of the block */}
      <div
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        title="Drag to reorder"
        aria-label="Drag to reorder component"
        style={{
          position: 'absolute',
          left: -15,
          top: 0,
          width: 16,
          height: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'grab',
          color: '#bbb',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.15s',
        }}
      >
        <DragHandleIcon />
      </div>

      <div
        style={{
          border: selected ? '1px solid #999' : '1px solid #e0e0e0',
          transition: 'border-color 0.15s',
          borderRadius: 4,
        }}
      >
        {/* Header: component name + actions */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            padding: '4px 8px',
            background: '#f5f5f5',
            borderBottom:
              descriptor.hasChildren || complexProps.length > 0
                ? '1px solid #e0e0e0'
                : undefined,
            borderRadius:
              descriptor.hasChildren || complexProps.length > 0
                ? '4px 4px 0 0'
                : 4,
            fontSize: 12,
            fontFamily: 'monospace',
          }}
        >
          <div
            onClick={handleSelect}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{ fontWeight: 600, color: '#555', userSelect: 'none' }}
            >
              {componentName}
            </span>
            <span style={{ display: 'flex', gap: 2 }}>
              <button
                onClick={handleDuplicate}
                title="Duplicate"
                aria-label="Duplicate component"
                tabIndex={0}
                style={actionButtonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#333'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#999'
                }}
              >
                {iconComponentFor('content_copy')}
              </button>
              <button
                onClick={handleDelete}
                title="Delete"
                aria-label="Delete component"
                tabIndex={0}
                style={actionButtonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#e53e3e'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#999'
                }}
              >
                {iconComponentFor('delete_small')}
              </button>
            </span>
          </div>

          {simpleProps.map(({ name, rich }) => {
            const value = properties[name] ?? ''
            const schema = rich ?? { name, type: 'string' as const }

            return (
              <PropInput
                key={name}
                schema={schema}
                value={value}
                filePath={filePath}
                onChange={(v) => handlePropChange(name, v)}
              />
            )
          })}
        </div>

        {/* Complex props (json table editors) */}
        {complexProps.map(({ name, rich }) => (
          <div
            key={name}
            style={{
              padding: '4px 8px',
              borderBottom: descriptor.hasChildren
                ? '1px solid #e0e0e0'
                : undefined,
            }}
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
          <div style={{ padding: '4px 8px' }}>
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
