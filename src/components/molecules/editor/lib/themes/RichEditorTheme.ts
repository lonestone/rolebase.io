/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { EditorThemeClasses } from 'lexical'

import './RichEditorTheme.css'

const theme: EditorThemeClasses = {
  blockCursor: 'RichEditor__blockCursor',
  characterLimit: 'RichEditor__characterLimit',
  code: 'RichEditor__code',
  codeHighlight: {
    atrule: 'RichEditor__tokenAttr',
    attr: 'RichEditor__tokenAttr',
    boolean: 'RichEditor__tokenProperty',
    builtin: 'RichEditor__tokenSelector',
    cdata: 'RichEditor__tokenComment',
    char: 'RichEditor__tokenSelector',
    class: 'RichEditor__tokenFunction',
    'class-name': 'RichEditor__tokenFunction',
    comment: 'RichEditor__tokenComment',
    constant: 'RichEditor__tokenProperty',
    deleted: 'RichEditor__tokenProperty',
    doctype: 'RichEditor__tokenComment',
    entity: 'RichEditor__tokenOperator',
    function: 'RichEditor__tokenFunction',
    important: 'RichEditor__tokenVariable',
    inserted: 'RichEditor__tokenSelector',
    keyword: 'RichEditor__tokenAttr',
    namespace: 'RichEditor__tokenVariable',
    number: 'RichEditor__tokenProperty',
    operator: 'RichEditor__tokenOperator',
    prolog: 'RichEditor__tokenComment',
    property: 'RichEditor__tokenProperty',
    punctuation: 'RichEditor__tokenPunctuation',
    regex: 'RichEditor__tokenVariable',
    selector: 'RichEditor__tokenSelector',
    string: 'RichEditor__tokenSelector',
    symbol: 'RichEditor__tokenProperty',
    tag: 'RichEditor__tokenProperty',
    url: 'RichEditor__tokenOperator',
    variable: 'RichEditor__tokenVariable',
  },
  embedBlock: {
    base: 'RichEditor__embedBlock',
    focus: 'RichEditor__embedBlockFocus',
  },
  hashtag: 'RichEditor__hashtag',
  heading: {
    h1: 'RichEditor__h1',
    h2: 'RichEditor__h2',
    h3: 'RichEditor__h3',
    h4: 'RichEditor__h4',
    h5: 'RichEditor__h5',
    h6: 'RichEditor__h6',
  },
  image: 'editor-image',
  link: 'RichEditor__link',
  list: {
    listitem: 'RichEditor__listItem',
    listitemChecked: 'RichEditor__listItemChecked',
    listitemUnchecked: 'RichEditor__listItemUnchecked',
    nested: {
      listitem: 'RichEditor__nestedListItem',
    },
    olDepth: [
      'RichEditor__ol1',
      'RichEditor__ol2',
      'RichEditor__ol3',
      'RichEditor__ol4',
      'RichEditor__ol5',
    ],
    ul: 'RichEditor__ul',
  },
  ltr: 'RichEditor__ltr',
  mark: 'RichEditor__mark',
  markOverlap: 'RichEditor__markOverlap',
  paragraph: 'RichEditor__paragraph',
  quote: 'RichEditor__quote',
  rtl: 'RichEditor__rtl',
  table: 'RichEditor__table',
  tableAddColumns: 'RichEditor__tableAddColumns',
  tableAddRows: 'RichEditor__tableAddRows',
  tableCell: 'RichEditor__tableCell',
  tableCellActionButton: 'RichEditor__tableCellActionButton',
  tableCellActionButtonContainer: 'RichEditor__tableCellActionButtonContainer',
  tableCellEditing: 'RichEditor__tableCellEditing',
  tableCellHeader: 'RichEditor__tableCellHeader',
  tableCellPrimarySelected: 'RichEditor__tableCellPrimarySelected',
  tableCellResizer: 'RichEditor__tableCellResizer',
  tableCellSelected: 'RichEditor__tableCellSelected',
  tableCellSortedIndicator: 'RichEditor__tableCellSortedIndicator',
  tableResizeRuler: 'RichEditor__tableCellResizeRuler',
  tableSelected: 'RichEditor__tableSelected',
  text: {
    bold: 'RichEditor__textBold',
    code: 'RichEditor__textCode',
    italic: 'RichEditor__textItalic',
    strikethrough: 'RichEditor__textStrikethrough',
    subscript: 'RichEditor__textSubscript',
    superscript: 'RichEditor__textSuperscript',
    underline: 'RichEditor__textUnderline',
    underlineStrikethrough: 'RichEditor__textUnderlineStrikethrough',
  },
}

export default theme
