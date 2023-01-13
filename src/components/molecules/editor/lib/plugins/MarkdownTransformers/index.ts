/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {
  ElementTransformer,
  TextMatchTransformer,
  Transformer,
} from '@lexical/markdown'
import { createMarkdownImport } from '@lexical/markdown'
import {
  $isTableCellNode,
  $isTableRowNode,
  TableCellHeaderStates,
  TableCellNode,
} from '@lexical/table'
import { $createTextNode, ElementNode, LexicalNode } from 'lexical'

import {
  CHECK_LIST,
  ELEMENT_TRANSFORMERS,
  TEXT_FORMAT_TRANSFORMERS,
  TEXT_MATCH_TRANSFORMERS,
} from '@lexical/markdown'
import {
  $createHorizontalRuleNode,
  $isHorizontalRuleNode,
  HorizontalRuleNode,
} from '@lexical/react/LexicalHorizontalRuleNode'
import {
  $createTableCellNode,
  $createTableNode,
  $createTableRowNode,
  $isTableNode,
  TableNode,
  TableRowNode,
} from '@lexical/table'
import {
  $createParagraphNode,
  $isElementNode,
  $isParagraphNode,
  $isTextNode,
} from 'lexical'

import {
  $createEquationNode,
  $isEquationNode,
  EquationNode,
} from '../../nodes/EquationNode'
import {
  $createImageNode,
  $isImageNode,
  ImageNode,
} from '../../nodes/ImageNode'
import {
  $createTweetNode,
  $isTweetNode,
  TweetNode,
} from '../../nodes/TweetNode'
import emojiList from '../EmojiPickerPlugin/emoji-list'

// Remove backslashes that can appear in old values of the editor
// using outline/rich-markdown-editor
export const EOL_SLASH: TextMatchTransformer = {
  dependencies: [],
  regExp: /^\\$/,
  importRegExp: /^\\$/,
  export: () => null,
  replace: (textNode) => {
    textNode.replace($createParagraphNode())
  },
  trigger: '\\',
  type: 'text-match',
}

// Emojis
export const EMOJI: TextMatchTransformer = {
  dependencies: [],
  regExp: /:([a-z0-9_]+):/,
  importRegExp: /:([a-z0-9_]+):/,
  export: () => null,
  replace: (textNode, match) => {
    const emoji = emojiList.find((emoji) =>
      emoji.aliases.includes(match[1])
    )?.emoji
    if (emoji) {
      textNode.replace($createTextNode(emoji))
    }
  },
  trigger: ':',
  type: 'text-match',
}

export const HR: ElementTransformer = {
  dependencies: [HorizontalRuleNode],
  export: (node: LexicalNode) => {
    return $isHorizontalRuleNode(node) ? '***' : null
  },
  regExp: /^(---|\*\*\*|___)\s?$/,
  replace: (parentNode, _1, _2, isImport) => {
    const line = $createHorizontalRuleNode()

    // TODO: Get rid of isImport flag
    if (isImport || parentNode.getNextSibling() != null) {
      parentNode.replace(line)
    } else {
      parentNode.insertBefore(line)
    }

    line.selectNext()
  },
  type: 'element',
}

