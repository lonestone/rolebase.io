import Tab from '@atoms/Tab'
import {
  Flex,
  FlexProps,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiFileText, FiTarget, FiUser } from 'react-icons/fi'
import SubscriptionTab from './SubscriptionTab'

export default function SubscriptionTabs(props: FlexProps) {
  const { t } = useTranslation()

  return (
    <Flex {...props}>
      <Tabs w="100%" colorScheme="orange">
        <TabList px="10">
          <Tab
            title={t('SubscriptionTabs.subscriptionTab')}
            icon={<FiTarget />}
          />

          <Tab title={t('SubscriptionTabs.accountTab')} icon={<FiUser />} />

          <Tab
            title={t('SubscriptionTabs.invoicesTab')}
            icon={<FiFileText />}
          />
        </TabList>

        <TabPanels>
          <TabPanel>
            <SubscriptionTab />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}
