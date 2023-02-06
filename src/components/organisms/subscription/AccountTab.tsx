import { Flex, FlexProps, Text } from '@chakra-ui/react'
import { Subscription } from '@shared/model/subscription'
import React from 'react'
import { useTranslation } from 'react-i18next'
import AccountSettingsList from './AccountSettingsList'

type AccountTabProps = {
  subscription: Subscription | null
  onAccountUpdated: () => void
} & FlexProps

export default function AccountTab({
  subscription,
  onAccountUpdated,
  ...rest
}: AccountTabProps) {
  const { t } = useTranslation()
  return (
    <Flex w="100%" p="5" flexDir="row" {...rest}>
      {subscription && (
        <AccountSettingsList
          onUpdate={onAccountUpdated}
          subscription={subscription}
        />
      )}
      {!subscription && (
        <Text pt="10" m="auto">
          {t('SubscriptionPlans.noBillingAccount')}
        </Text>
      )}
    </Flex>
  )
}
