import { configureCrisp } from '@utils/crisp'
import { configureSentry } from '@utils/sentry'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'

configureSentry()
configureCrisp()

const root = createRoot(document.getElementById('root')!)

root.render(<App />)
