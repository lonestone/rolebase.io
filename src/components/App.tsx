import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { StoreProvider } from 'easy-peasy'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter as Router } from 'react-router-dom'
import i18n from '../i18n'
import { store } from '../store'
import theme from '../theme'
import Routes from './routes/Routes'

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <StoreProvider store={store}>
          <Router>
            <Routes />
          </Router>
        </StoreProvider>
      </ChakraProvider>
    </I18nextProvider>
  )
}
