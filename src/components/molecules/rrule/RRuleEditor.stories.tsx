import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useEffect, useState } from 'react'
import { decorators } from '../../../stories'
import RRuleEditor, { RRuleEditorProps } from './RRuleEditor'

export default {
  title: 'RRuleEditor',
  component: RRuleEditor,
  decorators,
} as ComponentMeta<typeof RRuleEditor>

const Template: ComponentStory<typeof RRuleEditor> = ({
  value,
  onChange,
  ...args
}: RRuleEditorProps) => {
  const [stateValue, setValue] = useState(value)

  useEffect(() => {
    setValue(value)
  }, [value])

  return (
    <RRuleEditor
      value={stateValue}
      onChange={(value) => {
        onChange(value)
        setValue(value)
      }}
      {...args}
    />
  )
}

export const Example = Template.bind({})
Example.args = {
  value:
    'DTSTART:20221118T230000Z\nRRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,WE;COUNT=42',
}
