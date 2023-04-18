import { configureCrisp } from '@utils/crisp'
import { createRoot } from 'react-dom/client'
import App from './components/App'

configureCrisp()

const root = createRoot(document.getElementById('root')!)

root.render(<App />)
