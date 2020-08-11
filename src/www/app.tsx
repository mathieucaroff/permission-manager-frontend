import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core'
import * as React from 'react'
import { DataManager } from '../components/headless/DataManager'
import { MainView } from '../components/MainView/MainView'
import { RecoilRoot } from 'recoil'

export interface AppProp {}

export let app = (prop: AppProp) => {
   return (
      <RecoilRoot>
         <ThemeProvider
            theme={createMuiTheme({
               palette: { type: 'dark' },
            })}
         >
            <CssBaseline />
            <DataManager />
            <MainView />
         </ThemeProvider>
      </RecoilRoot>
   )
}
