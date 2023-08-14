import { VStack } from '@chakra-ui/react'
import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { decorators } from '../../stories'
import BrandIcon from './BrandIcon'

export default {
  title: 'BrandIcon',
  component: BrandIcon,
  decorators,
} as Meta<typeof BrandIcon>

export const Example: StoryObj<typeof BrandIcon> = {
  render: () => (
    <VStack spacing={10} m={10}>
      <BrandIcon size="sm" />
      <BrandIcon size="md" />
      <BrandIcon size="lg" />
    </VStack>
  ),
}
