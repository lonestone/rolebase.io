import '@fullcalendar/react/dist/vdom' // Fix for fullcalendar with Vite
import 'easymde/dist/easymde.min.css'
import 'focus-visible/dist/focus-visible'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './fullcalendar.css'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
