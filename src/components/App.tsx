import { ChakraProvider } from '@chakra-ui/react'
import { StoreProvider } from 'easy-peasy'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import theme from '../theme'
import Routes from './routes/Routes'
import { store } from './store'

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <StoreProvider store={store}>
        <Router>
          <Routes />
        </Router>
      </StoreProvider>
    </ChakraProvider>
  )
}
