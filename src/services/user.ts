import { ENDPOINTS } from '@/constants'
import http from '@/http'

export const getUserInfoByUsername = async (username: string) => {
  const data = await http.get(ENDPOINTS.USERS_INFO(username))
  return data.data.user
}
