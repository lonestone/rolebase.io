import CreditCardIcon from '@atoms/CreditCardIcon'
import { HStack, StackProps, Text, useDisclosure } from '@chakra-ui/react'
import { SubscriptionCard } from '@hared/model/subscription'
import SettingItem from '@molecules/SettingItem'
import React from 'react'
import { useTranslation } from 'react-i18next'
import UpdatePaymentMethodModal from './UpdatePaymentMethodModal'

type PaymentMethodSettingItemProps = {
  card: SubscriptionCard | null
  onUpdate: () => void
} & StackProps

export default function PaymentMethodSettingItem({
  card,
  onUpdate,
  ...rest
}: PaymentMethodSettingItemProps) {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <SettingItem
        displayName={t('SubscriptionTabs.accountTab.paymentMethod')}
        onEdit={onOpen}
        value={
          <HStack>
            <CreditCardIcon name={card.brand} style={{ width: 30 }} />
            <Text>···· {card.last4}</Text>
          </HStack>
        }
        editable
        {...rest}
      />
      {isOpen && (
        <UpdatePaymentMethodModal
          size="lg"
          isOpen={isOpen}
          onClose={onClose}
          onUpdate={onUpdate}
        />
      )}
    </>
  )
}
