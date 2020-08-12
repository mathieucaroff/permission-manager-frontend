import * as React from 'react'
import { useRecoilValue } from 'recoil'
import { groupTable, userTable } from '../../../state/tableState'
import { XLoadable } from '../../../util/XLoadable'
import { CardView } from '../CardView/CardView'
import { DetailView } from '../DetailView/DetailView'
import { useStyle } from '../../style/style'

export interface UserViewProp {}

export interface GroupViewProp {}

export type CardViewProp = (
   | (UserViewProp & { kind: 'user' })
   | (GroupViewProp & { kind: 'group' })
) & {
   title: string
}

export let XView = (prop: CardViewProp) => {
   let styleClass = useStyle()
   let userOrGroup = prop.kind === 'user'
   let loadable = useRecoilValue<XLoadable<any[]>>(userOrGroup ? userTable : groupTable)

   let polish = (content: React.ReactNode) => (
      <div className={styleClass.xview}>
         <h2>{prop.title}</h2>
         {content}
      </div>
   )

   if (loadable.state === 'loading') {
      return polish(<span>Loading</span>)
   } else if (loadable.state === 'hasError') {
      return polish(<span>Error: {loadable.errorMessage}</span>)
   }

   return polish(
      <>
         <div className={styleClass.firstCardView}>
            <CardView kind={prop.kind} thingList={loadable.value} />
         </div>
         <DetailView kind={prop.kind} />
      </>,
   )
}

export let UserView = (prop: UserViewProp) => XView({ ...prop, kind: 'user', title: 'Users' })

export let GroupView = (prop: GroupViewProp) => XView({ ...prop, kind: 'group', title: 'Groups' })
