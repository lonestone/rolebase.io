import { Hono } from 'hono'
import { readdir, readFile } from 'fs/promises'
import { join } from 'path'
import * as ts from 'typescript'

const COMPONENTS_DIR = join(process.cwd(), 'src/components')

interface PropSchema {
  name: string
  type: 'string' | 'number' | 'boolean' | 'select' | 'json' | 'image'
  optional?: boolean
  options?: string[]
  itemSchema?: PropSchema[]
}

interface ComponentDescriptor {
  name: string
  props: PropSchema[]
  hasChildren: boolean
}

// Parse interface Props from Astro frontmatter using the TypeScript compiler
function parseProps(frontmatter: string): PropSchema[] {
  const sourceFile = ts.createSourceFile(
    'props.ts',
    frontmatter,
    ts.ScriptTarget.Latest,
    true
  )

  // Collect all interfaces
  const interfaces = new Map<string, ts.InterfaceDeclaration>()
  ts.forEachChild(sourceFile, (node) => {
    if (ts.isInterfaceDeclaration(node)) {
      interfaces.set(node.name.text, node)
    }
  })

  const propsInterface = interfaces.get('Props')
  if (!propsInterface) return []
  return parseMembers(propsInterface, interfaces)
}

function parseMembers(
  node: ts.InterfaceDeclaration,
  interfaces: Map<string, ts.InterfaceDeclaration>
): PropSchema[] {
  return node.members.filter(ts.isPropertySignature).map((member) => {
    const name = (member.name as ts.Identifier).text
    const optional = !!member.questionToken
    if (!member.type) return { name, type: 'string' as const, optional }
    return { name, optional, ...resolveType(member.type, interfaces) }
  })
}

function resolveType(
  typeNode: ts.TypeNode,
  interfaces: Map<string, ts.InterfaceDeclaration>
): Omit<PropSchema, 'name'> {
  // String literal union: 'a' | 'b' | 'c'
  if (ts.isUnionTypeNode(typeNode)) {
    const allStringLiterals = typeNode.types.every(
      (t) => ts.isLiteralTypeNode(t) && ts.isStringLiteral(t.literal)
    )
    if (allStringLiterals) {
      const options = typeNode.types.map(
        (t) => ((t as ts.LiteralTypeNode).literal as ts.StringLiteral).text
      )
      return { type: 'select', options }
    }
  }

  // ImagePath type alias
  if (
    ts.isTypeReferenceNode(typeNode) &&
    ts.isIdentifier(typeNode.typeName) &&
    typeNode.typeName.text === 'ImagePath'
  ) {
    return { type: 'image' }
  }

  // Primitives
  if (typeNode.kind === ts.SyntaxKind.StringKeyword) return { type: 'string' }
  if (typeNode.kind === ts.SyntaxKind.NumberKeyword) return { type: 'number' }
  if (typeNode.kind === ts.SyntaxKind.BooleanKeyword) return { type: 'boolean' }

  // Array types: Field[] or Array<Field>
  let elementType: ts.TypeNode | undefined
  if (ts.isArrayTypeNode(typeNode)) {
    elementType = typeNode.elementType
  } else if (
    ts.isTypeReferenceNode(typeNode) &&
    ts.isIdentifier(typeNode.typeName) &&
    typeNode.typeName.text === 'Array' &&
    typeNode.typeArguments?.length === 1
  ) {
    elementType = typeNode.typeArguments[0]
  }

  if (elementType) {
    if (
      ts.isTypeReferenceNode(elementType) &&
      ts.isIdentifier(elementType.typeName)
    ) {
      const refInterface = interfaces.get(elementType.typeName.text)
      if (refInterface) {
        return {
          type: 'json',
          itemSchema: parseMembers(refInterface, interfaces),
        }
      }
    }
    return { type: 'json' }
  }

  // Fallback
  return { type: 'string' }
}

// Check if the template part (after the second ---) contains <slot
function hasSlot(source: string): boolean {
  const parts = source.split('---')
  const template = parts.slice(2).join('---')
  return /<slot[\s/>]/.test(template)
}

function parseComponent(source: string): {
  props: PropSchema[]
  hasChildren: boolean
} {
  const fmMatch = source.match(/^---\n([\s\S]*?)\n---/)
  if (!fmMatch) return { props: [], hasChildren: hasSlot(source) }
  const props = parseProps(fmMatch[1])
  return { props, hasChildren: hasSlot(source) }
}

export const componentsRoutes = new Hono()

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

  // Fragment is used by Astro for named slots (<Fragment slot="...">)
  components.push({
    name: 'Fragment',
    props: [{ name: 'slot', type: 'string' }],
    hasChildren: true,
  })

  // Wildcard descriptor: catch-all for HTML tags (img, section, div, etc.)
  // and any other unknown components used in MDX content
  components.push({
    name: '*',
    props: [],
    hasChildren: true,
  })

  components.sort((a, b) => a.name.localeCompare(b.name))
  return c.json(components)
})
