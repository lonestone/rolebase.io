import { ChakraProvider } from '@chakra-ui/react'
import { StoreProvider } from 'easy-peasy'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes/Routes'
import { store } from './store'

export default function App() {
  return (
    <ChakraProvider>
      <StoreProvider store={store}>
        <Router>
          <Routes />
        </Router>
      </StoreProvider>
    </ChakraProvider>
  )
}
