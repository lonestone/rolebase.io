import { readFile } from 'fs/promises'
import { join } from 'path'
import * as ts from 'typescript'

interface FrontmatterFieldSchema {
  name: string
  type: 'string' | 'number' | 'boolean' | 'select' | 'json' | 'image' | 'date' | 'string-array'
  required?: boolean
  options?: string[]
}

/**
 * Parse content.config.ts to extract frontmatter schemas for each collection.
 * Uses the TypeScript compiler to walk the AST, similar to how
 * routes/components.ts parses Astro component Props interfaces.
 */
export async function parseContentSchemas(): Promise<
  Record<string, FrontmatterFieldSchema[]>
> {
  const configPath = join(process.cwd(), 'src/content.config.ts')
  const source = await readFile(configPath, 'utf-8')
  const sourceFile = ts.createSourceFile(
    'content.config.ts',
    source,
    ts.ScriptTarget.Latest,
    true
  )

  // Collect all top-level variable declarations: const blog = defineCollection(...)
  const collections: Record<string, FrontmatterFieldSchema[]> = {}

  // Also track the `collections` export to map keys like 'client-cases' to variable names
  const exportMapping = new Map<string, string>()

  ts.forEachChild(sourceFile, (node) => {
    // Parse: const xxx = defineCollection({ schema: ... })
    if (
      ts.isVariableStatement(node) &&
      node.declarationList.declarations.length === 1
    ) {
      const decl = node.declarationList.declarations[0]
      if (
        ts.isIdentifier(decl.name) &&
        decl.initializer &&
        ts.isCallExpression(decl.initializer) &&
        ts.isIdentifier(decl.initializer.expression) &&
        decl.initializer.expression.text === 'defineCollection'
      ) {
        const varName = decl.name.text
        const arg = decl.initializer.arguments[0]
        if (arg && ts.isObjectLiteralExpression(arg)) {
          const schema = parseCollectionSchema(arg)
          if (schema) {
            collections[varName] = schema
          }
        }
      }
    }

    // Parse: export const collections = { blog, 'client-cases': clientCases, ... }
    if (
      ts.isVariableStatement(node) &&
      node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      for (const decl of node.declarationList.declarations) {
        if (
          ts.isIdentifier(decl.name) &&
          decl.name.text === 'collections' &&
          decl.initializer &&
          ts.isObjectLiteralExpression(decl.initializer)
        ) {
          for (const prop of decl.initializer.properties) {
            if (ts.isPropertyAssignment(prop)) {
              const key = ts.isStringLiteral(prop.name)
                ? prop.name.text
                : ts.isIdentifier(prop.name)
                  ? prop.name.text
                  : undefined
              const value = ts.isIdentifier(prop.initializer)
                ? prop.initializer.text
                : undefined
              if (key && value) {
                exportMapping.set(key, value)
              }
            }
            // Shorthand: { blog } => key=blog, value=blog
            if (ts.isShorthandPropertyAssignment(prop)) {
              exportMapping.set(prop.name.text, prop.name.text)
            }
          }
        }
      }
    }
  })

  // Build final result using export mapping (handles 'client-cases': clientCases)
  const result: Record<string, FrontmatterFieldSchema[]> = {}
  for (const [exportKey, varName] of exportMapping) {
    if (collections[varName]) {
      result[exportKey] = collections[varName]
    }
  }

  return result
}

/**
 * Find the `schema` property in a defineCollection({ ... }) argument
 * and parse the z.object({ ... }) fields.
 */
function parseCollectionSchema(
  obj: ts.ObjectLiteralExpression
): FrontmatterFieldSchema[] | undefined {
  const schemaProp = obj.properties.find(
    (p) =>
      ts.isPropertyAssignment(p) &&
      ts.isIdentifier(p.name) &&
      p.name.text === 'schema'
  ) as ts.PropertyAssignment | undefined

  if (!schemaProp) return undefined

  // schema can be:
  //   z.object({ ... })                    — direct
  //   ({ image }) => z.object({ ... })     — arrow function returning z.object
  let zObjectArg: ts.ObjectLiteralExpression | undefined

  const init = schemaProp.initializer
  if (ts.isArrowFunction(init)) {
    // ({ image }) => z.object({ ... })
    const body = init.body
    zObjectArg = findZObject(body)
  } else {
    zObjectArg = findZObject(init)
  }

  if (!zObjectArg) return undefined
  return parseZObjectFields(zObjectArg)
}

