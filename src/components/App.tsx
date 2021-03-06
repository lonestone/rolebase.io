import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CirclesProvider } from '../api/entities/circles'
import { MembersProvider } from '../api/entities/members'
import { RolesProvider } from '../api/entities/roles'
import LoggedLayout from './layout/LoggedLayout'
import CirclesPage from './pages/CirclesPage'
import MembersPage from './pages/MembersPage'
import RolesPage from './pages/RolesPage'

export default function App() {
  return (
    <ChakraProvider>
      <Router>
        <LoggedLayout>
          <CirclesProvider>
            <MembersProvider>
              <RolesProvider>
                <Switch>
                  <Route path="/members">
                    <MembersPage />
                  </Route>
                  <Route path="/roles">
                    <RolesPage />
                  </Route>
                  <Route path="/">
                    <CirclesPage />
                  </Route>
                </Switch>
              </RolesProvider>
            </MembersProvider>
          </CirclesProvider>
        </LoggedLayout>
      </Router>
    </ChakraProvider>
  )
}
