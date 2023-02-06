import { StackProps, useDisclosure } from '@chakra-ui/react'
import SettingItem from '@molecules/SettingItem'
import { CustomerBillingDetails } from '@shared/model/subscription'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import UpdateBillingDetailsModal from './UpdateBillingDetailsModal'

type BillingDetailsSettingItemProps = {
  billingDetails: CustomerBillingDetails | null
  onUpdate: () => void
} & StackProps

export default function BillingDetailsSettingItem({
  billingDetails,
  onUpdate,
  ...rest
}: BillingDetailsSettingItemProps) {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const formattedAddress = useMemo(() => {
    const address = billingDetails?.address

    if (!address) return null

    return `${billingDetails.name} - ${address.line1} ${address.postal_code} ${address.city}, ${address.country}`
  }, [billingDetails?.address])

  return (
    <>
      <SettingItem
        displayName={t('SubscriptionTabs.accountTab.billingDetails')}
        onEdit={onOpen}
        value={formattedAddress}
        editable
      />
      <UpdateBillingDetailsModal
        size="xl"
        billingDetails={billingDetails}
        onBillingDetailsUpdated={onUpdate}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
}