/** Recursively find z.object(...) call and return its object literal argument */
function findZObject(node: ts.Node): ts.ObjectLiteralExpression | undefined {
  if (
    ts.isCallExpression(node) &&
    ts.isPropertyAccessExpression(node.expression) &&
    node.expression.name.text === 'object' &&
    node.arguments.length === 1 &&
    ts.isObjectLiteralExpression(node.arguments[0])
  ) {
    return node.arguments[0]
  }

  // Search children
  let found: ts.ObjectLiteralExpression | undefined
  ts.forEachChild(node, (child) => {
    if (!found) found = findZObject(child)
  })
  return found
}

/**
 * Parse fields from a z.object({ title: z.string(), ... }) expression.
 */
function parseZObjectFields(
  obj: ts.ObjectLiteralExpression
): FrontmatterFieldSchema[] {
  const fields: FrontmatterFieldSchema[] = []

  for (const prop of obj.properties) {
    if (!ts.isPropertyAssignment(prop)) continue
    const name = ts.isIdentifier(prop.name)
      ? prop.name.text
      : ts.isStringLiteral(prop.name)
        ? prop.name.text
        : undefined
    if (!name) continue

    const { type, required, options } = resolveZodType(prop.initializer)
    const field: FrontmatterFieldSchema = { name, type, required }
    if (options) field.options = options
    fields.push(field)
  }

  return fields
}

interface ZodTypeInfo {
  type: FrontmatterFieldSchema['type']
  required: boolean
  options?: string[]
}

/**
 * Resolve a Zod expression chain to a PropSchema type.
 * Handles: z.string(), z.number(), z.boolean(), z.coerce.date(),
 * z.array(z.string()), image(), and .optional() chains.
 */
function resolveZodType(node: ts.Node): ZodTypeInfo {
  // Unwrap .optional() — check if the outermost call is .optional()
  const { inner, optional } = unwrapOptional(node)
  const required = !optional

  // image() — standalone call (from schema: ({ image }) => ...)
  if (
    ts.isCallExpression(inner) &&
    ts.isIdentifier(inner.expression) &&
    inner.expression.text === 'image'
  ) {
    return { type: 'image', required }
  }

  // z.string()
  if (isZodCall(inner, 'string')) {
    return { type: 'string', required }
  }

  // z.number()
  if (isZodCall(inner, 'number')) {
    return { type: 'number', required }
  }

  // z.boolean()
  if (isZodCall(inner, 'boolean')) {
    return { type: 'boolean', required }
  }

  // z.coerce.date()
  if (isZodCoerceCall(inner, 'date')) {
    return { type: 'date', required }
  }

  // z.array(z.string()) → string-array
  if (isZodCall(inner, 'array')) {
    const call = inner as ts.CallExpression
    if (call.arguments.length === 1 && isZodCall(call.arguments[0], 'string')) {
      return { type: 'string-array', required }
    }
    return { type: 'json', required }
  }

  // z.enum([...])
  if (isZodCall(inner, 'enum')) {
    const call = inner as ts.CallExpression
    if (
      call.arguments.length === 1 &&
      ts.isArrayLiteralExpression(call.arguments[0])
    ) {
      const options = call.arguments[0].elements
        .filter(ts.isStringLiteral)
        .map((e) => e.text)
      return { type: 'select', required, options }
    }
  }

  return { type: 'string', required }
}

/** Check if node is z.xxx() (property access on z) */
function isZodCall(node: ts.Node, methodName: string): boolean {
  if (!ts.isCallExpression(node)) return false
  const expr = node.expression
  if (
    ts.isPropertyAccessExpression(expr) &&
    ts.isIdentifier(expr.expression) &&
    expr.expression.text === 'z' &&
    expr.name.text === methodName
  ) {
    return true
  }
  return false
}

/** Check if node is z.coerce.xxx() */
function isZodCoerceCall(node: ts.Node, methodName: string): boolean {
  if (!ts.isCallExpression(node)) return false
  const expr = node.expression
  if (
    ts.isPropertyAccessExpression(expr) &&
    expr.name.text === methodName &&
    ts.isPropertyAccessExpression(expr.expression) &&
    ts.isIdentifier(expr.expression.expression) &&
    expr.expression.expression.text === 'z' &&
    expr.expression.name.text === 'coerce'
  ) {
    return true
  }
  return false
}

/**
 * Unwrap .optional() from a Zod chain.
 * e.g. z.string().optional() → inner = z.string(), optional = true
 */
function unwrapOptional(node: ts.Node): {
  inner: ts.Node
  optional: boolean
} {
  if (
    ts.isCallExpression(node) &&
    ts.isPropertyAccessExpression(node.expression) &&
    node.expression.name.text === 'optional'
  ) {
    return { inner: node.expression.expression, optional: true }
  }
  return { inner: node, optional: false }
}
