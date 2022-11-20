import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory, DecoratorFn } from '@storybook/react'
import React, { useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from 'src/i18n'
import theme from 'src/theme'
import RRuleEditor from './RRuleEditor'

const decorators: DecoratorFn[] = [
  (Story) => (
    <I18nextProvider i18n={i18n}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Story />
      </ChakraProvider>
    </I18nextProvider>
  ),
]

export default {
  title: 'RRuleEditor',
  component: RRuleEditor,
  decorators,
} as ComponentMeta<typeof RRuleEditor>

const Template: ComponentStory<typeof RRuleEditor> = ({
  value,
  onChange,
  ...args
}) => {
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
