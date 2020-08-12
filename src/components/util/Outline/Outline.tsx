import * as React from 'react'
import { useStyle } from '../../style/style'

export interface OutlineProp {
   children?: React.ReactElement[] | React.ReactElement
}

export let Outline = (prop: OutlineProp) => {
   let styleClass = useStyle()
   return (
      <div className={styleClass.outline}>
         <div className={styleClass.outlineInner}>{prop.children}</div>
      </div>
   )
}
