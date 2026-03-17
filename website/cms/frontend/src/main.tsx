import Prism from 'prismjs'
// Expose Prism globally for @lexical/code (used by MDXEditor)
;(window as any).Prism = Prism

import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.js'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
