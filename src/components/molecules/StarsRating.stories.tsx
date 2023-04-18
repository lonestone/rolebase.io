import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'
import { decorators } from '../../stories'
import { StarsRating } from './StarsRating'

export default {
  title: 'StarsRating',
  component: StarsRating,
  decorators,
} as ComponentMeta<typeof StarsRating>

export const Example: ComponentStory<typeof StarsRating> = (args) => {
  const [value, setValue] = useState(args.value ?? 0)
  return (
    <StarsRating
      {...args}
      value={value}
      onChange={(...params) => {
        // args.onChange(...params)
        setValue(...params)
      }}
    />
  )
}

Example.args = {
  value: 0,
}
