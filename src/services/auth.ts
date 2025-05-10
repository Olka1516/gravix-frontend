import { type UserSignIn, type UserSignUp } from '@/types'
import http from '../http'
import { ENDPOINTS } from '@/constants'

const setTokens = (refreshToken: string, accessToken: string, username: string) => {
  localStorage.setItem('username', username)
  localStorage.setItem('refreshToken', refreshToken)
  localStorage.setItem('accessToken', accessToken)
}

export const signUpByUserData = async (user: UserSignUp) => {
  const data = await http.post(ENDPOINTS.REGISTRATION, user)
  setTokens(data.data.tokens.refreshToken, data.data.tokens.accessToken, user.username)
}
export const signInByUserData = async (user: UserSignIn) => {
  const data = await http.post(ENDPOINTS.LOGIN, user)
  setTokens(data.data.tokens.refreshToken, data.data.tokens.accessToken, user.username)
}

export const logOutUser = () => {
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('accessToken')
  localStorage.removeItem('username')
  localStorage.removeItem('userInfo')
}
