import { Flex, FlexProps, Text } from '@chakra-ui/react'
import React from 'react'
import { CheckIcon } from 'src/icons'

type SubscriptionFeaturesProps = {
  features: string[]
} & FlexProps

export default function SubscriptionFeatures({
  features,
  ...flexProps
}: SubscriptionFeaturesProps) {
  return (
    <Flex mt="4" flexDir="column" gap="3" {...flexProps}>
      {features.map((feature) => (
        <Flex key={feature} flexDir="row" gap="6" alignItems="center">
          <CheckIcon size={20} color="green" />
          <Text
            color="gray.600"
            fontWeight={600}
            _dark={{
              color: 'gray.100',
            }}
          >
            {feature}
          </Text>
        </Flex>
      ))}
    </Flex>
  )
}
