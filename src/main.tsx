import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { SingleToast, THEME_2022_DARK_UPDATE_2024, ThemeContext } from '@skbkontur/react-ui'
import { kisikModel } from './kisik.model'
import { bugModelFirst, bugModelSecond, bugModelThird } from './bug.model'

createRoot(document.getElementById('root')!).render(
    <ThemeContext.Provider value={THEME_2022_DARK_UPDATE_2024}>
        <StrictMode>
          <App bugModelSecond={bugModelSecond} bugModelThird={bugModelThird} bugModelFirst={bugModelFirst} kisikModel={kisikModel} />
          <SingleToast />
        </StrictMode>
    </ThemeContext.Provider>
)
