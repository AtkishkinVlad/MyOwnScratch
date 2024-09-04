import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { THEME_2022, ThemeContext } from '@skbkontur/react-ui'

createRoot(document.getElementById('root')!).render(
  <ThemeContext.Provider value={THEME_2022}>
    <StrictMode>
      <App />
    </StrictMode>
  </ThemeContext.Provider>,
)
