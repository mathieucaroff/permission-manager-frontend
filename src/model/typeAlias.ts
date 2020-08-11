// Why all these `enum-s`? -> see: https://medium.com/better-programming/nominal-typescript-eee36e9432d2

enum GroupIdType {}
export type GroupId = GroupIdType & number

enum UserIdType {}
export type UserId = UserIdType & number
