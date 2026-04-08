import YAML from 'yaml'
import * as TOML from 'smol-toml'
import type { FrontmatterFieldSchema } from '../../../api.js'

export type DataFormat = 'mdx' | 'yaml' | 'json' | 'toml'

const dataFormats = new Set<DataFormat>(['yaml', 'json', 'toml'])

export function getDataFormat(filePath: string): DataFormat {
  const ext = filePath.split('.').pop()?.toLowerCase()
  switch (ext) {
    case 'yaml':
    case 'yml':
      return 'yaml'
    case 'json':
      return 'json'
    case 'toml':
      return 'toml'
    default:
      return 'mdx'
  }
}

export function isDataFormat(format: DataFormat): boolean {
  return dataFormats.has(format)
}

export function parseDataContent(
  content: string,
  format: DataFormat
): Record<string, unknown> {
  switch (format) {
    case 'yaml':
      return YAML.parse(content) ?? {}
    case 'json':
      return JSON.parse(content || '{}')
    case 'toml':
      return TOML.parse(content)
    default:
      return {}
  }
}

export function serializeDataContent(
  data: Record<string, unknown>,
  format: DataFormat
): string {
  switch (format) {
    case 'yaml':
      return YAML.stringify(data, { lineWidth: 0 }).trimEnd() + '\n'
    case 'json':
      return JSON.stringify(data, null, 2) + '\n'
    case 'toml':
      return TOML.stringify(data as Record<string, TOML.TomlPrimitive>) + '\n'
    default:
      return ''
  }
}

/** Infer field schemas from data keys when no explicit schema is available */
export function inferSchemaFromData(
  data: Record<string, unknown>
): FrontmatterFieldSchema[] {
  return Object.entries(data).map(([name, value]) => {
    if (isPlainObject(value)) {
      return {
        name,
        type: 'object' as const,
        required: false,
        children: inferSchemaFromData(value as Record<string, unknown>),
      }
    }
    return {
      name,
      type: inferFieldType(value),
      required: false,
    }
  })
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    !(value instanceof Date)
  )
}

function inferFieldType(
  value: unknown
): FrontmatterFieldSchema['type'] {
  if (typeof value === 'number') return 'number'
  if (typeof value === 'boolean') return 'boolean'
  if (value instanceof Date) return 'date'
  if (Array.isArray(value)) {
    if (value.every((v) => typeof v === 'string')) return 'string-array'
    return 'json'
  }
  if (typeof value === 'object' && value !== null) return 'json'
  return 'string'
}
