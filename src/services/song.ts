import type { ISong } from '@/types'
import http from '../http'
import { ENDPOINTS } from '@/constants'

export const createUserSong = async (songData: ISong) => {
  const formData = new FormData()
  if (songData.song) formData.append('song', songData.song)
  if (songData.image) formData.append('image', songData.image)
  formData.append('title', songData.title)
  formData.append('description', songData.description)
  formData.append('lyrics', songData.lyrics)
  formData.append('genres', JSON.stringify(songData.genres))
  formData.append('duration', songData.duration)
  formData.append('releaseYear', songData.releaseYear)
  formData.append('rating', songData.rating.toString())

  const data = await http.post(ENDPOINTS.CREATE_SONG, formData)
  return data.data.song
}

export const updateUserSong = async (songData: ISong) => {
  const formData = new FormData()
  if (songData.song) formData.append('song', songData.song)
  if (songData.image) formData.append('image', songData.image)
  formData.append('title', songData.title)
  formData.append('description', songData.description)
  formData.append('lyrics', songData.lyrics)
  formData.append('genres', JSON.stringify(songData.genres))
  formData.append('duration', songData.duration)
  formData.append('releaseYear', songData.releaseYear)
  formData.append('rating', songData.rating.toString())

  await http.put(ENDPOINTS.UPDATE_SONG(songData._id!), formData)
}

export const getSongsByUsername = async (username: string) => {
  const data = await http.get(ENDPOINTS.GET_SONGS(username))
  return data.data
}

export const getSongById = async (id: string) => {
  const data = await http.get(ENDPOINTS.GET_SONG(id))
  return data.data
}

export const deleteSongById = async (id: string) => {
  await http.delete(ENDPOINTS.DELETE_SONG(id))
}

export const getArtistsByGenres = async (selectedOptions: string[]) => {
  const data = await http.get(ENDPOINTS.GET_ARTISTS(selectedOptions))
  return data.data
}

export const likeSongById = async (id: string) => {
  await http.patch(ENDPOINTS.UPDATE_SONG_LIKE(id))
}

export const dislikeSongById = async (id: string) => {
  await http.patch(ENDPOINTS.UPDATE_SONG_DISLIKE(id))
}
