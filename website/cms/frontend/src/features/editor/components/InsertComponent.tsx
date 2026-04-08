import { useContext, useMemo } from 'react'
import {
  usePublisher,
  insertJsx$,
  ButtonOrDropdownButton,
} from '@mdxeditor/editor'
import { ComponentMetaContext } from './CustomJsxEditor.js'
import { buildDefaultProps } from '../utils/insertComponentUtils.js'
import React from 'react'

export function InsertComponent() {
  const insertJsx = usePublisher(insertJsx$)
  const componentMeta = useContext(ComponentMetaContext)

  const items = useMemo(
    () =>
      Object.values(componentMeta)
        .filter((c) => c.name !== '*' && c.name !== 'Fragment')
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((c) => ({ value: c.name, label: c.name })),
    [componentMeta]
  )

  if (items.length === 0) return null

  return (
    <ButtonOrDropdownButton
      title="Insert component"
      onChoose={(name) => {
        const meta = componentMeta[name]
        if (!meta) return
        insertJsx({
          name,
          kind: 'flow',
          props: buildDefaultProps(meta),
        })
      }}
      items={items}
    >
      Component
    </ButtonOrDropdownButton>
  )
}
