import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { decorators } from '../../stories'
import BounceAnimation from './BounceAnimation'

export default {
  title: 'BounceAnimation',
  component: BounceAnimation,
  decorators,
} as ComponentMeta<typeof BounceAnimation>

const Template: ComponentStory<typeof BounceAnimation> = (args) => (
  <BounceAnimation {...args}>
    <div style={{ width: 100, height: 100, backgroundColor: 'red' }} />
  </BounceAnimation>
)

export const Example = Template.bind({})
Example.args = {
  active: true,
}
