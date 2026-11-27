import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './shawnedecker.css'
import ShawnDeckerPage from './pages/ShawnDeckerPage'

function ShawnDeckerApp() {
  useEffect(() => {
    document.body.classList.add('shawnedecker-page')
    return () => document.body.classList.remove('shawnedecker-page')
  }, [])
  return <ShawnDeckerPage />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ShawnDeckerApp />
  </StrictMode>,
)
