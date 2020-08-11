import * as React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Group, User } from '../../../model/model'
import { GroupId, UserId } from '../../../model/typeAlias'
import { groupTable, userTable } from '../../../state/tableState'
import { XLoadable } from '../../../util/XLoadable'
import { selectedGroup, selectedUser } from '../../../state/positionalState'
import { CardView } from '../CardView/CardView'
import { DetailView } from '../DetailView/DetailView'

export interface UserViewProp {}

export interface GroupViewProp {}

export type CardViewProp = (
   | (UserViewProp & { kind: 'user' })
   | (GroupViewProp & { kind: 'group' })
) & {
   title: string
}

export let XView = (prop: CardViewProp) => {
   let userOrGroup = prop.kind === 'user'
   let loadable = useRecoilValue<XLoadable<any[]>>(userOrGroup ? userTable : groupTable)
   let isAvailable = loadable.state === 'hasValue'

   let polish = (content: React.ReactNode) => (
      <>
         <h3>{prop.title}</h3>
         {content}
      </>
   )

   if (loadable.state === 'loading') {
      return polish(<span>Loading</span>)
   } else if (loadable.state === 'hasError') {
      return polish(<span>Error: {loadable.errorMessage}</span>)
   }

   return polish(
      <>
         <CardView kind={prop.kind} thingList={loadable.value} />
         <DetailView kind={prop.kind} />
      </>,
   )
}

export let UserView = (prop: UserViewProp) => XView({ ...prop, kind: 'user', title: 'User' })

export let GroupView = (prop: GroupViewProp) => XView({ ...prop, kind: 'group', title: 'Group' })
