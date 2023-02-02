import { Button, Flex, FlexProps } from '@chakra-ui/react'
import { useSubscriptionPlanData } from '@hooks/useSubscriptionPlanData'
import SubscriptionFreePlanCardFooter from '@molecules/subscription/SubscriptionFreePlanCardFooter'
import SubscriptionPlanCard from '@molecules/subscription/SubscriptionPlanCard'
import { SubscriptionPlanCardData } from '@utils/subscriptionPlansTypes'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FiArrowRight } from 'react-icons/fi'

export default function SubscriptionTabFreeLayout({ ...rest }: FlexProps) {
  const { t } = useTranslation()
  const plansData = useSubscriptionPlanData()

  const plans: SubscriptionPlanCardData[] = useMemo(() => {
    if (!plansData) return []

    const plansArray: SubscriptionPlanCardData[] = []

    plansArray.push({
      ...plansData.free,
      footer: <SubscriptionFreePlanCardFooter />,
    })
    plansArray.push({
      ...plansData.startup,
      footer: (
        <Flex w="100%" justifyContent="end">
          <Button rightIcon={<FiArrowRight />} colorScheme="gray">
            {t('SubscriptionPlans.upgradePlan')}
          </Button>
        </Flex>
      ),
    })
    plansArray.push({
      ...plansData.business,
      footer: (
        <Flex w="100%" justifyContent="end">
          <Button rightIcon={<FiArrowRight />} colorScheme="gray">
            {t('SubscriptionPlans.upgradePlan')}
          </Button>
        </Flex>
      ),
    })

    return plansArray
  }, [plansData])

  return (
    <Flex
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      p="5"
      gap="5"
      flexWrap={['wrap', 'wrap', 'wrap', 'wrap', 'nowrap']}
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
