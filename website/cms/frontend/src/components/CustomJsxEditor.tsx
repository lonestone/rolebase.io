import React, {
  createContext,
  useContext,
  useMemo,
  useCallback,
} from 'react'
import {
  type JsxEditorProps,
  useMdastNodeUpdater,
  NestedLexicalEditor,
} from '@mdxeditor/editor'
import type { ComponentDescriptor, PropSchema } from '../api.js'
import { useMediaModal } from './MediaModal.js'

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

const inputStyle: React.CSSProperties = {
  padding: '1px 4px',
  border: '1px solid #ddd',
  borderRadius: 3,
  fontSize: 12,
  fontFamily: 'monospace',
  background: '#fff',
  flex: 1,
  minWidth: 0,
}

const labelStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  color: '#888',
  userSelect: 'none',
  fontSize: 12,
  fontFamily: 'monospace',
}

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
      .map(([k, v]) => `${k}: "${v.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`)
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
// Image prop input with preview and upload
// ---------------------------------------------------------------------------

function ImagePropInput({
  name,
  value,
  filePath,
  onChange,
}: {
  name: string
  value: string
  filePath: string
  onChange: (value: string) => void
}) {
  const { openMediaModal } = useMediaModal()

  // Resolve relative path to preview URL
  const previewSrc = useMemo(() => {
    if (!value) return undefined
    if (value.startsWith('./') || (!value.startsWith('/') && !value.startsWith('http'))) {
      const dir = filePath.replace(/\/[^/]+$/, '')
      const filename = value.replace(/^\.\//, '')
      return `/content/${dir}/${filename}`
    }
    return value
  }, [value, filePath])

  const handleSelect = useCallback(() => {
    const initialDir = filePath.replace(/\/[^/]+$/, '')
    openMediaModal({
      initialDir,
      filePath,
      onSelect: onChange,
    })
  }, [filePath, onChange, openMediaModal])

  return (
    <label style={labelStyle}>
      {name}
      <span style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1, minWidth: 0 }}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={inputStyle}
          placeholder="./image.png"
        />
        <button
          type="button"
          onClick={handleSelect}
          style={{
            background: '#eee',
            border: '1px solid #ddd',
            borderRadius: 3,
            cursor: 'pointer',
            fontSize: 11,
            padding: '1px 6px',
            whiteSpace: 'nowrap',
          }}
        >
          Select
        </button>
      </span>
      {previewSrc && (
        <img
          src={previewSrc}
          alt=""
          style={{ maxHeight: 32, maxWidth: 80, objectFit: 'contain', marginLeft: 4 }}
        />
      )}
    </label>
  )
}

// ---------------------------------------------------------------------------
// CustomJsxEditor
// ---------------------------------------------------------------------------

export function CustomJsxEditor({ mdastNode, descriptor }: JsxEditorProps) {
  const updateMdastNode = useMdastNodeUpdater()
  const meta = useContext(ComponentMetaContext)
  const filePath = useContext(FilePathContext)
  const componentMeta = mdastNode.name ? meta[mdastNode.name] : undefined

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

  const isInline = descriptor.kind === 'text'
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
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: 4,
        ...(isInline ? { display: 'inline-block' } : {}),
      }}
    >
      {/* Header: component name */}
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
        <span style={{ fontWeight: 600, color: '#555', userSelect: 'none' }}>
          {componentName}
        </span>

        {simpleProps.map(({ name, rich }) => {
          const value = properties[name] ?? ''

          // Select
          if (rich?.type === 'select' && rich.options) {
            return (
              <label key={name} style={labelStyle}>
                {name}
                <select
                  value={value}
                  onChange={(e) => handlePropChange(name, e.target.value)}
                  style={{ ...inputStyle, padding: '1px 2px' }}
                >
                  <option value=""></option>
                  {rich.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </label>
            )
          }

          // Image picker
          if (rich?.type === 'image') {
            return (
              <ImagePropInput
                key={name}
                name={name}
                value={value}
                filePath={filePath}
                onChange={(v) => handlePropChange(name, v)}
              />
            )
          }

          // Checkbox
          if (rich?.type === 'boolean') {
            return (
              <label
                key={name}
                style={{ ...labelStyle, cursor: 'pointer' }}
              >
                <input
                  type="checkbox"
                  checked={value === 'true'}
                  onChange={(e) =>
                    handlePropChange(name, e.target.checked ? 'true' : '')
                  }
                />
                {name}
              </label>
            )
          }

          // Number
          if (rich?.type === 'number') {
            return (
              <label key={name} style={labelStyle}>
                {name}
                <input
                  type="number"
                  value={value}
                  onChange={(e) => handlePropChange(name, e.target.value)}
                  style={{ ...inputStyle, maxWidth: 80 }}
                />
              </label>
            )
          }

          // JSON without schema → raw text
          if (rich?.type === 'json') {
            return (
              <label key={name} style={labelStyle}>
                {name}
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handlePropChange(name, e.target.value)}
                  style={inputStyle}
                />
              </label>
            )
          }

          // Default: text input
          return (
            <label key={name} style={labelStyle}>
              {name}
              <input
                type="text"
                value={value}
                onChange={(e) => handlePropChange(name, e.target.value)}
                style={inputStyle}
              />
            </label>
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
        <div style={{ padding: isInline ? '0 4px' : '4px 8px' }}>
          <NestedLexicalEditor
            block={!isInline}
            getContent={(node: any) => node.children}
            getUpdatedMdastNode={(node: any, children: any) => ({
              ...node,
              children,
            })}
          />
        </div>
      ) : null}
    </div>
  )
}
