import { Flex, FlexProps } from '@chakra-ui/react'
import { Invoice } from '@rolebase/shared/model/subscription'
import React from 'react'
import InvoiceTabLayout from './InvoiceTabLayout'

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
