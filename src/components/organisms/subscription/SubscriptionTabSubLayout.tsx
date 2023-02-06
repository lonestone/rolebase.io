import { Button, Divider, Flex, FlexProps } from '@chakra-ui/react'
import { Subscription_Plan_Type_Enum } from '@gql'
import useCurrentMember from '@hooks/useCurrentMember'
import { useOrgId } from '@hooks/useOrgId'
import { useSubscriptionPlanData } from '@hooks/useSubscriptionPlanData'
import SubscriptionPlanCard from '@molecules/subscription/SubscriptionPlanCard'
import { Subscription } from '@shared/model/subscription'
import {
  SubscriptionPlan,
  SubscriptionPlanCardData,
} from '@utils/subscriptionPlansTypes'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiArrowRight } from 'react-icons/fi'
import { unsubscribeOrg } from '../../../api/functions'
import CurrentSubscriptionDetails from './CurrentSubscriptionDetails'

type SubscriptionTabSubLayoutProps = {
  subscription: Subscription
  onSubscriptionUpdated: () => void
} & FlexProps

export default function SubscriptionTabSubLayout({
  subscription,
  onSubscriptionUpdated,
  ...rest
}: SubscriptionTabSubLayoutProps) {
  const { t } = useTranslation()
  const plansData = useSubscriptionPlanData()
  const currentMember = useCurrentMember()
  const orgId = useOrgId()
  const [currentPlanData, setCurrentPlanData] = useState<SubscriptionPlan>()

  // TODO: Put this inside a confirmation modal
  const unsubscribe = async () => {
    try {
      await unsubscribeOrg({
        memberId: currentMember?.id ?? '',
        orgId: orgId ?? '',
      })
      onSubscriptionUpdated()
    } catch (e) {
      console.log('Err:', e)
    }
  }

  useEffect(() => {
    if (!plansData || !subscription) return

    switch (subscription.type) {
      case Subscription_Plan_Type_Enum.Startup:
        setCurrentPlanData(plansData.startup)
        break
      case Subscription_Plan_Type_Enum.Business:
        setCurrentPlanData(plansData.business)
        break
      default:
        setCurrentPlanData(plansData.free)
    }
  }, [plansData, subscription])

  const plans: SubscriptionPlanCardData[] = useMemo(() => {
    if (!plansData || !subscription) return []

    const plansArray: SubscriptionPlanCardData[] = []

    plansArray.push({
      ...plansData.free,
      footer: (
        <Flex w="100%" justifyContent="end">
          <Button
            variant="outline"
            rightIcon={subscription.expiresAt ? undefined : <FiArrowRight />}
            colorScheme="gray"
            onClick={unsubscribe}
            disabled={!!subscription.expiresAt}
          >
            {subscription.expiresAt
              ? t('SubscriptionPlans.activateOnSubscriptionEnd')
              : t('SubscriptionPlans.downgradePlan')}
          </Button>
        </Flex>
      ),
    })

    if (subscription.type !== Subscription_Plan_Type_Enum.Startup) {
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
    }

    if (subscription.type !== Subscription_Plan_Type_Enum.Business) {
      plansArray.push({
        ...plansData.business,
        footer: (
          <Flex w="100%" justifyContent="end">
            <Button
              as="a"
              href="https://www.rolebase.io/contact"
              target="_blank"
              rightIcon={<FiArrowRight />}
              colorScheme="gray"
            >
              {t('SubscriptionPlans.contactUs')}
            </Button>
          </Flex>
        ),
      })
    }

    return plansArray
  }, [plansData, subscription])

  return (
    <Flex w="100%" gap="5" alignItems="center" flexDir="column">
      {currentPlanData && (
        <CurrentSubscriptionDetails
          subscription={subscription}
          currentPlan={currentPlanData}
          onCardUpdated={onSubscriptionUpdated}
        />
      )}
      <Divider />
      <Flex
        w="100%"
        justifyContent="center"
        alignItems="center"
        gap="5"
        flexWrap={['wrap', 'wrap', 'wrap', 'wrap', 'nowrap']}
        flexDir="row"
        {...rest}
      >
        {plans.map((plan) => (
          <SubscriptionPlanCard
            w="100%"
            h={'350px'}
            maxW="400px"
            key={plan.type ?? 'free'}
            isCurrent={false}
            {...plan}
          />
        ))}
      </Flex>
    </Flex>
  )
}
