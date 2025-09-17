import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'
import { StatDisplayProvider } from './contexts/StatDisplayContext'

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <StatDisplayProvider>
      <App />
    </StatDisplayProvider>
  )