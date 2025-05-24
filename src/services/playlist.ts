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

export const createCopyPlaylist = async (id: string) => {
  const data = await http.post(ENDPOINTS.CREATE_COPY_PLAYLIST(id))
  return data.data.playlist
}

export const updateUserPlaylist = async (playlistData: IPlaylistCreate, id: string) => {
  const formData = new FormData()
  formData.append('name', playlistData.name)
  formData.append('visibility', playlistData.visibility)

  await http.put(ENDPOINTS.UPDATE_PLAYLIST(id), formData)
}

export const getMyPlayList = async () => {
  const data = await http.get(ENDPOINTS.GET_MY_PLAYLIST)
  return data.data
}

export const addSongToPlaylistByIds = async (songId: string, playlistId: string) => {
  await http.put(ENDPOINTS.ADD_SONG_TO_PLAYLIST + `?songId=${songId}&playlistId=${playlistId}`)
}

export const deletePlaylistById = async (id: string) => {
  await http.delete(ENDPOINTS.DELETE_PLAYLIST(id))
}

export const deleteSongFromPlaylistById = async (songId: string, playlistId: string) => {
  await http.delete(ENDPOINTS.DELETE_SONG_FROM_PLAYLIST([songId, playlistId]))
}

export const getPlayListByUsername = async (username: string) => {
  const data = await http.get(ENDPOINTS.GET_PLAYLIST(username))
  return data.data
}

export const getPlayListById = async (id: string) => {
  const data = await http.get(ENDPOINTS.GET_PLAYLIST_BY_ID(id))
  return data.data[0]
}

export const getMyPlayListById = async (id: string) => {
  const data = await http.get(ENDPOINTS.GET_MY_PLAYLIST_BY_ID(id))
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
