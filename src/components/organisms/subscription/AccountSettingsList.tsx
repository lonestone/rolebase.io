import { StackProps, VStack } from '@chakra-ui/react'
import SettingItem from '@molecules/SettingItem'
import BillingDetailsSettingItem from '@organisms/subscription/BillingDetailsSettingItem'
import BillingEmailSettingItem from '@organisms/subscription/BillingEmailSettingItem'
import PaymentMethodSettingItem from '@organisms/subscription/PaymentMethodSettingItem'
import { Subscription } from '@shared/model/subscription'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import React from 'react'
import { useTranslation } from 'react-i18next'

type AccountSettingsListProps = {
  subscription: Subscription
  onUpdate: () => void
} & StackProps

export default function AccountSettingsList({
  subscription,
  onUpdate,
  ...rest
}: AccountSettingsListProps) {
  const { t } = useTranslation()

  return (
    <VStack p={{ base: '0', sm: '5' }} w="100%" {...rest}>
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
        value={capitalizeFirstLetter(subscription.type.toLocaleLowerCase())}
      />
    </VStack>
  )
}
