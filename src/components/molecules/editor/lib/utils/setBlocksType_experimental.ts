// This should be imported from @lexical/selection
// Try again with a next version

import {
  $getRoot,
  $isElementNode,
  $isRootOrShadowRoot,
  ElementNode,
  GridSelection,
  LexicalNode,
  RangeSelection,
} from 'lexical'

/**
 * Converts all nodes in the selection that are of one block type to another specified by parameter
 *
 * @param selection
 * @param createElement
 * @returns
 */
export function $setBlocksType_experimental(
  selection: RangeSelection | GridSelection,

  createElement: () => ElementNode
): void {
  if (selection.anchor.key === 'root') {
    const element = createElement()
    const root = $getRoot()
    const firstChild = root.getFirstChild()
    if (firstChild) firstChild.replace(element, true)
    else root.append(element)
    return
  }

  const nodes = selection.getNodes()
  if (selection.anchor.type === 'text') {
    let firstBlock = selection.anchor.getNode().getParent() as LexicalNode
    firstBlock = (
      firstBlock.isInline() ? firstBlock.getParent() : firstBlock
    ) as LexicalNode
    if (nodes.indexOf(firstBlock) === -1) nodes.push(firstBlock)
  }
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (!isBlock(node)) continue
    const targetElement = createElement()
    targetElement.setFormat(node.getFormatType())
    targetElement.setIndent(node.getIndent())
    node.replace(targetElement, true)
  }
}

function isBlock(node: LexicalNode) {
  return $isElementNode(node) && !$isRootOrShadowRoot(node) && !node.isInline()
}
