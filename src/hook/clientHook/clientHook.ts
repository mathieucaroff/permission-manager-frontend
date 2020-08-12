import { ApiClientContext } from '../../state/context'
import { useContext } from 'react'
import { useSetRecoilState } from 'recoil'
import { userGroupAssociationTable } from '../../state/tableState'
import { UserId, GroupId } from '../../model/typeAlias'
import { XLoadable } from '../../util/XLoadable'
import { UserGroupAssociation } from '../../model/model'
import { withIndex } from '../../util/withIndex'

// let both = <T extends unknown[]>(f: (...arg: T) => void) => (g: (...arg: T) => void) => (
//    ...arg: T
// ): void => {
//    f(...arg)
//    g(...arg)
// }

const errMessageUpdate =
   "The local copy of the association list was unavailable and couldn't be updated"

export let useClient = () => {
   let apiClient = useContext(ApiClientContext)
   let setAssociationList = useSetRecoilState(userGroupAssociationTable)

   return {
      ...apiClient,
      addUserToGroup: async (userId: UserId, groupId: GroupId) => {
         let result = await apiClient.addUserToGroup(userId, groupId)

         if (result.status === 'success') {
            setAssociationList((associationList: XLoadable<UserGroupAssociation[]>) => {
               if (associationList.state !== 'hasValue') {
                  throw new Error(errMessageUpdate)
               }

               return {
                  state: 'hasValue',
                  value: [...associationList.value, { userId, groupId }],
               }
            })
         }
      },
      removeUserFromGroup: async (userId, groupId) => {
         let result = await apiClient.removeUserFromGroup(userId, groupId)

         if (result.status === 'success') {
            setAssociationList((associationList: XLoadable<UserGroupAssociation[]>) => {
               if (associationList.state !== 'hasValue') {
                  throw new Error(errMessageUpdate)
               }

               let filteredWithIndex = associationList.value
                  .map(withIndex)
                  .filter(
                     ([association, k]) =>
                        association.userId === userId && association.groupId === groupId,
                  )

               let copy = [...associationList.value]

               filteredWithIndex.reverse()
               filteredWithIndex.forEach(([_, index]) => {
                  copy.splice(index, 1)
                  status = 'success'
               })

               return {
                  state: 'hasValue',
                  value: copy,
               }
            })
         }
      },
   }
}
