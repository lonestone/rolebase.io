import { useContext, useMemo } from 'react'
import {
  usePublisher,
  insertJsx$,
  ButtonOrDropdownButton,
} from '@mdxeditor/editor'
import { ComponentMetaContext } from './CustomJsxEditor.js'

// Inline (text) components vs block (flow)
const inlineComponents = new Set(['Button'])

export function InsertComponent() {
  const insertJsx = usePublisher(insertJsx$)
  const componentMeta = useContext(ComponentMetaContext)

  const items = useMemo(
    () =>
      Object.values(componentMeta)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((c) => ({ value: c.name, label: `<${c.name} />` })),
    [componentMeta]
  )

  if (items.length === 0) return null

  return (
    <ButtonOrDropdownButton
      title="Insert component"
      onChoose={(name) => {
        const meta = componentMeta[name]
        if (!meta) return

        const kind = inlineComponents.has(name) ? 'text' : 'flow'

        // Build default props
        const props: Record<string, string> = {}
        for (const p of meta.props) {
          if (p.type === 'boolean') {
            props[p.name] = 'true'
          } else if (p.type === 'select' && p.options?.[0]) {
            props[p.name] = p.options[0]
          } else if (p.type === 'number') {
            props[p.name] = '0'
          } else {
            props[p.name] = ''
          }
        }

        insertJsx({ name, kind, props })
      }}
      items={items}
    >
      {'</>'}
    </ButtonOrDropdownButton>
  )
}
