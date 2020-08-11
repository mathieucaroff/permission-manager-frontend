import { atom } from 'recoil'
import { User, Group, UserGroupAssociation } from '../model/model'
import { XLoadable } from '../util/XLoadable'

export const userTable = atom<XLoadable<User[]>>({
   key: 'userTable',
   default: {
      state: 'loading',
   },
})

export const groupTable = atom<XLoadable<Group[]>>({
   key: 'groupTable',
   default: {
      state: 'loading',
   },
})

export const userGroupAssociationTable = atom<XLoadable<UserGroupAssociation[]>>({
   key: 'userGroupAssociationTable',
   default: {
      state: 'loading',
   },
})
