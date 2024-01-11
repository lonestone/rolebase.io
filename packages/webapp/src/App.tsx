import { SidebarProvider } from '@/layout/contexts/SidebarContext'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { NhostProvider } from '@nhost/react'
import { NhostApolloProvider } from '@nhost/react-apollo'
import { StoreProvider } from 'easy-peasy'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter as Router } from 'react-router-dom'
import { nhost } from 'src/nhost'
import i18n from './i18n'
import AppRoute from './routes/AppRoute'
import { store } from './store'
import theme from './theme'

const apolloHeaders = {
  // User admin role id "admin" is in URL query params
  'x-hasura-role': /[?&]admin(&|$)/.test(window.location.search)
    ? 'admin'
    : 'user',
}

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <NhostProvider nhost={nhost}>
          <NhostApolloProvider nhost={nhost} headers={apolloHeaders}>
            <SidebarProvider>
              <StoreProvider store={store}>
                <Router>
                  <AppRoute />
                </Router>
              </StoreProvider>
            </SidebarProvider>
          </NhostApolloProvider>
        </NhostProvider>
      </ChakraProvider>
    </I18nextProvider>
  )
}
