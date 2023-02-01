import { Button, Flex, FlexProps } from '@chakra-ui/react'
import { Subscription_Plan_Type_Enum } from '@gql'
import SubscriptionFreePlanCardFooter from '@molecules/subscription/SubscriptionFreePlanCardFooter'
import SubscriptionPlanCard from '@molecules/subscription/SubscriptionPlanCard'
import React, { ReactElement, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FiArrowRight } from 'react-icons/fi'

type SubscriptionPlan = {
  type: Subscription_Plan_Type_Enum | null
  title: string
  desc: string
  features: string[]
  color: string
  footer: ReactElement | null
}

export default function SubscriptionTabFreeLayout({ ...rest }: FlexProps) {
  const { t } = useTranslation()

  const plans: SubscriptionPlan[] = useMemo(
    () => [
      {
        type: null,
        title: t('SubscriptionPlans.free.title'),
        desc: t('SubscriptionPlans.free.desc'),
        features: [
          t('SubscriptionPlans.free.feature1'),
          t('SubscriptionPlans.free.feature2'),
          t('SubscriptionPlans.free.feature3'),
        ],
        color: 'blue',
        footer: <SubscriptionFreePlanCardFooter />,
      },
      {
        type: Subscription_Plan_Type_Enum.Startup,
        title: t('SubscriptionPlans.startup.title'),
        desc: t('SubscriptionPlans.startup.desc'),
        features: [
          t('SubscriptionPlans.startup.feature1'),
          t('SubscriptionPlans.startup.feature2'),
          t('SubscriptionPlans.startup.feature3'),
          t('SubscriptionPlans.startup.feature4'),
        ],
        color: 'green',
        footer: (
          <Flex w="100%" justifyContent="end">
            <Button rightIcon={<FiArrowRight />} colorScheme="gray">
              {t('SubscriptionPlans.upgradePlan')}
            </Button>
          </Flex>
        ),
      },
      {
        type: Subscription_Plan_Type_Enum.Business,
        title: t('SubscriptionPlans.business.title'),
        desc: t('SubscriptionPlans.business.desc'),
        features: [
          t('SubscriptionPlans.business.feature1'),
          t('SubscriptionPlans.business.feature2'),
          t('SubscriptionPlans.business.feature3'),
          t('SubscriptionPlans.business.feature4'),
        ],
        color: 'orange',
        footer: (
          <Flex w="100%" justifyContent="end">
            <Button rightIcon={<FiArrowRight />} colorScheme="gray">
              {t('SubscriptionPlans.contactUs')}
            </Button>
          </Flex>
        ),
      },
    ],
    [t]
  )

  return (
    <Flex
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      p="5"
      gap="5"
      flexDir="row"
      {...rest}
    >
      {plans.map((plan) => (
        <SubscriptionPlanCard
          w="100%"
          h={plan.type === null ? '375px' : '350px'}
          key={plan.type ?? 'free'}
          title={plan.title}
          desc={plan.desc}
          features={plan.features}
          footer={plan.footer}
          isCurrent={plan.type === null}
          color={plan.color}
        />
      ))}
    </Flex>
  )
}
