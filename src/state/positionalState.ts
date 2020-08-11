import { atom } from 'recoil'
import { User, Group } from '../model/model'

export const selectedUser = atom<User | undefined>({
   key: 'selectedUser',
   default: undefined,
})

export const selectedGroup = atom<Group | undefined>({
   key: 'selectedGroup',
   default: undefined,
})
