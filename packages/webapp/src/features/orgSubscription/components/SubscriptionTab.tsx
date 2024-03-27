import { Flex, FlexProps } from '@chakra-ui/react'
import { Subscription } from '@rolebase/shared/model/subscription'
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
  ...flexProps
}: SubscriptionTabProps) {
  return (
    <Flex p="5" flexDir="row" {...flexProps}>
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
