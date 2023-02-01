import { getSubscription } from '@api/functions'
import { Flex, FlexProps, Spinner } from '@chakra-ui/react'
import useCurrentMember from '@hooks/useCurrentMember'
import { useOrgId } from '@hooks/useOrgId'
import { Subscription } from '@shared/model/subscription'
import React, { useEffect, useMemo, useState } from 'react'
import SubscriptionTabFreeLayout from './SubscriptionTabFreeLayout'

export default function SubscriptionTab({ ...rest }: FlexProps) {
  const orgId = useOrgId()
  const currentMember = useCurrentMember()
  const [subscription, setSubscription] = useState<Subscription | null>()
  const isLoading = useMemo(() => subscription === undefined, [subscription])

  useEffect(() => {
    if (orgId && currentMember) {
      getData()
    }
  }, [orgId, currentMember])

  const getData = async () => {
    const res = await getSubscription({
      memberId: currentMember?.id!,
      orgId: orgId!,
    })

    setSubscription(res)
  }

  return (
    <Flex p="5" flexDir="row" {...rest}>
      {isLoading && <Spinner m="auto" />}
      {!isLoading && !subscription && <SubscriptionTabFreeLayout />}
      {!isLoading && subscription && <div>Subbed layout</div>}
    </Flex>
  )
}
