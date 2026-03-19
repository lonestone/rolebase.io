import React, { useCallback } from 'react'
import YAML from 'yaml'
import type { FrontmatterFieldSchema } from '../api.js'
import { PropInput } from './PropInput.js'

// ---------------------------------------------------------------------------
// YAML frontmatter parsing / serialization
// ---------------------------------------------------------------------------

export type FrontmatterData = Record<string, unknown>

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/

/** Extract raw YAML string from markdown content */
export function extractRawFrontmatter(content: string): string | undefined {
  const match = content.match(FRONTMATTER_RE)
  return match ? match[1] : undefined
}

/** Remove frontmatter block from markdown, returning the body */
export function extractBody(content: string): string {
  return content.replace(FRONTMATTER_RE, '').replace(/^\r?\n/, '')
}

const ESM_LINE_RE = /^(import\s|export\s)/

/** Extract import/export lines from body (MDXEditor does not preserve them) */
export function extractEsmLines(body: string): {
  esm: string
  content: string
} {
  const lines = body.split('\n')
  const esmLines: string[] = []
  const contentLines: string[] = []
  for (const line of lines) {
    if (ESM_LINE_RE.test(line)) {
      esmLines.push(line)
    } else {
      contentLines.push(line)
    }
  }
  return {
    esm: esmLines.join('\n'),
    content: contentLines.join('\n').replace(/^\n+/, ''),
  }
}

/** Re-combine ESM lines with editor body */
export function combineEsmAndContent(esm: string, content: string): string {
  if (!esm) return content
  return esm + '\n\n' + content
}

/** Parse YAML frontmatter string into data */
export function parseFrontmatterYaml(yaml: string): FrontmatterData {
  const result = YAML.parse(yaml)
  return result && typeof result === 'object' ? result : {}
}

/** Serialize frontmatter data to YAML */
export function serializeFrontmatterYaml(data: FrontmatterData): string {
  // Filter out empty values
  const filtered: FrontmatterData = {}
  for (const [key, value] of Object.entries(data)) {
    if (value === '' || value === undefined || value === null) continue
    if (Array.isArray(value) && value.length === 0) continue
    filtered[key] = value
  }
  if (Object.keys(filtered).length === 0) return ''
  return YAML.stringify(filtered, { lineWidth: 0 }).trimEnd()
}

/** Combine frontmatter data and body into full markdown content */
export function combineFrontmatterAndBody(
  data: FrontmatterData,
  body: string
): string {
  const yaml = serializeFrontmatterYaml(data)
  if (!yaml) return body
  return `---\n${yaml}\n---\n\n${body}`
}

/** Convert a frontmatter value to a display string for form inputs */
function toDisplayValue(value: unknown): string {
  if (value === undefined || value === null) return ''
  if (Array.isArray(value)) return value.map(String).join(', ')
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10)
  }
  return String(value)
}

// ---------------------------------------------------------------------------
// FrontmatterEditor component
// ---------------------------------------------------------------------------

interface Props {
  schema: FrontmatterFieldSchema[]
  frontmatter: FrontmatterData
  filePath: string
  onChange: (data: FrontmatterData) => void
}

export default function FrontmatterEditor({
  schema,
  frontmatter,
  filePath,
  onChange,
}: Props) {
  const handleFieldChange = useCallback(
    (fieldName: string, fieldType: string, value: string) => {
      const updated = { ...frontmatter }
      if (fieldType === 'string-array') {
        updated[fieldName] = value
          ? value
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
          : []
      } else {
        updated[fieldName] = value
      }
      onChange(updated)
    },
    [frontmatter, onChange]
  )

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        padding: '8px 12px',
        background: '#fafafa',
        borderBottom: '1px solid var(--border)',
        borderRadius: 'var(--radius) var(--radius) 0 0',
        fontSize: 12,
      }}
    >
      {schema.map((field) => {
        const raw = frontmatter[field.name]
        const arrayValue = Array.isArray(raw) ? raw.map(String) : []
        return (
          <PropInput
            key={field.name}
            schema={field}
            value={toDisplayValue(raw)}
            filePath={filePath}
            onChange={(v) => handleFieldChange(field.name, field.type, v)}
            arrayValue={arrayValue}
            onChangeArray={(items) => {
              onChange({ ...frontmatter, [field.name]: items })
            }}
          />
        )
      })}
    </div>
  )
}
