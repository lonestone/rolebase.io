import React, { useMemo, useCallback, useState, useEffect } from 'react'
import type { PropSchema } from '../../../api.js'
import { useMediaModal } from './MediaModal.js'
import { resolvePreviewSrc } from '../utils/resolvePreviewSrc.js'
import { useFilePath } from '../contexts/FilePathContext.js'
import Button from '../../common/components/Button.js'

export const inputClassName =
  'px-1.5 py-1 border border-gray-300 rounded-sm text-xs font-mono bg-white text-gray-900 flex-1 min-w-0'

export const labelClassName =
  'flex items-start gap-1 text-gray-400 select-none text-xs'

const labelTextClassName = 'min-w-25 shrink-0 pt-0.5'

/**
 * Input that keeps local state and only calls onChange on blur or Enter.
 * Prevents every keystroke from triggering a parent state change.
 */
function DeferredInput({
  value,
  onChange,
  className,
  ...rest
}: {
  value: string
  onChange: (value: string) => void
  className?: string
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value' | 'className'
>) {
  const [local, setLocal] = useState(value)
  useEffect(() => {
    setLocal(value)
  }, [value])

  const commit = useCallback(() => {
    if (local !== value) onChange(local)
  }, [local, value, onChange])

  return (
    <input
      {...rest}
      className={className}
      value={local}
      onChange={(e) => setLocal(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        // Stop propagation so Lexical doesn't intercept undo/redo etc.
        e.stopPropagation()
        if (e.key === 'Enter') {
          e.preventDefault()
          commit()
        }
      }}
    />
  )
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
  onChange,
}: {
  name: string
  value: string
  onChange: (value: string) => void
}) {
  const filePath = useFilePath()!
  const { openMediaModal } = useMediaModal()

  const previewSrc = useMemo(
    () => resolvePreviewSrc(value, filePath),
    [value, filePath]
  )

  const handleSelect = useCallback(() => {
    const initialDir = filePath.replace(/\/[^/]+$/, '')
    openMediaModal({
      initialDir,
      filePath,
      onSelect: onChange,
    })
  }, [filePath, onChange, openMediaModal])

  return (
    <label className={labelClassName}>
      <span className={labelTextClassName}>{formatLabel(name)}</span>
      <span className="flex items-center gap-1 flex-1 min-w-0">
        <DeferredInput
          type="text"
          value={value}
          onChange={onChange}
          className={inputClassName}
          placeholder="./image.png"
        />
        <Button onClick={handleSelect}>Select</Button>
      </span>
      {previewSrc && (
        <img
          src={previewSrc}
          alt=""
          className="max-h-8 max-w-20 object-contain ml-1"
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
    <div className={labelClassName}>
      <span className={labelTextClassName}>{formatLabel(name)}</span>
      <div className="flex-1 flex flex-col gap-0.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-1">
            <DeferredInput
              type="text"
              value={item}
              onChange={(v) => {
                const next = [...items]
                next[i] = v
                onChangeItems(next)
              }}
              className={inputClassName}
            />
            <button
              type="button"
              onClick={() => onChangeItems(items.filter((_, j) => j !== i))}
              className="bg-transparent border-none cursor-pointer text-gray-300 text-sm leading-none px-0.5 hover:text-gray-500"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChangeItems([...items, ''])}
          className="self-start bg-transparent border border-dashed border-gray-300 rounded-sm cursor-pointer text-gray-400 text-2xs px-2 py-px hover:border-gray-400 hover:text-gray-600"
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
  onChange: (value: string) => void
  /** For string-array type: the raw array value */
  arrayValue?: string[]
  /** For string-array type: callback with the updated array */
  onChangeArray?: (items: string[]) => void
}

export function PropInput({
  schema,
  value,
  onChange,
  arrayValue,
  onChangeArray,
}: PropInputProps) {
  const { name, type } = schema

  // Select
  if (type === 'select' && schema.options) {
    return (
      <label className={labelClassName}>
        <span className={labelTextClassName}>{formatLabel(name)}</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClassName} py-0.5 px-1`}
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
    return <ImagePropInput name={name} value={value} onChange={onChange} />
  }

  // Boolean checkbox
  if (type === 'boolean') {
    return (
      <label className={`${labelClassName} cursor-pointer`}>
        <span className={labelTextClassName}>{formatLabel(name)}</span>
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
      <label className={labelClassName}>
        <span className={labelTextClassName}>{formatLabel(name)}</span>
        <DeferredInput
          type="number"
          value={value}
          onChange={onChange}
          className={`${inputClassName} max-w-20`}
        />
      </label>
    )
  }

  // Date
  if (type === 'date') {
    return (
      <label className={labelClassName}>
        <span className={labelTextClassName}>{formatLabel(name)}</span>
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClassName} max-w-40`}
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
    <label className={labelClassName}>
      <span className={labelTextClassName}>{formatLabel(name)}</span>
      <DeferredInput
        type="text"
        value={value}
        onChange={onChange}
        className={inputClassName}
      />
    </label>
  )
}
