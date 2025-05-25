import { ENDPOINTS } from '@/constants'
import http from '@/http'
import type { IContactUs } from '@/types'

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

export const updateUserImageById = async (file: File) => {
  const formData = new FormData()
  if (file) formData.append('image', file)
  await http.put(ENDPOINTS.UPDATE_USER_PHOTO, formData)
}

export const updateUsersSubscribers = async (username: string, followee: string) => {
  const temp = {
    username,
    followee,
  }

  await http.post(ENDPOINTS.UPDATE_SUBSCRIBERS, temp)
}

export const contactUs = async (info: IContactUs) => {
  await http.post(ENDPOINTS.CONTACT_US, info)
}
