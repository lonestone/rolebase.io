import { Button, Flex, FlexProps, useDisclosure } from '@chakra-ui/react'
import { Subscription_Plan_Type_Enum } from '@gql'
import { SubscriptionPlanCardData } from '@utils/subscriptionPlansTypes'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronRightIcon, EmailIcon } from 'src/icons'
import { useSubscriptionPlanData } from '../hooks/useSubscriptionPlanData'
import SubscriptionPaymentModal from '../modals/SubscriptionPaymentModal'
import SubscriptionFreePlanCardFooter from './SubscriptionFreePlanCardFooter'
import SubscriptionPlanCard from './SubscriptionPlanCard'

export default function SubscriptionTabFreeLayout(flexProps: FlexProps) {
  const { t } = useTranslation()
  const plansData = useSubscriptionPlanData()
  const [selectedPlanType, setSelectedPlanType] =
    useState<Subscription_Plan_Type_Enum | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const subscribe = (planType: Subscription_Plan_Type_Enum) => () => {
    setSelectedPlanType(planType)
    onOpen()
  }

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
          <Button
            rightIcon={<ChevronRightIcon size="1em" />}
            onClick={subscribe(Subscription_Plan_Type_Enum.Startup)}
            colorScheme="green"
          >
            {t('SubscriptionPlans.upgradePlan')}
          </Button>
        </Flex>
      ),
    })
    plansArray.push({
      ...plansData.business,
      footer: (
        <Flex w="100%" justifyContent="end">
          <Button
            as="a"
            href="https://www.rolebase.io/contact"
            target="_blank"
            leftIcon={<EmailIcon />}
            colorScheme="gray"
          >
            {t('SubscriptionPlans.contactUs')}
          </Button>
        </Flex>
      ),
    })

    return plansArray
  }, [plansData])

  useEffect(() => {
    if (!isOpen) {
      setSelectedPlanType(null)
    }
  }, [isOpen])

  return (
    <>
      <Flex
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        p="5"
        gap="5"
        flexWrap={['wrap', 'wrap', 'wrap', 'wrap', 'nowrap']}
        flexDir="row"
        {...flexProps}
      >
        {plans.map((plan) => (
          <SubscriptionPlanCard
            w="100%"
            h={plan.type === null ? '375px' : '350px'}
            key={plan.type ?? 'free'}
            isCurrent={plan.type === null}
            {...plan}
          />
        ))}
      </Flex>
      {selectedPlanType && (
        <SubscriptionPaymentModal
          isOpen={isOpen}
          onClose={onClose}
          planType={selectedPlanType!}
        />
      )}
    </>
  )
}
