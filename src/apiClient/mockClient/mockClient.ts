import { Group, User, UserGroupAssociation } from '../../model/model'
import { GroupId, UserId } from '../../model/typeAlias'
import { Client, ClientStatus, UserGroupAssociationFilter } from '../apiClient'
import { withIndex } from '../../util/withIndex'

type MockUser = User
type MockGroup = Group
type MockUserGroupAssociation = UserGroupAssociation
interface MockData {
   userList: MockUser[]
   groupList: MockGroup[]
   groupUserAssociationList: MockUserGroupAssociation[]
}

const initialMockData: Readonly<MockData> = {
   userList: [
      {
         id: 1,
         first: 'Aria',
         last: 'Stark',
      },
      {
         id: 2,
         first: 'Pinkamena',
         last: 'Diane Pie',
      },
      {
         id: 3,
         first: 'Koyomi',
         last: 'Araragi',
      },
   ],
   groupList: [
      {
         id: 1,
         name: 'human',
      },
   ],
   groupUserAssociationList: [
      [1, 1],
      [3, 1],
   ].map(([userId, groupId]) => ({ userId, groupId })),
}

let oneSecond = () => {
   return new Promise((resolve) => setTimeout(resolve, 1000))
}

export let createMockClient = (): Client => {
   let localData: MockData = JSON.parse(JSON.stringify(initialMockData))

   return {
      async addUserToGroup(userId: UserId, groupId: GroupId): Promise<ClientStatus> {
         let filtered = localData.groupUserAssociationList.filter(
            (association) => association.userId === userId && association.groupId === groupId,
         )

         let status: ClientStatus['status'] = 'failure'
         if (filtered.length === 0) {
            localData.groupUserAssociationList.push({ userId, groupId })
            status = 'success'
         }

         return { status }
      },
      async removeUserFromGroup(userId: UserId, groupId: GroupId): Promise<ClientStatus> {
         let filteredWithIndex = localData.groupUserAssociationList
            .map(withIndex)
            .filter(
               ([association, k]) =>
                  association.userId === userId && association.groupId === groupId,
            )

         let status: ClientStatus['status'] = 'failure'
         filteredWithIndex.forEach(([_, index]) => {
            localData.groupUserAssociationList.splice(index, 1)
            status = 'success'
         })

         return { status }
      },
      async getGroupList(search?: string): Promise<Group[]> {
         let result = localData.groupList
         if (search !== undefined) {
            result = result.filter((group) => {
               return group.name.includes(search)
            })
         }

         await oneSecond()

         return result
      },
      async getUserList(search?: string): Promise<User[]> {
         let result = localData.userList
         if (search !== undefined) {
            result = result.filter((user) => {
               return (user.first + ' ' + user.last).includes(search)
            })
         }

         await oneSecond()

         return result
      },
      async getUserGroupAssociationList(
         filter: UserGroupAssociationFilter = {},
      ): Promise<UserGroupAssociation[]> {
         let result = localData.groupUserAssociationList

         if (filter.groupId !== undefined) {
            result = result.filter((association) => {
               return association.groupId === filter.groupId
            })
         }

         if (filter.userId !== undefined) {
            result = result.filter((association) => {
               return association.userId === filter.userId
            })
         }

         await oneSecond()

         return result
      },
   }
}
