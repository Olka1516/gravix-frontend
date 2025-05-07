import { ENDPOINTS } from '@/constants'
import http from '@/http'

export const getUserInfoByUsername = async (username: string) => {
  const data = await http.get(ENDPOINTS.USERS_INFO(username))
  return data.data.user
}

export const saveUserAnswers = async (genres: string[], artists: string[]) => {
  const username = localStorage.getItem('username')
  const temp = {
    username,
    genres,
    artists,
  }

  await http.post(ENDPOINTS.INTERESTS, temp)
}

export const updateUsersSubscribers = async (username: string, followee: string) => {
  const temp = {
    username,
    followee,
  }

  await http.post(ENDPOINTS.UPDATE_SUBSCRIBERS, temp)
}
