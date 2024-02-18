import { BaseType, Selection } from 'd3'

// eslint-disable-next-line no-undef
type TagNameMap = ElementTagNameMap

export default function selectAppend<
  TagName extends keyof TagNameMap,
  GElement extends BaseType,
  Datum,
  PElement extends BaseType,
  PDatum,
>(
  selection: Selection<GElement, Datum, PElement, PDatum>,
  tagName: TagName,
  className?: string
): Selection<TagNameMap[TagName], Datum, PElement, PDatum> {
  const groupSelection = selection.select<TagNameMap[TagName]>(
    className ? '.' + className : tagName
  )
  if (groupSelection.node()) {
    return groupSelection
  }
  const newSelection = selection.append(tagName)
  if (className) newSelection.attr('class', className)
  return newSelection
}
