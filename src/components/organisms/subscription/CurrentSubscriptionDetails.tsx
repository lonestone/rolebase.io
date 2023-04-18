import { Flex, FlexProps } from '@chakra-ui/react'
import SubscriptionCanceledCard from '@molecules/subscription/SubscriptionCanceledCard'
import SubscriptionPaymentDetailsCard from '@molecules/subscription/SubscriptionPaymentDetailsCard'
import SubscriptionPlanSubCard from '@molecules/subscription/SubscriptionPlanSubCard'
import SubscriptionUpcomingInvoiceCard from '@molecules/subscription/SubscriptionUpcomingInvoiceCard'
import { Subscription } from '@shared/model/subscription'
import { SubscriptionPlan } from '@utils/subscriptionPlansTypes'
import { useMemo } from 'react'

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
