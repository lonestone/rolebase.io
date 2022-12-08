import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory, DecoratorFn } from '@storybook/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from 'src/i18n'
import theme from 'src/theme'
import { App } from './App'

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
  title: 'RichEditor',
  component: App,
  decorators,
} as ComponentMeta<typeof App>

const Template: ComponentStory<typeof App> = () => {
  return <App />
}

export const Example = Template.bind({})
