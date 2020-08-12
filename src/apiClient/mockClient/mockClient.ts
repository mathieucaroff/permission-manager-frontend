import { Group, User, UserGroupAssociation } from '../../model/model'
import { GroupId, UserId } from '../../model/typeAlias'
import { Client, ClientStatus, UserGroupAssociationFilter } from '../apiClient'
import { withIndex } from '../../util/withIndex'
import { jsonDeepCopy } from '../../util/jsonDeepCopy'

type MockUser = User
type MockGroup = Group
type MockUserGroupAssociation = UserGroupAssociation
interface MockData {
   userList: MockUser[]
   groupList: MockGroup[]
   userGroupAssociationList: MockUserGroupAssociation[]
}

let initialMockData: Readonly<MockData> = {
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
   userGroupAssociationList: [
      [1, 1],
      [3, 1],
   ].map(([userId, groupId]) => ({ userId, groupId })),
}

let duration = (timeMs: number) => {
   return new Promise((resolve) => setTimeout(resolve, timeMs))
}

let randomDuration = () => duration(1000 * (Math.random() * 0.2 + 0.2))

export let createMockClient = (): Client => {
   let localData: MockData = jsonDeepCopy(initialMockData)

   return {
      async addUserToGroup(userId: UserId, groupId: GroupId): Promise<ClientStatus> {
         let filtered = localData.userGroupAssociationList.filter(
            (association) => association.userId === userId && association.groupId === groupId,
         )

         let status: ClientStatus['status'] = 'failure'
         if (filtered.length === 0) {
            localData.userGroupAssociationList.push({ userId, groupId })
            status = 'success'
         }

         await randomDuration()

         return { status }
      },
      async removeUserFromGroup(userId: UserId, groupId: GroupId): Promise<ClientStatus> {
         let filteredWithIndex = localData.userGroupAssociationList
            .map(withIndex)
            .filter(
               ([association, k]) =>
                  association.userId === userId && association.groupId === groupId,
            )

         filteredWithIndex.reverse()

         let status: ClientStatus['status'] = 'failure'
         filteredWithIndex.forEach(([_, index]) => {
            localData.userGroupAssociationList.splice(index, 1)
            status = 'success'
         })

         await randomDuration()

         return { status }
      },
      async getGroupList(search?: string): Promise<Group[]> {
         let result = localData.groupList
         if (search !== undefined) {
            result = result.filter((group) => {
               return group.name.includes(search)
            })
         }

         await randomDuration()

         return jsonDeepCopy(result)
      },
      async getUserList(search?: string): Promise<User[]> {
         let result = localData.userList
         if (search !== undefined) {
            result = result.filter((user) => {
               return (user.first + ' ' + user.last).includes(search)
            })
         }

         await randomDuration()

         return jsonDeepCopy(result)
      },
      async getUserGroupAssociationList(
         filter: UserGroupAssociationFilter = {},
      ): Promise<UserGroupAssociation[]> {
         let result = localData.userGroupAssociationList

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

         await randomDuration()

         return jsonDeepCopy(result)
      },
   }
}
