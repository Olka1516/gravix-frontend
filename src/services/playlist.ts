import { ENDPOINTS } from '@/constants'
import http from '../http'

export const getMyPlayList = async () => {
  const data = await http.get(ENDPOINTS.GET_MY_PLAYLIST)
  return data.data
}
