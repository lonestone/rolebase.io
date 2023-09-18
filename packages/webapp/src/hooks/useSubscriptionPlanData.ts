import { Subscription_Plan_Type_Enum } from '@gql'
import { SubscriptionPlanData } from '@utils/subscriptionPlansTypes'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export const useSubscriptionPlanData = () => {
  const { t } = useTranslation()

  const data: SubscriptionPlanData = useMemo(
    () => ({
      free: {
        type: null,
        title: t('SubscriptionPlans.free.title'),
        desc: t('SubscriptionPlans.free.desc'),
        features: [
          t('SubscriptionPlans.free.feature1'),
          t('SubscriptionPlans.free.feature2'),
          t('SubscriptionPlans.free.feature3'),
        ],
        color: 'blue',
      },
      startup: {
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
      },
      business: {
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
      },
    }),
    [t]
  )

  return data
}
