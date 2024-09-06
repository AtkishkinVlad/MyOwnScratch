import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { THEME_2022, ThemeContext } from '@skbkontur/react-ui'
import { kisikModel } from './kisik.model'

createRoot(document.getElementById('root')!).render(
  <ThemeContext.Provider value={THEME_2022}>
    <StrictMode>
      <App kisikModel={kisikModel} />
    </StrictMode>
  </ThemeContext.Provider>,
)
