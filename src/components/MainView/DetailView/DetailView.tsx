import * as React from 'react'
import { selector, useRecoilValue } from 'recoil'
import { Group, User } from '../../../model/model'
import { selectedGroup, selectedUser } from '../../../state/positionalState'
import { groupTable, userGroupAssociationTable, userTable } from '../../../state/tableState'
import { CardView } from '../CardView/CardView'

export interface DetailUserViewProp {}

export interface DetailGroupViewProp {}

export type DetailViewProp =
   | (DetailUserViewProp & { kind: 'user' })
   | (DetailGroupViewProp & { kind: 'group' })

let selectedUserGroupRelatedList = selector({
   key: 'selectedUserGroupRelatedList',
   get: ({ get }) => {
      let user = get(selectedUser)
      let associationList = get(userGroupAssociationTable)
      let groupList = get(groupTable)

      if (
         user === undefined ||
         associationList.state !== 'hasValue' ||
         groupList.state !== 'hasValue'
      ) {
         console.log('selectedUserGroupRelatedList abort', { user, associationList, groupList })
         return undefined
      }

      let relatedGroupSet: true[] = []

      associationList.value.forEach(({ userId, groupId }) => {
         if (userId === user!.id) {
            relatedGroupSet[groupId] = true
         }
      })

      console.log(relatedGroupSet)

      return groupList.value.filter((user) => relatedGroupSet[user.id])
   },
})

let selectedGroupUserRelatedList = selector({
   key: 'selectedGroupUserRelatedList',
   get: ({ get }) => {
      let group = get(selectedGroup)
      let associationList = get(userGroupAssociationTable)
      let userList = get(userTable)

      if (
         group === undefined ||
         associationList.state !== 'hasValue' ||
         userList.state !== 'hasValue'
      ) {
         console.log('selectedGroupUserRelatedList abort', { group, associationList, userList })
         return undefined
      }

      let relatedUserSet: true[] = []

      associationList.value.forEach(({ userId, groupId }) => {
         if (groupId === group!.id) {
            relatedUserSet[userId] = true
         }
      })

      console.log(relatedUserSet)

      return userList.value.filter((user) => relatedUserSet[user.id])
   },
})

export let DetailView = (prop: DetailViewProp) => {
   let userOrGroup = prop.kind === 'user'
   let selectedThing = useRecoilValue<any>(userOrGroup ? selectedUser : selectedGroup)
   let selectedThingRelatedList = useRecoilValue<any[] | undefined>(
      userOrGroup ? selectedUserGroupRelatedList : selectedGroupUserRelatedList,
   )

   if (selectedThing === undefined || selectedThingRelatedList === undefined) {
      return null
   }

   console.log({ selectedThing })

   let name: string
   if (userOrGroup) {
      let u: User = selectedThing
      name = `${u.first} ${u.last}`
   } else {
      let g: Group = selectedThing
      name = g.name
   }

   return (
      <>
         <h2>{name}</h2>
         <CardView
            kind={userOrGroup ? 'group' : 'user'}
            thingList={selectedThingRelatedList}
            unlinkTarget={selectedThing}
         />
      </>
   )
}
