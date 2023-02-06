import { Flex, FlexProps } from '@chakra-ui/react'
import { Subscription } from '@shared/model/subscription'
import React from 'react'
import AccountSettingsList from './AccountSettingsList'

type AccountTabProps = {
  subscription: Subscription
  onAccountUpdated: () => void
} & FlexProps

export default function AccountTab({
  subscription,
  onAccountUpdated,
  ...rest
}: AccountTabProps) {
  return (
    <Flex w="100%" p="5" flexDir="row" {...rest}>
      {subscription && (
        <AccountSettingsList
          onUpdate={onAccountUpdated}
          subscription={subscription}
        />
      )}
    </Flex>
  )
}
