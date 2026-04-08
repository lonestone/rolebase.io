import type { ComponentDescriptor } from '../../../api.js'

export function buildDefaultProps(
  meta: ComponentDescriptor
): Record<string, string> {
  const props: Record<string, string> = {}
  for (const p of meta.props) {
    if (p.optional) continue
    if (p.type === 'boolean') {
      props[p.name] = 'false'
    } else if (p.type === 'select' && p.options?.[0]) {
      props[p.name] = p.options[0]
    } else if (p.type === 'number') {
      props[p.name] = '0'
    } else {
      props[p.name] = ''
    }
  }
  return props
}
