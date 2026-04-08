import React, { useCallback, useContext, useMemo, useState } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  LexicalTypeaheadMenuPlugin,
  MenuOption,
  useBasicTypeaheadTriggerMatch,
} from '@lexical/react/LexicalTypeaheadMenuPlugin'
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text'
import {
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list'
import { $setBlocksType } from '@lexical/selection'
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  type TextNode,
} from 'lexical'
import { INSERT_HORIZONTAL_RULE_COMMAND } from '@lexical/react/LexicalHorizontalRuleNode'
import {
  usePublisher,
  insertJsx$,
  openNewImageDialog$,
  insertTable$,
  insertCodeBlock$,
  addComposerChild$,
  addNestedEditorChild$,
  realmPlugin,
} from '@mdxeditor/editor'
import * as ReactDOM from 'react-dom'
import { ComponentMetaContext } from './CustomJsxEditor.js'
import { buildDefaultProps } from '../utils/insertComponentUtils.js'

class SlashCommandOption extends MenuOption {
  title: string
  keywords: string[]
  onSelect: () => void
  submenu?: SlashCommandOption[]

  constructor(
    title: string,
    options: {
      keywords?: string[]
      onSelect: () => void
      submenu?: SlashCommandOption[]
    }
  ) {
    super(title)
    this.title = title
    this.keywords = options.keywords ?? []
    this.onSelect = options.onSelect.bind(this)
    this.submenu = options.submenu
  }
}

interface MenuItemProps {
  index: number
  isSelected: boolean
  onClick: () => void
  onMouseEnter: () => void
  option: SlashCommandOption
}

