import { CircleMemberStateProvider } from '@/circle/contexts/CircleMemberStateProvider'
import { SidebarProvider } from '@/layout/contexts/SidebarContext'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { NhostProvider } from '@nhost/react'
import { NhostApolloProvider } from '@nhost/react-apollo'
import { StoreProvider } from 'easy-peasy'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import i18n from 'src/i18n'
import { nhost } from 'src/nhost'
import { store } from 'src/store'
import theme from 'src/theme'
import OrgPage from './OrgPage'

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
                  <CircleMemberStateProvider>
                    <Routes>
                      <Route path="*" element={<OrgPage />} />
                    </Routes>
                  </CircleMemberStateProvider>
                </Router>
              </StoreProvider>
            </SidebarProvider>
          </NhostApolloProvider>
        </NhostProvider>
      </ChakraProvider>
    </I18nextProvider>
  )
}
