import { Flex, FlexProps } from '@chakra-ui/react'
import SubscriptionCanceledCard from '@molecules/subscription/SubscriptionCanceledCard'
import SubscriptionPaymentDetailsCard from '@molecules/subscription/SubscriptionPaymentDetailsCard'
import SubscriptionPlanSubCard from '@molecules/subscription/SubscriptionPlanSubCard'
import SubscriptionUpcomingInvoiceCard from '@molecules/subscription/SubscriptionUpcomingInvoiceCard'
import { Subscription } from '@shared/model/subscription'
import { SubscriptionPlan } from '@utils/subscriptionPlansTypes'
import React from 'react'

type CurrentSubscriptionDetailsProps = {
  currentPlan: SubscriptionPlan
  subscription: Subscription
  onSubscriptionUpdated: () => void
} & FlexProps

export default function CurrentSubscriptionDetails({
  subscription,
  currentPlan,
  onSubscriptionUpdated,
  ...rest
}: CurrentSubscriptionDetailsProps) {
  return (
    <Flex
      w="100%"
      gap="5"
      flexWrap={['wrap', 'wrap', 'wrap', 'nowrap']}
      justifyContent="center"
      flexDir="row"
      {...rest}
    >
      <SubscriptionPlanSubCard {...currentPlan} />
      <Flex flexDir="column" h="100%" gap="15">
        {!subscription.upcomingInvoice && subscription.expiresAt && (
          <SubscriptionCanceledCard
            subscriptionEndDate={subscription.expiresAt}
            onSubscriptionResumed={onSubscriptionUpdated}
          />
        )}
        {subscription.upcomingInvoice && (
          <SubscriptionUpcomingInvoiceCard
            h={['auto', 'auto', 'auto', '100%']}
            upcomingInvoice={subscription.upcomingInvoice}
          />
        )}
        {subscription.card && (
          <SubscriptionPaymentDetailsCard
            h={['auto', 'auto', 'auto', '100%']}
            card={subscription.card}
            email={subscription.billingDetails?.email}
            onCardUpdated={onSubscriptionUpdated}
          />
        )}
      </Flex>
    </Flex>
  )
}
