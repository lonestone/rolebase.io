import { useQuery } from '@tanstack/react-query'
import { fetchComponents, type ComponentDescriptor } from '../../../api.js'
import type { JsxComponentDescriptor } from '@mdxeditor/editor'
import { useMemo } from 'react'
import { CustomJsxEditor } from '../components/CustomJsxEditor.js'

function buildDescriptors(
  components: ComponentDescriptor[]
): JsxComponentDescriptor[] {
  const descriptors = components.map(({ name, props, slots }) => ({
    name,
    kind: 'flow' as const,
    props: props.map((p) => ({
      name: p.name,
      type: (p.type === 'json' ? 'expression' : 'string') as
        | 'string'
        | 'number'
        | 'expression',
    })),
    hasChildren: slots.length > 0,
    Editor: CustomJsxEditor,
  }))
  // Fragment is needed by the mdxeditor parser for existing <Fragment slot="..."> in MDX.
  // It is not shown in the component insertion menus.
  descriptors.push({
    name: 'Fragment',
    kind: 'flow',
    props: [{ name: 'slot', type: 'string' }],
    hasChildren: true,
    Editor: CustomJsxEditor,
  })
  return descriptors
}

function buildComponentMeta(
  components: ComponentDescriptor[]
): Record<string, ComponentDescriptor> {
  return Object.fromEntries(components.map((c) => [c.name, c]))
}

export function useComponents() {
  const { data: components } = useQuery({
    queryKey: ['components'],
    queryFn: fetchComponents,
    staleTime: Infinity,
  })

  const jsxDescriptors = useMemo(
    () => (components ? buildDescriptors(components) : undefined),
    [components]
  )

  const componentMeta = useMemo(
    () => (components ? buildComponentMeta(components) : {}),
    [components]
  )

  return { jsxDescriptors, componentMeta }
}
