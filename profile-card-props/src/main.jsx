import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Impt from './impt.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Impt />
  </StrictMode>,
)
