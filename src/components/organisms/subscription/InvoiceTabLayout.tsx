import { Flex, FlexProps, Spinner, Text } from '@chakra-ui/react'
import { Invoice } from '@shared/model/subscription'
import React from 'react'
import { useTranslation } from 'react-i18next'
import InvoiceTable from './InvoiceTable'

type InvoiceTabLayoutProps = {
  invoices: Invoice[]
  loading: boolean
} & FlexProps

export default function InvoiceTabLayout({
  invoices,
  loading,
  ...rest
}: InvoiceTabLayoutProps) {
  const { t } = useTranslation()

  return (
    <Flex flexDir="column" gap="16" w="100%" {...rest}>
      <Flex flexDir="column" w="100%" gap="1">
        <Text fontWeight={800} fontSize="24">
          {t('SubscriptionTabs.invoiceTab.heading')}
        </Text>
        <Text fontWeight={600} fontSize="18" color="gray.400">
          {t('SubscriptionTabs.invoiceTab.desc')}
        </Text>
      </Flex>
      {loading && <Spinner m="auto" />}

      {!!invoices.length && !loading && <InvoiceTable invoices={invoices} />}

      {invoices.length <= 0 && !loading && (
        <Text m="auto">{t('SubscriptionTabs.invoiceTab.noInvoice')}</Text>
      )}
    </Flex>
  )
}
