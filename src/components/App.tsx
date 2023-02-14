import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { SidebarProvider } from '@contexts/SidebarContext'
import { NhostProvider } from '@nhost/react'
import { NhostApolloProvider } from '@nhost/react-apollo'
import { StoreProvider } from 'easy-peasy'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter as Router } from 'react-router-dom'
import { nhost } from 'src/nhost'
import i18n from '../i18n'
import { store } from '../store'
import theme from '../theme'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <NhostProvider nhost={nhost}>
          <NhostApolloProvider nhost={nhost}>
            <SidebarProvider>
              <StoreProvider store={store}>
                <Router>
                  <AppRoutes />
                </Router>
              </StoreProvider>
            </SidebarProvider>
          </NhostApolloProvider>
        </NhostProvider>
      </ChakraProvider>
    </I18nextProvider>
  )
}
