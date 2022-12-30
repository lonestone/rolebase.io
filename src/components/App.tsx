import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { NhostReactProvider } from '@nhost/react'
import { NhostApolloProvider } from '@nhost/react-apollo'
import { StoreProvider } from 'easy-peasy'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter as Router } from 'react-router-dom'
import { SidebarProvider } from 'src/contexts/SidebarContext'
import { nhost } from 'src/nhost'
import i18n from '../i18n'
import { store } from '../store'
import theme from '../theme'
import Routes from './routes/Routes'

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <NhostReactProvider nhost={nhost}>
          <NhostApolloProvider nhost={nhost}>
            <SidebarProvider>
              <StoreProvider store={store}>
                <Router>
                  <Routes />
                </Router>
              </StoreProvider>
            </SidebarProvider>
          </NhostApolloProvider>
        </NhostReactProvider>
      </ChakraProvider>
    </I18nextProvider>
  )
}