function MenuItem({
  index,
  isSelected,
  onClick,
  onMouseEnter,
  option,
}: MenuItemProps) {
  return (
    <li
      key={option.key}
      tabIndex={-1}
      ref={option.setRefElement}
      role="option"
      aria-selected={isSelected}
      id={'slash-item-' + index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className={`px-2.5 py-1.5 cursor-pointer text-xs flex items-center justify-between rounded ${
        isSelected ? 'bg-primary text-white' : 'text-text'
      }`}
    >
      <span>{option.title}</span>
      {option.submenu && <span className="text-2xs opacity-60">▸</span>}
    </li>
  )
}

function SlashCommandMenu() {
  const [editor] = useLexicalComposerContext()
  const [queryString, setQueryString] = useState<string | null>(null)
  const insertJsx = usePublisher(insertJsx$)
  const openNewImageDialog = usePublisher(openNewImageDialog$)
  const insertTable = usePublisher(insertTable$)
  const insertCodeBlock = usePublisher(insertCodeBlock$)
  const componentMeta = useContext(ComponentMetaContext)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch('/', {
    minLength: 0,
  })

  const componentOptions = useMemo(
    () =>
      Object.values(componentMeta)
        .filter((c) => c.name !== '*' && c.name !== 'Fragment')
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(
          (c) =>
            new SlashCommandOption(c.name, {
              keywords: ['component', c.name.toLowerCase()],
              onSelect: () => {
                insertJsx({
                  name: c.name,
                  kind: 'flow',
                  props: buildDefaultProps(c),
                })
              },
            })
        ),
    [componentMeta, insertJsx]
  )

  const baseOptions = useMemo(
    () => [
      new SlashCommandOption('Heading 2', {
        keywords: ['heading', 'header', 'h2'],
        onSelect: () =>
          editor.update(() => {
            const selection = $getSelection()
            if ($isRangeSelection(selection)) {
              $setBlocksType(selection, () => $createHeadingNode('h2'))
            }
          }),
      }),
      new SlashCommandOption('Heading 3', {
        keywords: ['heading', 'header', 'h3'],
        onSelect: () =>
          editor.update(() => {
            const selection = $getSelection()
            if ($isRangeSelection(selection)) {
              $setBlocksType(selection, () => $createHeadingNode('h3'))
            }
          }),
      }),
      new SlashCommandOption('Heading 4', {
        keywords: ['heading', 'header', 'h4'],
        onSelect: () =>
          editor.update(() => {
            const selection = $getSelection()
            if ($isRangeSelection(selection)) {
              $setBlocksType(selection, () => $createHeadingNode('h4'))
            }
          }),
      }),
      new SlashCommandOption('Bulleted List', {
        keywords: ['bulleted list', 'unordered list', 'ul'],
        onSelect: () =>
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined),
      }),
      new SlashCommandOption('Numbered List', {
        keywords: ['numbered list', 'ordered list', 'ol'],
        onSelect: () =>
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined),
      }),
      new SlashCommandOption('Check List', {
        keywords: ['check list', 'todo list', 'checkbox'],
        onSelect: () =>
          editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined),
      }),
      new SlashCommandOption('Quote', {
        keywords: ['block quote', 'blockquote'],
        onSelect: () =>
          editor.update(() => {
            const selection = $getSelection()
            if ($isRangeSelection(selection)) {
              $setBlocksType(selection, () => $createQuoteNode())
            }
          }),
      }),
      new SlashCommandOption('Table', {
        keywords: ['table', 'grid', 'rows', 'columns'],
        onSelect: () => insertTable({ rows: 3, columns: 3 }),
      }),
      new SlashCommandOption('Image', {
        keywords: ['image', 'photo', 'picture'],
        onSelect: () => openNewImageDialog(),
      }),
      new SlashCommandOption('Code Block', {
        keywords: ['code', 'codeblock', 'javascript', 'python'],
        onSelect: () => insertCodeBlock({}),
      }),
      new SlashCommandOption('Divider', {
        keywords: ['horizontal rule', 'divider', 'hr'],
        onSelect: () =>
          editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined),
      }),
      new SlashCommandOption('Paragraph', {
        keywords: ['normal', 'paragraph', 'p', 'text'],
        onSelect: () =>
          editor.update(() => {
            const selection = $getSelection()
            if ($isRangeSelection(selection)) {
              $setBlocksType(selection, () => $createParagraphNode())
            }
          }),
      }),
      ...(componentOptions.length > 0
        ? [
            new SlashCommandOption('Component', {
              keywords: ['component', 'jsx', 'insert'],
              onSelect: () => {
                // handled via submenu
              },
              submenu: componentOptions,
            }),
          ]
        : []),
    ],
    [editor, componentOptions, insertTable, openNewImageDialog, insertCodeBlock]
  )

  const options = useMemo(() => {
    if (activeSubmenu) return []
    if (!queryString) return baseOptions

    const query = queryString.toLowerCase()
    return baseOptions.filter(
      (option) =>
        option.title.toLowerCase().includes(query) ||
        option.keywords.some((kw) => kw.includes(query))
    )
  }, [baseOptions, queryString, activeSubmenu])

  // Submenu options filtered by query
  const submenuOptions = useMemo(() => {
    if (!activeSubmenu) return []
    const parent = baseOptions.find((o) => o.title === activeSubmenu)
    if (!parent?.submenu) return []
    if (!queryString) return parent.submenu

    const query = queryString.toLowerCase()
    return parent.submenu.filter(
      (option) =>
        option.title.toLowerCase().includes(query) ||
        option.keywords.some((kw) => kw.includes(query))
    )
  }, [activeSubmenu, baseOptions, queryString])

  const visibleOptions = activeSubmenu ? submenuOptions : options

  const onSelectOption = useCallback(
    (
      selectedOption: SlashCommandOption,
      nodeToRemove: TextNode | null,
      closeMenu: () => void
    ) => {
      if (selectedOption.submenu && !activeSubmenu) {
        setActiveSubmenu(selectedOption.title)
        return
      }
      editor.update(() => {
        if (nodeToRemove) {
          nodeToRemove.remove()
        }
        selectedOption.onSelect()
        closeMenu()
      })
      setActiveSubmenu(null)
    },
    [editor, activeSubmenu]
  )

  return (
    <LexicalTypeaheadMenuPlugin<SlashCommandOption>
      onQueryChange={(query) => {
        setQueryString(query)
        if (query === null) {
          setActiveSubmenu(null)
        }
      }}
      onSelectOption={onSelectOption}
      triggerFn={checkForTriggerMatch}
      options={visibleOptions}
      onClose={() => setActiveSubmenu(null)}
      menuRenderFn={(
        anchorElementRef,
        { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex }
      ) =>
        anchorElementRef.current && visibleOptions.length
          ? ReactDOM.createPortal(
              <div className="slash-command-menu">
                {activeSubmenu && (
                  <div className="px-2.5 pt-1 pb-0.5 text-2xs text-text-muted flex items-center gap-1">
                    <span
                      onClick={() => setActiveSubmenu(null)}
                      className="cursor-pointer"
                    >
                      /
                    </span>
                    <span>▸</span>
                    <span>{activeSubmenu}</span>
                  </div>
                )}
                <ul className="list-none p-1 m-0">
                  {visibleOptions.map((option, i) => (
                    <MenuItem
                      index={i}
                      isSelected={selectedIndex === i}
                      onClick={() => {
                        setHighlightedIndex(i)
                        selectOptionAndCleanUp(option)
                      }}
                      onMouseEnter={() => {
                        setHighlightedIndex(i)
                      }}
                      key={option.key}
                      option={option}
                    />
                  ))}
                </ul>
              </div>,
              anchorElementRef.current
            )
          : null
      }
    />
  )
}

export const slashCommandPlugin = realmPlugin({
  init(realm) {
    realm.pubIn({
      [addComposerChild$]: SlashCommandMenu,
      [addNestedEditorChild$]: SlashCommandMenu,
    })
  },
})
