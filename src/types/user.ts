export interface IUser {
  username: string
  email: string
  id: string
  avatar: string | null
}

export interface IAllUserData extends IUser {
  subscribers: string[]
  following: string[]
  preferences: string[]
}

export interface IUserDictionary {
  [username: string]: IAllUserData
}

export interface IContactUs {
  email: string
  message: string
}
