import { getSubscription, getSubscriptionInvoices } from '@api/functions'
import Tab from '@atoms/Tab'
import {
  Flex,
  FlexProps,
  Spinner,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import useCurrentMember from '@hooks/useCurrentMember'
import { useOrgId } from '@hooks/useOrgId'
import AccountTab from '@organisms/subscription/AccountTab'
import InvoiceTab from '@organisms/subscription/InvoiceTab'
import SubscriptionTab from '@organisms/subscription/SubscriptionTab'
import { Invoice, Subscription } from '@shared/model/subscription'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiFileText, FiTarget, FiUser } from 'react-icons/fi'

export default function SubscriptionTabs(props: FlexProps) {
  const { t } = useTranslation()
  const orgId = useOrgId()
  const currentMember = useCurrentMember()
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
    const res = await getSubscription({
      memberId: currentMember?.id!,
      orgId: orgId!,
    })

    setSubscription(res)
  }

  const getInvoicesData = async () => {
    const res = await getSubscriptionInvoices({
      memberId: currentMember?.id!,
      orgId: orgId!,
    })

    setInvoices(res)
  }

  return (
    <Flex {...props}>
      <Tabs w="100%" colorScheme="orange">
        <TabList px="10">
          <Tab
            title={t('SubscriptionTabs.subscriptionTabTitle')}
            icon={<FiTarget />}
          />

          <Tab
            title={t('SubscriptionTabs.accountTabTitle')}
            icon={<FiUser />}
          />

          <Tab
            title={t('SubscriptionTabs.invoicesTabTitle')}
            icon={<FiFileText />}
          />
        </TabList>
        <TabPanels>
          <TabPanel>
            {!subscription && <Spinner m="auto" />}
            {subscription && (
              <SubscriptionTab
                subscription={subscription}
                onSubscriptionUpdated={getSubscriptionData}
              />
            )}
          </TabPanel>
          <TabPanel>
            {!subscription && <Spinner m="auto" />}
            {subscription && (
              <AccountTab
                subscription={subscription}
                onAccountUpdated={getSubscriptionData}
              />
            )}
          </TabPanel>
          <TabPanel>
            {!invoices && <Spinner m="auto" />}
            {invoices && <InvoiceTab />}{' '}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}
