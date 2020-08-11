import { GroupId, UserId } from './typeAlias'

export interface Group {
   id: GroupId
   name: string
}

export interface User {
   id: UserId
   first: string
   last: string
}

export interface UserGroupAssociation {
   userId: UserId
   groupId: GroupId
}
