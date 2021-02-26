import { BaseType, Selection } from 'd3'

export default function selectAppend<
  TagName extends keyof ElementTagNameMap,
  GElement extends BaseType,
  Datum,
  PElement extends BaseType,
  PDatum
>(
  selection: Selection<GElement, Datum, PElement, PDatum>,
  tagName: TagName,
  className: string
): Selection<ElementTagNameMap[TagName], Datum, PElement, PDatum> {
  const groupSelection = selection.select<ElementTagNameMap[TagName]>(
    '.' + className
  )
  if (groupSelection.node()) {
    return groupSelection
  }
  return selection.append(tagName).attr('class', className)
}
