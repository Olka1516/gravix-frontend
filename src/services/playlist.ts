import { ENDPOINTS } from '@/constants'
import http from '../http'
import type { IPlaylistCreate } from '@/types/playlist'

export const createUserPlaylist = async (playlistData: IPlaylistCreate) => {
  const formData = new FormData()
  formData.append('name', playlistData.name)
  formData.append('visibility', playlistData.visibility)

  const data = await http.post(ENDPOINTS.CREATE_PLAYLIST, formData)
  return data.data
}

export const getMyPlayList = async () => {
  const data = await http.get(ENDPOINTS.GET_MY_PLAYLIST)
  return data.data
}

export const getPlayListByUsername = async (username: string) => {
  const data = await http.get(ENDPOINTS.GET_PLAYLIST(username))
  return data.data
}

export const getPlayListById = async (id: string) => {
  const data = await http.get(ENDPOINTS.GET_PLAYLIST_BY_ID(id))
  return data.data[0]
}

export const likePlaylistById = async (id: string) => {
  const data = await http.patch(ENDPOINTS.UPDATE_PLAYLIST_LIKE(id))
  return data.data
}

export const dislikePlaylistById = async (id: string) => {
  const data = await http.patch(ENDPOINTS.UPDATE_PLAYLIST_DISLIKE(id))
  return data.data
}
