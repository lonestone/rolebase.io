import React, { useMemo, useCallback } from 'react'
import type { PropSchema } from '../api.js'
import { useMediaModal } from './MediaModal.js'

export const inputStyle: React.CSSProperties = {
  padding: '5px 6px',
  border: '1px solid #ddd',
  borderRadius: 3,
  fontSize: 12,
  fontFamily: 'monospace',
  background: '#fff',
  flex: 1,
  minWidth: 0,
}

export const labelStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'start',
  gap: 4,
  color: '#888',
  userSelect: 'none',
  fontSize: 12,
}

const labelTextStyle: React.CSSProperties = {
  minWidth: 80,
  flexShrink: 0,
  paddingTop: 3,
}

/** Convert camelCase to "Title Case" label */
export function formatLabel(name: string): string {
  const spaced = name.replace(/([a-z])([A-Z])/g, '$1 $2')
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

// ---------------------------------------------------------------------------
// Image prop input with preview and media picker
// ---------------------------------------------------------------------------

export function ImagePropInput({
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

  const previewSrc = useMemo(() => {
    if (!value) return undefined
    if (
      value.startsWith('./') ||
      (!value.startsWith('/') && !value.startsWith('http'))
    ) {
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
      <span style={labelTextStyle}>{formatLabel(name)}</span>
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          flex: 1,
          minWidth: 0,
        }}
      >
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
            padding: '3px 6px',
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
          style={{
            maxHeight: 32,
            maxWidth: 80,
            objectFit: 'contain',
            marginLeft: 4,
          }}
        />
      )}
    </label>
  )
}

// ---------------------------------------------------------------------------
// String array editor (variable-length list)
// ---------------------------------------------------------------------------

function StringArrayInput({
  name,
  items,
  onChangeItems,
}: {
  name: string
  items: string[]
  onChangeItems: (items: string[]) => void
}) {

  return (
    <div style={labelStyle}>
      <span style={labelTextStyle}>{formatLabel(name)}</span>
      <div
        style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{ display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <input
              type="text"
              value={item}
              onChange={(e) => {
                const next = [...items]
                next[i] = e.target.value
                onChangeItems(next)
              }}
              style={inputStyle}
            />
            <button
              type="button"
              onClick={() => onChangeItems(items.filter((_, j) => j !== i))}
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
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChangeItems([...items, ''])}
          style={{
            alignSelf: 'start',
            background: 'none',
            border: '1px dashed #ccc',
            borderRadius: 3,
            cursor: 'pointer',
            color: '#888',
            fontSize: 11,
            padding: '1px 8px',
          }}
        >
          + Add
        </button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Generic PropInput that renders the right input based on schema type
// ---------------------------------------------------------------------------

interface PropInputProps {
  schema: PropSchema
  value: string
  filePath: string
  onChange: (value: string) => void
  /** For string-array type: the raw array value */
  arrayValue?: string[]
  /** For string-array type: callback with the updated array */
  onChangeArray?: (items: string[]) => void
}

export function PropInput({
  schema,
  value,
  filePath,
  onChange,
  arrayValue,
  onChangeArray,
}: PropInputProps) {
  const { name, type } = schema

  // Select
  if (type === 'select' && schema.options) {
    return (
      <label style={labelStyle}>
        <span style={labelTextStyle}>{formatLabel(name)}</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ ...inputStyle, padding: '3px 4px' }}
        >
          <option value=""></option>
          {schema.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
    )
  }

  // Image picker
  if (type === 'image') {
    return (
      <ImagePropInput
        name={name}
        value={value}
        filePath={filePath}
        onChange={onChange}
      />
    )
  }

  // Boolean checkbox
  if (type === 'boolean') {
    return (
      <label style={{ ...labelStyle, cursor: 'pointer' }}>
        <span style={labelTextStyle}>{formatLabel(name)}</span>
        <input
          type="checkbox"
          checked={value === 'true'}
          onChange={(e) => onChange(e.target.checked ? 'true' : '')}
        />
      </label>
    )
  }

  // Number
  if (type === 'number') {
    return (
      <label style={labelStyle}>
        <span style={labelTextStyle}>{formatLabel(name)}</span>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ ...inputStyle, maxWidth: 80 }}
        />
      </label>
    )
  }

  // Date
  if (type === 'date') {
    return (
      <label style={labelStyle}>
        <span style={labelTextStyle}>{formatLabel(name)}</span>
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ ...inputStyle, maxWidth: 160 }}
        />
      </label>
    )
  }

  // String array (variable-length list)
  if (type === 'string-array' && onChangeArray) {
    return (
      <StringArrayInput
        name={name}
        items={arrayValue ?? []}
        onChangeItems={onChangeArray}
      />
    )
  }

  // Default: text input (string, json without schema)
  return (
    <label style={labelStyle}>
      <span style={labelTextStyle}>{formatLabel(name)}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={inputStyle}
      />
    </label>
  )
}
