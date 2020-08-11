import { Group, User, UserGroupAssociation } from '../model/model'
import { GroupId, UserId } from '../model/typeAlias'
import { createMockClient } from './mockClient/mockClient'

export interface ClientStatus {
   status: 'success' | 'failure'
}

export interface UserGroupAssociationFilter {
   // This type could be improved a lot when users and groups will have actual filters
   groupId?: GroupId
   userId?: GroupId
}

export interface Client {
   addUserToGroup(userId: UserId, groupId: GroupId): Promise<ClientStatus>
   removeUserFromGroup(userId: UserId, groupId: GroupId): Promise<ClientStatus>
   getUserList(search?: string): Promise<User[]>
   getGroupList(search?: string): Promise<Group[]>
   getUserGroupAssociationList(filter?: UserGroupAssociationFilter): Promise<UserGroupAssociation[]>
}

export const createApiClient: () => Client = createMockClient
