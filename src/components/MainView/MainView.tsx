import { createStyles, makeStyles } from '@material-ui/core'
import * as React from 'react'
import { UserView, GroupView } from './XView/XView'

let useStyle = makeStyles((theme) =>
   createStyles({
      mainView: {
         '& > *': {
            display: 'inline table',
            width: '50%',
            minWidth: 'unset',
            maxWidth: 'unset',
         },
      },
   }),
)

export interface MainViewProp {
   style?: React.CSSProperties
}

export let MainView = (prop: MainViewProp) => {
   let styleClass = useStyle()

   let style: React.CSSProperties = {
      margin: 30,
      ...(prop.style || {}),
   }

   return (
      <div className={styleClass.mainView} style={style}>
         <div>
            <UserView />
         </div>
         <div>
            <GroupView />
         </div>
      </div>
   )
}
