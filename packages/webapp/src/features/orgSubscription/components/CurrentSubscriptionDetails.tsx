import { Flex, FlexProps } from '@chakra-ui/react'
import { Subscription } from '@rolebase/shared/model/subscription'
import React, { useMemo } from 'react'
import { SubscriptionPlan } from '../plansTypes'
import SubscriptionCanceledCard from './SubscriptionCanceledCard'
import SubscriptionPaymentDetailsCard from './SubscriptionPaymentDetailsCard'
import SubscriptionPlanSubCard from './SubscriptionPlanSubCard'
import SubscriptionUpcomingInvoiceCard from './SubscriptionUpcomingInvoiceCard'

type CurrentSubscriptionDetailsProps = {
  currentPlan: SubscriptionPlan
  subscription: Subscription
  onSubscriptionUpdated: () => void
} & FlexProps

export default function CurrentSubscriptionDetails({
  subscription,
  currentPlan,
  onSubscriptionUpdated,
  ...flexProps
}: CurrentSubscriptionDetailsProps) {
  const hasDetails = useMemo(
    () =>
      !!subscription.upcomingInvoice ||
      !!subscription.card ||
      !!subscription.expiresAt,
    [subscription]
  )
  return (
    <Flex
      w="100%"
      gap="5"
      flexWrap={['wrap', 'wrap', 'wrap', 'nowrap']}
      justifyContent="center"
      flexDir="row"
      {...flexProps}
    >
      <SubscriptionPlanSubCard w="100%" maxW="600px" {...currentPlan} />
      {hasDetails && (
        <Flex flexDir="column" h="100%" w="100%" maxW="430px" gap="15">
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
          {subscription.expiresAt && (
            <SubscriptionCanceledCard
              subscriptionEndDate={subscription.expiresAt}
              onSubscriptionResumed={onSubscriptionUpdated}
            />
          )}
        </Flex>
      )}
    </Flex>
  )
}