export const IMAGE: TextMatchTransformer = {
  dependencies: [ImageNode],
  export: (node) => {
    if (!$isImageNode(node)) {
      return null
    }

    return `![${node.getAltText()}](${node.getSrc()})`
  },
  importRegExp: /!(?:\[([^[]*)\])(?:\(([^(]+)\))/,
  regExp: /!(?:\[([^[]*)\])(?:\(([^(]+)\))$/,
  replace: (textNode, match) => {
    const [, alt, src] = match
    const imageNode = $createImageNode({
      src,
      alt,
    })
    textNode.replace(imageNode)
  },
  trigger: ')',
  type: 'text-match',
}

export const EQUATION: TextMatchTransformer = {
  dependencies: [EquationNode],
  export: (node) => {
    if (!$isEquationNode(node)) {
      return null
    }

    return `$${node.getEquation()}$`
  },
  importRegExp: /\$([^$].+?)\$/,
  regExp: /\$([^$].+?)\$$/,
  replace: (textNode, match) => {
    const [, equation] = match
    const equationNode = $createEquationNode(equation, true)
    textNode.replace(equationNode)
  },
  trigger: '$',
  type: 'text-match',
}

export const TWEET: ElementTransformer = {
  dependencies: [TweetNode],
  export: (node) => {
    if (!$isTweetNode(node)) {
      return null
    }

    return `<tweet id="${node.getId()}" />`
  },
  regExp: /<tweet id="([^"]+?)"\s?\/>\s?$/,
  replace: (textNode, _1, match) => {
    const [, id] = match
    const tweetNode = $createTweetNode(id)
    textNode.replace(tweetNode)
  },
  type: 'element',
}

// Very primitive table setup
const TABLE_ROW_REG_EXP = /^(?:\|)(.+)(?:\|)\s?$/
const TABLE_ROW_DIVIDER_REG_EXP = /^(?:\|)[-|]+(?:\|)\s?$/

export const TABLE: ElementTransformer = {
  // TODO: refactor transformer for new TableNode
  dependencies: [TableNode, TableRowNode, TableCellNode],
  export: (
    node: LexicalNode,
    exportChildren: (elementNode: ElementNode) => string
  ) => {
    if (!$isTableNode(node)) {
      return null
    }

    const output = []

    for (const row of node.getChildren()) {
      const rowOutput = []

      if ($isTableRowNode(row)) {
        for (const cell of row.getChildren()) {
          // It's TableCellNode (hence ElementNode) so it's just to make flow happy
          if ($isElementNode(cell)) {
            rowOutput.push(exportChildren(cell))
          }
        }
      }

      output.push(`| ${rowOutput.join(' | ')} |`)
    }

    return output.join('\n')
  },
  regExp: TABLE_ROW_REG_EXP,
  replace: (parentNode, _, match) => {
    // Header row
    if (match[0].match(TABLE_ROW_DIVIDER_REG_EXP)) {
      const table = parentNode.getPreviousSibling()
      if (!table || !$isTableNode(table)) return

      const rows = table.getChildren()
      const lastRow = rows[rows.length - 1]
      if (!lastRow || !$isTableRowNode(lastRow)) return

      // Add header state to row cells
      lastRow.getChildren().forEach((cell) => {
        if (!$isTableCellNode(cell)) return
        cell.toggleHeaderStyle(TableCellHeaderStates.ROW)
      })

      // Remove line
      parentNode.remove()
      return
    }

    const matchCells = mapToTableCells(match[0])

    if (matchCells == null) {
      return
    }

    const rows = [matchCells]
    let sibling = parentNode.getPreviousSibling()
    let maxCells = matchCells.length

    while (sibling) {
      if (!$isParagraphNode(sibling)) {
        break
      }

      if (sibling.getChildrenSize() !== 1) {
        break
      }

      const firstChild = sibling.getFirstChild()

      if (!$isTextNode(firstChild)) {
        break
      }

      const cells = mapToTableCells(firstChild.getTextContent())

      if (cells == null) {
        break
      }

      maxCells = Math.max(maxCells, cells.length)
      rows.unshift(cells)
      const previousSibling = sibling.getPreviousSibling()
      sibling.remove()
      sibling = previousSibling
    }

    const table = $createTableNode()

    for (const cells of rows) {
      const tableRow = $createTableRowNode()
      table.append(tableRow)

      for (let i = 0; i < maxCells; i++) {
        tableRow.append(i < cells.length ? cells[i] : createTableCell(''))
      }
    }

    const previousSibling = parentNode.getPreviousSibling()
    if (
      $isTableNode(previousSibling) &&
      getTableColumnsSize(previousSibling) === maxCells
    ) {
      previousSibling.append(...table.getChildren())
      parentNode.remove()
    } else {
      parentNode.replace(table)
    }

    table.selectEnd()
  },
  type: 'element',
}

function getTableColumnsSize(table: TableNode) {
  const row = table.getFirstChild()
  return $isTableRowNode(row) ? row.getChildrenSize() : 0
}

const createTableCell = (textContent: string): TableCellNode => {
  textContent = textContent.replace(/\\n/g, '\n')
  const cell = $createTableCellNode(TableCellHeaderStates.NO_STATUS)
  createMarkdownImport(markdownTransformers)(textContent, cell)
  return cell
}

const mapToTableCells = (textContent: string): Array<TableCellNode> | null => {
  const match = textContent.match(TABLE_ROW_REG_EXP)
  if (!match || !match[1]) return null
  return match[1].split('|').map((text) => createTableCell(text))
}

export const markdownTransformers: Array<Transformer> = [
  TABLE,
  EOL_SLASH,
  EMOJI,
  HR,
  IMAGE,
  EQUATION,
  TWEET,
  CHECK_LIST,
  ...ELEMENT_TRANSFORMERS,
  ...TEXT_FORMAT_TRANSFORMERS,
  ...TEXT_MATCH_TRANSFORMERS,
]