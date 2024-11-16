
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Web3Provider } from './contexts/Web3Context.tsx'

createRoot(document.getElementById('root')!).render(
  <Web3Provider>
    <App />
  </Web3Provider>, 
)
