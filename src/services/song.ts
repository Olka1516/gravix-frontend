import type { ISong } from '@/types'
import http from '../http'
import { ENDPOINTS } from '@/constants'

export const createUserSong = async (songData: ISong) => {
  const formData = new FormData()
  if (songData.song) formData.append('song', songData.song)
  if (songData.image) formData.append('image', songData.image)
  formData.append('username', songData.username)
  formData.append('title', songData.title)
  formData.append('description', songData.description)
  formData.append('lyrics', songData.lyrics)
  formData.append('genres', JSON.stringify(songData.genres))
  formData.append('author', songData.author)
  formData.append('duration', songData.duration)
  formData.append('releaseYear', songData.releaseYear)
  formData.append('rating', songData.rating.toString())
  formData.append('ratingCount', songData.ratingCount.toString())

  const data = await http.post(ENDPOINTS.CREATE_SONG, formData)
  return data.data
}
