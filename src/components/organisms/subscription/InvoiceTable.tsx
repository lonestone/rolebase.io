import {
  Button,
  HStack,
  Table,
  TableContainer,
  TableContainerProps,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { Invoice } from '@shared/model/subscription'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { format } from 'date-fns'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiArrowDown, FiArrowUp, FiDownload, FiFileText } from 'react-icons/fi'

type InvoiceTableProps = {
  invoices: Invoice[]
} & TableContainerProps

export default function InvoiceTable({
  invoices,
  ...tableContainerProps
}: InvoiceTableProps) {
  const { t } = useTranslation()
  const [sorting, setSorting] = useState<SortingState>([])
  const columnHelper = createColumnHelper<Invoice>()
  const textStyle = {
    fontWeight: 600,
    color: 'gray.500',
    _dark: { color: 'gray.300' },
  }

  useEffect(() => {
    console.log('invoices', invoices)
    console.log('type', typeof invoices)
  }, [invoices])

  const sortDates = (
    row1: Row<Invoice>,
    row2: Row<Invoice>,
    columnId: string
  ) => {
    const invoice1 = row1.getValue(columnId) as Date
    const invoice2 = row2.getValue(columnId) as Date

    return invoice1.getTime() - invoice2.getTime()
  }

  const getFormattedDate = (dateAsString: string) => {
    try {
      const res = format(new Date(dateAsString), 'dd/MM/uu')

      return res
    } catch (e) {
      return null
    }
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row.createdAt, {
        id: 'name',
        header: () =>
          `${t('SubscriptionTabs.invoiceTab.invoice')} (${invoices.length})`,
        cell: (info) => (
          <HStack>
            <FiFileText />
            <Text {...textStyle} ml="2">
              {`${t('SubscriptionTabs.invoiceTab.invoice')} ${getFormattedDate(
                info.getValue()
              )}`}
            </Text>
          </HStack>
        ),
        enableSorting: false,
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor((row) => new Date(row.createdAt), {
        id: 'createdAt',
        header: () => t('SubscriptionTabs.invoiceTab.invoiceDate'),
        enableSorting: true,
        sortingFn: sortDates,
        cell: (info) => (
          <Text {...textStyle}>{getFormattedDate(info.getValue())}</Text>
        ),
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('totalInCents', {
        header: () => t('SubscriptionTabs.invoiceTab.amount'),
        enableSorting: true,
        cell: (info) => (
          <Text {...textStyle}>€{(info.getValue() / 100).toFixed(2)}</Text>
        ),
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('status', {
        header: () => t('SubscriptionTabs.invoiceTab.status'),
        enableSorting: true,
        cell: (info) => (
          <Text {...textStyle}>
            {t(`SubscriptionTabs.invoiceTab.paymentStatus.${info.getValue()}`)}
          </Text>
        ),
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor((row) => row.pdfUrl, {
        id: 'actions',
        header: '',
        cell: (info) => {
          const link = info.getValue()
          return (
            <Button
              variant="outline"
              as={link ? 'a' : undefined}
              isDisabled={!link}
              href={link ?? undefined}
              target="_blank"
              leftIcon={<FiDownload />}
            >
              {t('SubscriptionTabs.invoiceTab.download')}
            </Button>
          )
        },
        enableSorting: false,
        footer: (props) => props.column.id,
      }),
    ],
    [invoices, t]
  )

  const table = useReactTable<Invoice>({
    data: invoices,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: import.meta.env.DEV,
  })
  return (
    <TableContainer {...tableContainerProps}>
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header, i) => {
                return (
                  <Th
                    width={i === 0 ? '75%' : 'auto'}
                    key={header.id}
                    colSpan={header.colSpan}
                    {...{
                      cursor: header.column.getCanSort() ? 'pointer' : '',
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <HStack mr={header.column.getIsSorted() ? '0' : '3'}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <FiArrowUp />,
                          desc: <FiArrowDown />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </HStack>
                    )}
                  </Th>
                )
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => {
            console.log('Row', row)
            return (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
