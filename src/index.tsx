import '@fullcalendar/react/dist/vdom' // Fix for fullcalendar with Vite
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './fullcalendar.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
