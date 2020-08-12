import * as React from 'react'
import { UserView, GroupView } from './XView/XView'
import { useStyle } from '../style/style'

export interface MainViewProp {}

export let MainView = (prop: MainViewProp = {}) => {
   let styleClass = useStyle()

   return (
      <div className={styleClass.mainView}>
         <div>
            <UserView />
         </div>
         <div>
            <GroupView />
         </div>
      </div>
   )
}
