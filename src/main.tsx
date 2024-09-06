import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { SingleToast, THEME_2022, ThemeContext } from '@skbkontur/react-ui'
import { kisikModel } from './kisik.model'
import { bugModel } from './bug.model'

createRoot(document.getElementById('root')!).render(
    <ThemeContext.Provider value={THEME_2022}>
        <StrictMode>
          <App bugModel={bugModel} kisikModel={kisikModel} />
          <SingleToast />
        </StrictMode>
    </ThemeContext.Provider>
)
