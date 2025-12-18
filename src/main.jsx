import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SatieApp from './satie.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SatieApp />
  </StrictMode>,
)
