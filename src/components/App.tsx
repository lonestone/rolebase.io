import { ChakraProvider } from '@chakra-ui/react'
import { StoreProvider } from 'easy-peasy'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoggedLayout from './layout/LoggedLayout'
import OrgPage from './pages/OrgPage'
import OrgsPage from './pages/OrgsPage'
import { store } from './store'

export default function App() {
  return (
    <ChakraProvider>
      <StoreProvider store={store}>
        <Router>
          <LoggedLayout>
            <Switch>
              <Route exact path="/">
                <OrgsPage />
              </Route>
              <Route path="/orgs/:orgId">
                <OrgPage />
              </Route>
            </Switch>
          </LoggedLayout>
        </Router>
      </StoreProvider>
    </ChakraProvider>
  )
}
