import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory, DecoratorFn } from '@storybook/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from 'src/i18n'
import theme from 'src/theme'
import Editor from './Editor'

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
  component: Editor,
  decorators,
} as ComponentMeta<typeof Editor>

const Template: ComponentStory<typeof Editor> = () => {
  return (
    <Editor
      placeholder="Enter some text..."
      isCollab
      username="Godefroy"
      minH="4em"
    />
  )
}

export const Example = Template.bind({})
