import { Flex, FlexProps } from '@chakra-ui/react'
import { Subscription } from '@shared/model/subscription'
import React from 'react'
import SubscriptionTabFreeLayout from './SubscriptionTabFreeLayout'
import SubscriptionTabSubLayout from './SubscriptionTabSubLayout'

type SubscriptionTabProps = {
  subscription: Subscription | null
  onSubscriptionUpdated: () => void
} & FlexProps

export default function SubscriptionTab({
  subscription,
  onSubscriptionUpdated,
  ...rest
}: SubscriptionTabProps) {
  return (
    <Flex p="5" flexDir="row" {...rest}>
      {!subscription && <SubscriptionTabFreeLayout />}
      {subscription && (
        <SubscriptionTabSubLayout
          onSubscriptionUpdated={onSubscriptionUpdated}
          subscription={subscription}
        />
      )}
    </Flex>
  )
}
