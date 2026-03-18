import { Hono } from 'hono'
import { readdir, readFile } from 'fs/promises'
import { join } from 'path'

const COMPONENTS_DIR = join(process.cwd(), 'src/components')

interface PropSchema {
  name: string
  type: 'string' | 'number' | 'boolean' | 'select' | 'json'
  options?: string[]
  // For json type: schema of each item (when the prop is an array of objects)
  itemSchema?: PropSchema[]
}

interface ComponentDescriptor {
  name: string
  props: PropSchema[]
  hasChildren: boolean
}

// Parse all interfaces from Astro frontmatter
function parseInterfaces(
  frontmatter: string
): Record<string, string> {
  const interfaces: Record<string, string> = {}
  const re = /interface\s+(\w+)\s*\{([^}]*)}/g
  let match
  while ((match = re.exec(frontmatter)) !== null) {
    interfaces[match[1]] = match[2]
  }
  return interfaces
}

// Parse the fields of an interface body into PropSchema entries
function parseInterfaceFields(
  body: string,
  interfaces: Record<string, string>
): PropSchema[] {
  const props: PropSchema[] = []

  for (const line of body.split('\n')) {
    const propMatch = line.match(/^\s*(\w+)\??:\s*(.+)/)
    if (!propMatch) continue
    const [, name, rawType] = propMatch
    const type = rawType.trim().replace(/;$/, '')

    // String literal union → select
    if (/^'[^']+'(\s*\|\s*'[^']+')+$/.test(type)) {
      const options = [...type.matchAll(/'([^']+)'/g)].map((m) => m[1])
      props.push({ name, type: 'select', options })
      continue
    }

    // Boolean
    if (type === 'boolean') {
      props.push({ name, type: 'boolean' })
      continue
    }

    // Number
    if (type === 'number') {
      props.push({ name, type: 'number' })
      continue
    }

    // Array of a known interface → json with itemSchema
    const arrayMatch = type.match(/^(\w+)\[\]$/)
    if (arrayMatch) {
      const itemType = arrayMatch[1]
      const itemBody = interfaces[itemType]
      if (itemBody) {
        const itemSchema = parseInterfaceFields(itemBody, interfaces)
        props.push({ name, type: 'json', itemSchema })
      } else {
        props.push({ name, type: 'json' })
      }
      continue
    }

    // Plain string or anything else
    props.push({ name, type: 'string' })
  }

  return props
}

// Check if the template part (after the second ---) contains <slot
function hasSlot(source: string): boolean {
  const parts = source.split('---')
  // Template is everything after the second ---
  const template = parts.slice(2).join('---')
  return /<slot[\s/>]/.test(template)
}

function parseComponent(source: string): { props: PropSchema[]; hasChildren: boolean } {
  const fmMatch = source.match(/^---\n([\s\S]*?)\n---/)
  if (!fmMatch) return { props: [], hasChildren: hasSlot(source) }
  const frontmatter = fmMatch[1]

  const interfaces = parseInterfaces(frontmatter)
  const propsBody = interfaces['Props']
  if (!propsBody) return { props: [], hasChildren: hasSlot(source) }

  const props = parseInterfaceFields(propsBody, interfaces)
  return { props, hasChildren: hasSlot(source) }
}

export const componentsRoutes = new Hono()

// GET /api/components — list available MDX components with parsed props
componentsRoutes.get('/', async (c) => {
  const components: ComponentDescriptor[] = []

  async function scan(dir: string) {
    const entries = await readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isDirectory()) {
        await scan(join(dir, entry.name))
      } else if (entry.name.endsWith('.astro')) {
        const name = entry.name.replace('.astro', '')
        const source = await readFile(join(dir, entry.name), 'utf-8')
        const { props, hasChildren } = parseComponent(source)
        components.push({ name, props, hasChildren })
      }
    }
  }

  await scan(COMPONENTS_DIR)
  components.sort((a, b) => a.name.localeCompare(b.name))
  return c.json(components)
})
