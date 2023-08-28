import { getSubscription, getSubscriptionInvoices } from '@api/functions'
import Tab from '@atoms/Tab'
import {
  Box,
  Flex,
  FlexProps,
  HStack,
  Spinner,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from '@chakra-ui/react'
import useCurrentMember from '@hooks/useCurrentMember'
import { useOrgId } from '@hooks/useOrgId'
import AccountTab from '@organisms/subscription/AccountTab'
import InvoiceTab from '@organisms/subscription/InvoiceTab'
import SubscriptionTab from '@organisms/subscription/SubscriptionTab'
import { Invoice, Subscription } from '@shared/model/subscription'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FileIcon, MemberIcon, SubscriptionIcon } from 'src/icons'

export default function SubscriptionTabs(props: FlexProps) {
  const { t } = useTranslation()
  const orgId = useOrgId()
  const currentMember = useCurrentMember()
  const toast = useToast()
  const [subscriptionLoading, setSubscriptionLoading] = useState(true)
  const [invoicesLoading, setInvoicesLoading] = useState(true)
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [invoices, setInvoices] = useState<Invoice[]>([])

  useEffect(() => {
    if (orgId && currentMember) {
      getData()
    }
  }, [orgId, currentMember])

  const getData = () => {
    getSubscriptionData()
    getInvoicesData()
  }

  const getSubscriptionData = async () => {
    setSubscriptionLoading(true)
    try {
      const res = await getSubscription({
        orgId: orgId!,
      })

      setSubscription(res)
    } catch (e) {
      displayErrorToast()
    } finally {
      setSubscriptionLoading(false)
    }
  }

  const getInvoicesData = async () => {
    setInvoicesLoading(true)
    try {
      const res = await getSubscriptionInvoices({
        orgId: orgId!,
      })

      setInvoices(res)
    } catch (e) {
      displayErrorToast()
    } finally {
      setInvoicesLoading(false)
    }
  }

  const displayErrorToast = () => {
    toast({
      title: t('common.errorRetry'),
      description: t('common.errorContact'),
      duration: 10000,
      isClosable: true,
      status: 'error',
    })
  }

  const TabSpinner = useMemo(
    () => (
      <HStack w="100%" justifyContent="center" pt="12">
        <Spinner size="xl" />
      </HStack>
    ),
    []
  )

  return (
    <Flex {...props}>
      <Tabs w="100%" colorScheme="gray">
        <Box overflow="auto">
          <TabList px="10">
            <Tab
              title={t('SubscriptionTabs.subscriptionTabTitle')}
              icon={<SubscriptionIcon />}
            />

            <Tab
              title={t('SubscriptionTabs.accountTabTitle')}
              icon={<MemberIcon />}
            />

            <Tab
              title={t('SubscriptionTabs.invoicesTabTitle')}
              icon={<FileIcon />}
            />
          </TabList>
        </Box>
        <TabPanels>
          <TabPanel w="100%">
            {subscriptionLoading && TabSpinner}
            {!subscriptionLoading && (
              <SubscriptionTab
                subscription={subscription}
                onSubscriptionUpdated={getSubscriptionData}
              />
            )}
          </TabPanel>
          <TabPanel>
            {subscriptionLoading && TabSpinner}
            {!subscriptionLoading && (
              <AccountTab
                subscription={subscription}
                onAccountUpdated={getSubscriptionData}
              />
            )}
          </TabPanel>
          <TabPanel>
            {invoicesLoading && TabSpinner}
            {!invoicesLoading && <InvoiceTab invoices={invoices} />}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}
