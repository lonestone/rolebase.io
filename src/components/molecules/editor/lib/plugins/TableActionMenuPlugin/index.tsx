/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Portal,
} from '@chakra-ui/react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import useLexicalEditable from '@lexical/react/useLexicalEditable'
import {
  $deleteTableColumn__EXPERIMENTAL,
  $deleteTableRow__EXPERIMENTAL,
  $getTableCellNodeFromLexicalNode,
  $getTableColumnIndexFromTableCellNode,
  $getTableNodeFromLexicalNodeOrThrow,
  $getTableRowIndexFromTableCellNode,
  $insertTableColumn__EXPERIMENTAL,
  $insertTableRow__EXPERIMENTAL,
  $isTableCellNode,
  $isTableRowNode,
  getTableSelectionFromTableElement,
  HTMLTableElementWithWithTableSelectionState,
  TableCellHeaderStates,
  TableCellNode,
} from '@lexical/table'
import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  DEPRECATED_$getNodeTriplet,
  DEPRECATED_$isGridCellNode,
  DEPRECATED_$isGridSelection,
  GridSelection,
} from 'lexical'
import * as React from 'react'
import { ReactPortal, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FiChevronDown } from 'react-icons/fi'

function computeSelectionCount(selection: GridSelection): {
  columns: number
  rows: number
} {
  const selectionShape = selection.getShape()
  return {
    columns: selectionShape.toX - selectionShape.fromX + 1,
    rows: selectionShape.toY - selectionShape.fromY + 1,
  }
}

// This is important when merging cells as there is no good way to re-merge weird shapes (a result
// of selecting merged cells and non-merged)
function isGridSelectionRectangular(selection: GridSelection): boolean {
  const nodes = selection.getNodes()
  const currentRows: Array<number> = []
  let currentRow = null
  let expectedColumns = null
  let currentColumns = 0
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if ($isTableCellNode(node)) {
      const row = node.getParentOrThrow()
      if (!$isTableRowNode(row)) {
        throw new Error('Expected CellNode to have a RowNode parent')
      }
      if (currentRow !== row) {
        if (expectedColumns !== null && currentColumns !== expectedColumns) {
          return false
        }
        if (currentRow !== null) {
          expectedColumns = currentColumns
        }
        currentRow = row
        currentColumns = 0
      }
      const colSpan = node.__colSpan
      for (let j = 0; j < colSpan; j++) {
        if (currentRows[currentColumns + j] === undefined) {
          currentRows[currentColumns + j] = 0
        }
        currentRows[currentColumns + j] += node.__rowSpan
      }
      currentColumns += colSpan
    }
  }
  return (
    (expectedColumns === null || currentColumns === expectedColumns) &&
    currentRows.every((v) => v === currentRows[0])
  )
}

function $canUnmerge(): boolean {
  const selection = $getSelection()
  if (
    ($isRangeSelection(selection) && !selection.isCollapsed()) ||
    (DEPRECATED_$isGridSelection(selection) &&
      !selection.anchor.is(selection.focus)) ||
    (!$isRangeSelection(selection) && !DEPRECATED_$isGridSelection(selection))
  ) {
    return false
  }
  const [cell] = DEPRECATED_$getNodeTriplet(selection.anchor)
  return cell.__colSpan > 1 || cell.__rowSpan > 1
}

type TableCellActionMenuProps = Readonly<{
  tableCellNode: TableCellNode
  cellMerge: boolean
}>

