export interface IUser {
  username: string
  email: string
  id: string
  avatar: string | null
}

export interface IUserDictionary {
  [username: string]: IUser
}
