import React from 'react'
import { NestedLexicalEditor } from '@mdxeditor/editor'

// When a component is written as <Comp>text</Comp> on one line, mdast
// parses the children as phrasing (inline) nodes without a wrapping
// paragraph, which the block NestedLexicalEditor can't render.
function needsBlockWrapping(children: any[]): boolean {
  return children.length > 0 && !children.some((c) => c.type === 'paragraph')
}

function isNamedFragment(node: any): boolean {
  return (
    node.type === 'mdxJsxFlowElement' &&
    node.name === 'Fragment' &&
    node.attributes?.some(
      (a: any) => a.name === 'slot' && typeof a.value === 'string'
    )
  )
}

// Unwrap a single paragraph if the original content was inline,
// to preserve the compact MDX format (<Comp>text</Comp>).
function maybeUnwrap(originalChildren: any[], editedChildren: any[]): any[] {
  if (
    needsBlockWrapping(originalChildren) &&
    editedChildren.length === 1 &&
    editedChildren[0].type === 'paragraph'
  ) {
    return editedChildren[0].children
  }
  return editedChildren
}

interface Props {
  slotName: string
  hasNamedSlots: boolean
}

export default function SlotEditor({ slotName, hasNamedSlots }: Props) {
  if (slotName === '') {
    return <DefaultSlotEditor hasNamedSlots={hasNamedSlots} />
  }
  return <NamedSlotEditor slotName={slotName} />
}

function DefaultSlotEditor({ hasNamedSlots }: { hasNamedSlots: boolean }) {
  return (
    <NestedLexicalEditor
      block
      getContent={(node: any) => {
        const children = hasNamedSlots
          ? node.children.filter((c: any) => !isNamedFragment(c))
          : node.children
        if (needsBlockWrapping(children)) {
          return [{ type: 'paragraph', children }]
        }
        return children
      }}
      getUpdatedMdastNode={(node: any, children: any) => {
        if (hasNamedSlots) {
          const fragments = node.children.filter(isNamedFragment)
          const prev = node.children.filter((c: any) => !isNamedFragment(c))
          return {
            ...node,
            children: [...fragments, ...maybeUnwrap(prev, children)],
          }
        }
        return {
          ...node,
          children: maybeUnwrap(node.children, children),
        }
      }}
    />
  )
}

function NamedSlotEditor({ slotName }: { slotName: string }) {
  const isMatch = (node: any) =>
    node.type === 'mdxJsxFlowElement' &&
    node.name === 'Fragment' &&
    node.attributes?.some((a: any) => a.name === 'slot' && a.value === slotName)

  return (
    <NestedLexicalEditor
      block
      getContent={(node: any) => {
        const fragment = node.children.find(isMatch)
        if (!fragment) return []
        if (needsBlockWrapping(fragment.children)) {
          return [{ type: 'paragraph', children: fragment.children }]
        }
        return fragment.children
      }}
      getUpdatedMdastNode={(node: any, children: any) => {
        const fragment = node.children.find(isMatch)
        const finalChildren = fragment
          ? maybeUnwrap(fragment.children, children)
          : children

        const newNodeChildren = [...node.children]
        const idx = newNodeChildren.findIndex(isMatch)
        const newFragment = {
          type: 'mdxJsxFlowElement',
          name: 'Fragment',
          attributes: [
            { type: 'mdxJsxAttribute', name: 'slot', value: slotName },
          ],
          children: finalChildren,
        }
        if (idx >= 0) {
          newNodeChildren[idx] = newFragment
        } else if (finalChildren.length > 0) {
          const firstNonFrag = newNodeChildren.findIndex(
            (c: any) => !isNamedFragment(c)
          )
          newNodeChildren.splice(
            firstNonFrag >= 0 ? firstNonFrag : newNodeChildren.length,
            0,
            newFragment
          )
        }
        return { ...node, children: newNodeChildren }
      }}
    />
  )
}