function TableActionMenu({
  tableCellNode: _tableCellNode,
  cellMerge,
}: TableCellActionMenuProps) {
  const [editor] = useLexicalComposerContext()
  const [tableCellNode, updateTableCellNode] = useState(_tableCellNode)
  const [selectionCounts, updateSelectionCounts] = useState({
    columns: 1,
    rows: 1,
  })
  const [canMergeCells, setCanMergeCells] = useState(false)
  const [canUnmergeCell, setCanUnmergeCell] = useState(false)

  useEffect(() => {
    return editor.registerMutationListener(TableCellNode, (nodeMutations) => {
      const nodeUpdated =
        nodeMutations.get(tableCellNode.getKey()) === 'updated'

      if (nodeUpdated) {
        editor.getEditorState().read(() => {
          updateTableCellNode(tableCellNode.getLatest())
        })
      }
    })
  }, [editor, tableCellNode])

  useEffect(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection()
      // Merge cells
      if (DEPRECATED_$isGridSelection(selection)) {
        const currentSelectionCounts = computeSelectionCount(selection)
        updateSelectionCounts(computeSelectionCount(selection))
        setCanMergeCells(
          isGridSelectionRectangular(selection) &&
            (currentSelectionCounts.columns > 1 ||
              currentSelectionCounts.rows > 1)
        )
      }
      // Unmerge cell
      setCanUnmergeCell($canUnmerge())
    })
  }, [editor])

  const clearTableSelection = useCallback(() => {
    editor.update(() => {
      if (tableCellNode.isAttached()) {
        const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
        const tableElement = editor.getElementByKey(
          tableNode.getKey()
        ) as HTMLTableElementWithWithTableSelectionState

        if (!tableElement) {
          throw new Error('Expected to find tableElement in DOM')
        }

        const tableSelection = getTableSelectionFromTableElement(tableElement)
        if (tableSelection !== null) {
          tableSelection.clearHighlight()
        }

        tableNode.markDirty()
        updateTableCellNode(tableCellNode.getLatest())
      }

      const rootNode = $getRoot()
      rootNode.selectStart()
    })
  }, [editor, tableCellNode])

  const mergeTableCellsAtSelection = () => {
    editor.update(() => {
      const selection = $getSelection()
      if (DEPRECATED_$isGridSelection(selection)) {
        const { columns, rows } = computeSelectionCount(selection)
        const nodes = selection.getNodes()
        let isFirstCell = true
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i]
          if (DEPRECATED_$isGridCellNode(node)) {
            if (isFirstCell) {
              node.setColSpan(columns).setRowSpan(rows)
              // TODO copy other editors' cell selection behavior
              const lastDescendant = node.getLastDescendant()
              if (lastDescendant === null) {
                throw new Error(
                  'Unexpected empty lastDescendant on the resulting merged cell'
                )
              }
              lastDescendant.select()
              isFirstCell = false
            } else {
              nodes[i].remove()
            }
          }
        }
      }
    })
  }

  const unmergeTableCellsAtSelection = () => {
    editor.update(() => {
      // Fix import $unmergeCell
      // $unmergeCell()
    })
  }

  const insertTableRowAtSelection = useCallback(
    (shouldInsertAfter: boolean) => {
      editor.update(() => {
        $insertTableRow__EXPERIMENTAL(shouldInsertAfter)
      })
    },
    [editor]
  )

  const insertTableColumnAtSelection = useCallback(
    (shouldInsertAfter: boolean) => {
      editor.update(() => {
        $insertTableColumn__EXPERIMENTAL(shouldInsertAfter)
      })
    },
    [editor]
  )

  const deleteTableRowAtSelection = useCallback(() => {
    editor.update(() => {
      $deleteTableRow__EXPERIMENTAL()
    })
  }, [editor])

  const deleteTableAtSelection = useCallback(() => {
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
      tableNode.remove()

      clearTableSelection()
    })
  }, [editor, tableCellNode, clearTableSelection])

  const deleteTableColumnAtSelection = useCallback(() => {
    editor.update(() => {
      $deleteTableColumn__EXPERIMENTAL()
    })
  }, [editor])

  const toggleTableRowIsHeader = useCallback(() => {
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)

      const tableRowIndex = $getTableRowIndexFromTableCellNode(tableCellNode)

      const tableRows = tableNode.getChildren()

      if (tableRowIndex >= tableRows.length || tableRowIndex < 0) {
        throw new Error('Expected table cell to be inside of table row.')
      }

      const tableRow = tableRows[tableRowIndex]

      if (!$isTableRowNode(tableRow)) {
        throw new Error('Expected table row')
      }

      tableRow.getChildren().forEach((tableCell) => {
        if (!$isTableCellNode(tableCell)) {
          throw new Error('Expected table cell')
        }

        tableCell.toggleHeaderStyle(TableCellHeaderStates.ROW)
      })

      clearTableSelection()
    })
  }, [editor, tableCellNode, clearTableSelection])

  const toggleTableColumnIsHeader = useCallback(() => {
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)

      const tableColumnIndex =
        $getTableColumnIndexFromTableCellNode(tableCellNode)

      const tableRows = tableNode.getChildren()

      for (let r = 0; r < tableRows.length; r++) {
        const tableRow = tableRows[r]

        if (!$isTableRowNode(tableRow)) {
          throw new Error('Expected table row')
        }

        const tableCells = tableRow.getChildren()

        if (tableColumnIndex >= tableCells.length || tableColumnIndex < 0) {
          throw new Error('Expected table cell to be inside of table row.')
        }

        const tableCell = tableCells[tableColumnIndex]

        if (!$isTableCellNode(tableCell)) {
          throw new Error('Expected table cell')
        }

        tableCell.toggleHeaderStyle(TableCellHeaderStates.COLUMN)
      }

      clearTableSelection()
    })
  }, [editor, tableCellNode, clearTableSelection])

  let mergeCellButton: null | React.ReactElement = null
  if (cellMerge) {
    if (canMergeCells) {
      mergeCellButton = (
        <MenuItem onClick={() => mergeTableCellsAtSelection()}>
          Merge cells
        </MenuItem>
      )
    } else if (canUnmergeCell) {
      mergeCellButton = (
        <MenuItem onClick={() => unmergeTableCellsAtSelection()}>
          Unmerge cells
        </MenuItem>
      )
    }
  }

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<FiChevronDown />}
            size="sm"
            variant="unstyled"
            w="auto"
            minW="auto"
          />

          {isOpen && (
            <Portal>
              <MenuList zIndex={2000}>
                {mergeCellButton !== null && (
                  <>
                    {mergeCellButton}
                    <MenuDivider />
                  </>
                )}
                <MenuItem onClick={() => insertTableRowAtSelection(false)}>
                  Insert{' '}
                  {selectionCounts.rows === 1
                    ? 'row'
                    : `${selectionCounts.rows} rows`}{' '}
                  above
                </MenuItem>
                <MenuItem onClick={() => insertTableRowAtSelection(true)}>
                  Insert{' '}
                  {selectionCounts.rows === 1
                    ? 'row'
                    : `${selectionCounts.rows} rows`}{' '}
                  below
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => insertTableColumnAtSelection(false)}>
                  Insert{' '}
                  {selectionCounts.columns === 1
                    ? 'column'
                    : `${selectionCounts.columns} columns`}{' '}
                  left
                </MenuItem>
                <MenuItem onClick={() => insertTableColumnAtSelection(true)}>
                  Insert{' '}
                  {selectionCounts.columns === 1
                    ? 'column'
                    : `${selectionCounts.columns} columns`}{' '}
                  right
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => deleteTableColumnAtSelection()}>
                  Delete column
                </MenuItem>
                <MenuItem onClick={() => deleteTableRowAtSelection()}>
                  Delete row
                </MenuItem>
                <MenuItem onClick={() => deleteTableAtSelection()}>
                  Delete table
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => toggleTableRowIsHeader()}>
                  {(tableCellNode.__headerState & TableCellHeaderStates.ROW) ===
                  TableCellHeaderStates.ROW
                    ? 'Remove'
                    : 'Add'}{' '}
                  row header
                </MenuItem>
                <MenuItem onClick={() => toggleTableColumnIsHeader()}>
                  {(tableCellNode.__headerState &
                    TableCellHeaderStates.COLUMN) ===
                  TableCellHeaderStates.COLUMN
                    ? 'Remove'
                    : 'Add'}{' '}
                  column header
                </MenuItem>
              </MenuList>
            </Portal>
          )}
        </>
      )}
    </Menu>
  )
}

