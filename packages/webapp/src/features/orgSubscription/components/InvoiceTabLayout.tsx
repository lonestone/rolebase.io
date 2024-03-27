import { Flex, FlexProps, Text } from '@chakra-ui/react'
import { Invoice } from '@rolebase/shared/model/subscription'
import React from 'react'
import { useTranslation } from 'react-i18next'
import InvoiceTable from './InvoiceTable'

type InvoiceTabLayoutProps = {
  invoices: Invoice[]
} & FlexProps

export default function InvoiceTabLayout({
  invoices,
  ...flexProps
}: InvoiceTabLayoutProps) {
  const { t } = useTranslation()

  return (
    <Flex flexDir="column" gap="16" w="100%" {...flexProps}>
      <Flex flexDir="column" w="100%" gap="1">
        <Text fontWeight={800} fontSize="24">
          {t('SubscriptionTabs.invoiceTab.heading')}
        </Text>
        <Text fontWeight={600} fontSize="18" color="gray.400">
          {t('SubscriptionTabs.invoiceTab.desc')}
        </Text>
      </Flex>
      {invoices.length >= 0 && <InvoiceTable invoices={invoices} />}

      {invoices.length <= 0 && (
        <Text m="auto">{t('SubscriptionTabs.invoiceTab.noInvoice')}</Text>
      )}
    </Flex>
  )
}
