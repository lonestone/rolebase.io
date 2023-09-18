import { Flex, FlexProps } from '@chakra-ui/react'
import InvoiceTabLayout from '@organisms/subscription/InvoiceTabLayout'
import { Invoice } from '@shared/model/subscription'
import React from 'react'

type InvoiceTabProps = {
  invoices: Invoice[]
} & FlexProps

export default function InvoiceTab({
  invoices,
  ...flexProps
}: InvoiceTabProps) {
  return (
    <Flex p="5" flexDir="row" {...flexProps}>
      <InvoiceTabLayout invoices={invoices} />
    </Flex>
  )
}