function TableCellActionMenuContainer({
  anchorElem,
  cellMerge,
}: {
  anchorElem: HTMLElement
  cellMerge: boolean
}): React.ReactElement {
  const [editor] = useLexicalComposerContext()

  const menuButtonRef = useRef(null)

  const [tableCellNode, setTableMenuCellNode] = useState<TableCellNode | null>(
    null
  )

  const moveMenu = useCallback(() => {
    const menu = menuButtonRef.current
    const selection = $getSelection()
    const nativeSelection = window.getSelection()
    const activeElement = document.activeElement

    if (selection == null || menu == null) {
      setTableMenuCellNode(null)
      return
    }

    const rootElement = editor.getRootElement()

    if (
      $isRangeSelection(selection) &&
      rootElement !== null &&
      nativeSelection !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const tableCellNodeFromSelection = $getTableCellNodeFromLexicalNode(
        selection.anchor.getNode()
      )

      if (tableCellNodeFromSelection == null) {
        setTableMenuCellNode(null)
        return
      }

      const tableCellParentNodeDOM = editor.getElementByKey(
        tableCellNodeFromSelection.getKey()
      )

      if (tableCellParentNodeDOM == null) {
        setTableMenuCellNode(null)
        return
      }

      setTableMenuCellNode(tableCellNodeFromSelection)
    } else if (!activeElement) {
      setTableMenuCellNode(null)
    }
  }, [editor])

  useEffect(() => {
    return editor.registerUpdateListener(() => {
      editor.getEditorState().read(() => {
        moveMenu()
      })
    })
  })

  useEffect(() => {
    const menuButtonDOM = menuButtonRef.current as HTMLButtonElement | null

    if (menuButtonDOM != null && tableCellNode != null) {
      const tableCellNodeDOM = editor.getElementByKey(tableCellNode.getKey())

      if (tableCellNodeDOM != null) {
        const tableCellRect = tableCellNodeDOM.getBoundingClientRect()
        const menuRect = menuButtonDOM.getBoundingClientRect()
        const anchorRect = anchorElem.getBoundingClientRect()

        const top = tableCellRect.top - anchorRect.top + 4
        const left = tableCellRect.right - menuRect.width - 10 - anchorRect.left

        menuButtonDOM.style.opacity = '1'
        menuButtonDOM.style.transform = `translate(${left}px, ${top}px)`
      } else {
        menuButtonDOM.style.opacity = '0'
        menuButtonDOM.style.transform = 'translate(-10000px, -10000px)'
      }
    }
  }, [menuButtonRef, tableCellNode, editor, anchorElem])

  const prevTableCellDOM = useRef(tableCellNode)

  useEffect(() => {
    prevTableCellDOM.current = tableCellNode
  }, [prevTableCellDOM, tableCellNode])

  return (
    <Box
      ref={menuButtonRef}
      position="absolute"
      top={0}
      left={0}
      willChange="transform"
    >
      {tableCellNode != null && (
        <TableActionMenu tableCellNode={tableCellNode} cellMerge={cellMerge} />
      )}
    </Box>
  )
}

export default function TableActionMenuPlugin({
  anchorElem = document.body,
  cellMerge = false,
}: {
  anchorElem?: HTMLElement
  cellMerge?: boolean
}): null | ReactPortal {
  const isEditable = useLexicalEditable()
  return createPortal(
    isEditable ? (
      <TableCellActionMenuContainer
        anchorElem={anchorElem}
        cellMerge={cellMerge}
      />
    ) : null,
    anchorElem
  )
}
