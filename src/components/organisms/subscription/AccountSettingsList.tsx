import { StackProps, Text, VStack } from '@chakra-ui/react'
import SettingItem from '@molecules/SettingItem'
import BillingDetailsSettingItem from '@organisms/subscription/BillingDetailsSettingItem'
import BillingEmailSettingItem from '@organisms/subscription/BillingEmailSettingItem'
import PaymentMethodSettingItem from '@organisms/subscription/PaymentMethodSettingItem'
import { Subscription } from '@shared/model/subscription'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import { format } from 'date-fns'
import React from 'react'
import { useTranslation } from 'react-i18next'

type AccountSettingsListProps = {
  subscription: Subscription
  onUpdate: () => void
} & StackProps

export default function AccountSettingsList({
  subscription,
  onUpdate,
  ...stackProps
}: AccountSettingsListProps) {
  const { t } = useTranslation()

  return (
    <VStack
      justifyContent="center !important"
      p={{ base: '0', sm: '5' }}
      w="100%"
      maxW="1000px"
      {...stackProps}
    >
      <BillingEmailSettingItem
        email={subscription.billingDetails?.email ?? ''}
        onUpdate={onUpdate}
      />
      <BillingDetailsSettingItem
        billingDetails={subscription.billingDetails}
        onUpdate={onUpdate}
      />
      <PaymentMethodSettingItem card={subscription.card} onUpdate={onUpdate} />
      <SettingItem
        displayName={t('SubscriptionTabs.accountTab.currentSubscription')}
        value={
          subscription.expiresAt ? (
            <>
              <Text>
                {capitalizeFirstLetter(subscription.type.toLocaleLowerCase())}
              </Text>
              <Text color="red.500" as="i" fontSize={14}>
                {t('SubscriptionPlans.expiresAt')}{' '}
                {format(new Date(subscription.expiresAt), 'dd/MM/uuuu')}
              </Text>
            </>
          ) : (
            <>
              <Text>
                {capitalizeFirstLetter(subscription.type.toLocaleLowerCase())}
              </Text>
              <Text color="green.500" as="i" fontSize={14}>
                {t('SubscriptionPlans.active')}
              </Text>
            </>
          )
        }
      />
    </VStack>
  )
}
